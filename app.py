from flask import Flask, render_template, jsonify, request
from py2neo import Graph
import requests
import _thread as thread
import base64
import datetime
import hashlib
import hmac
import json
from urllib.parse import urlparse
import ssl
from datetime import datetime
from time import mktime
from urllib.parse import urlencode
from wsgiref.handlers import format_date_time
import websocket
import jieba
import re
from jieba import analyse
import os
from collections import Counter
import string

app = Flask(__name__)
graph = Graph("bolt://localhost:7687", auth=("neo4j", "123456"))
text = []
answer = ""
keyword = ""
segmented_content = ""

class Ws_Param(object):
    # 初始化
    def __init__(self, APPID, APIKey, APISecret, gpt_url):
        self.APPID = APPID
        self.APIKey = APIKey
        self.APISecret = APISecret
        self.host = urlparse(gpt_url).netloc
        self.path = urlparse(gpt_url).path
        self.gpt_url = gpt_url

    # 生成url
    def create_url(self):
        # 生成RFC1123格式的时间戳
        now = datetime.now()
        date = format_date_time(mktime(now.timetuple()))
        # 拼接字符串
        signature_origin = "host: " + self.host + "\n"
        signature_origin += "date: " + date + "\n"
        signature_origin += "GET " + self.path + " HTTP/1.1"
        # 进行hmac-sha256进行加密
        signature_sha = hmac.new(self.APISecret.encode('utf-8'), signature_origin.encode('utf-8'),
                                 digestmod=hashlib.sha256).digest()
        signature_sha_base64 = base64.b64encode(signature_sha).decode(encoding='utf-8')
        authorization_origin = f'api_key="{self.APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="{signature_sha_base64}"'
        authorization = base64.b64encode(authorization_origin.encode('utf-8')).decode(encoding='utf-8')
        # 将请求的鉴权参数组合为字典
        v = {
            "authorization": authorization,
            "date": date,
            "host": self.host
        }
        # 拼接鉴权参数，生成url
        url = self.gpt_url + '?' + urlencode(v)
        # 此处打印出建立连接时候的url,参考本demo的时候可取消上方打印的注释，比对相同参数时生成的url与自己代码生成的url是否一致
        return url

# 收到websocket错误的处理
def on_error(ws, error):
    print("### error:", error)

# 收到websocket关闭的处理
def on_close(ws, one, two):
    print("### closed ###")

# 收到websocket连接建立的处理
def on_open(ws):
    thread.start_new_thread(run, (ws,))

def run(ws, *args):
    data = json.dumps(gen_params(appid=ws.appid, query=ws.query, domain=ws.domain))
    ws.send(data)

# 收到websocket消息的处理
def on_message(ws, message):
    # print(message)
    data = json.loads(message)
    code = data['header']['code']
    if code != 0:
        print(f'请求错误: {code}, {data}')
        ws.close()
    else:
        choices = data["payload"]["choices"]
        status = choices["status"]
        content = choices["text"][0]["content"]
        print(content, end='')

        global answer
        answer += content

        if status == 2:
            print()
            print("#### 关闭会话")
            ws.close()

        # 分词处理
        # 自定义词典
        # d=['一带一路','The Belt and Road','B&R','经济带','21世纪','海上丝绸之路','合作倡议','利益共同体','命运共同体','责任共同体','阿特劳','中马友谊大桥','中欧班列']
        jieba.load_userdict("OurDictionary.txt")
        # 去停用词
        print(os.getcwd())
        with open("hit_stopwords.txt","r",encoding="utf-8") as fp:
            stopwords = [s.rstrip() for s in fp.readlines()]
        seg_list = jieba.lcut(answer)  # 使用精确模式分词
        global segmented_content
        segmented_content = []
        for w in seg_list:
            # 数据清洗
            if w not in stopwords and w not in string.punctuation and len(w) > 1:
                segmented_content.append(w)
        print("分词结果:", segmented_content)
        word_counts = Counter(segmented_content)
        # 找到出现次数最多的词
        global  keyword
        keyword = ""
        if word_counts:
            keyword = word_counts.most_common(1)[0][0]
        print("出现次数最多的词:", keyword)
def gen_params(appid, query, domain):
    """
    通过appid和用户的提问来生成请参数
    """
    data = {
        "header": {
            "app_id": appid,
            "uid": "1234",
            # "patch_id": []    #接入微调模型，对应服务发布后的resourceid
        },
        "parameter": {
            "chat": {
                "domain": domain,
                "temperature": 0.5,
                "max_tokens": 4096,
                "auditing": "default",
            }
        },
        "payload": {
            "message": {
                "text": query
            }
        }
    }
    return data

def getText(role, content):
    jsoncon = {"role": role, "content": content}
    # history_put = """['工程','货物',]\n请从上面选项中选择一个属于下面文本的分类\n左侧边坡宣传标语
    #         ,结果只输出1,2 ,如果都不属于输出0
    #     """
    # text.append({'role': 'user', 'content': history_put})
    # text.append({'role': 'assistant', 'content': '0'})
    # # 设置对话背景或者模型角色
    # text.append({"role": "system", "content": "你现在扮演李白，你豪情万丈，狂放不羁；接下来请用李白的口吻和用户对话。"})
    text.append(jsoncon)
    return text

def getlength(text):
    length = 0
    for content in text:
        temp = content["content"]
        leng = len(temp)
        length += leng
    return length

def checklen(text):
    while getlength(text) > 8000:
        del text[0]
    return text

def main(appid, api_secret, api_key, gpt_url, domain, query):
    wsParam = Ws_Param(appid, api_key, api_secret, gpt_url)
    websocket.enableTrace(False)
    wsUrl = wsParam.create_url()
    ws = websocket.WebSocketApp(wsUrl, on_message=on_message, on_error=on_error, on_close=on_close, on_open=on_open)
    ws.appid = appid
    ws.query = query
    ws.domain = domain
    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})

@app.route('/invoke_model', methods=['POST'])
def invoke_model():
    data = request.get_json()
    Input = data.get('input')
    query = checklen(getText("user", Input))
    global answer,segmented_content,keyword
    answer = ""
    keyword = ""
    main(
        appid="899cbf65",
        api_secret="NTE1OThlYTUzMGE2YzAzN2UzZmU5MDAy",
        api_key="cbc7701df58a6e843af6b08afa584b51",
        gpt_url="wss://spark-api.xf-yun.com/v3.5/chat",
        domain="generalv3.5",
        query=query
    )
    print("分词：",segmented_content)
    print("关键词:",keyword)
    return jsonify({"response": answer, "word": keyword})

# 初始化知识图谱数据
knowledge_graph = {
    "nodes": [],
}
# 路由跳转
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/index')
def index():
    return render_template('index.html')
@app.route('/history')
def history():
    return render_template('history/history.html')
@app.route('/project')
def project():
    return render_template('project/project.html')
@app.route('/project3D')
def project3D():
    return render_template('project/project3D.html')
@app.route('/eco')
def eco():
    return render_template('data/eco.html')
@app.route('/second')
def second():
    return render_template('data/second.html')
@app.route('/api1')
def api1():
    return render_template('history/api1.html')
@app.route('/all')
def all():
    return render_template('country/all.html')
@app.route('/photos')
def photos():
    return render_template('country/photos.html')
@app.route('/question')
def question():
    return render_template('project/question.html')
# 历史介绍
@app.route('/zhangqian')
def zhangqian():
    return render_template('history/introduce/zhangqian.html')
@app.route('/2')
def html2():
    return render_template('history/introduce/2.html')
@app.route('/3')
def html3():
    return render_template('history/introduce/3.html')
@app.route('/4')
def html4():
    return render_template('history/introduce/4.html')
@app.route('/5')
def html5():
    return render_template('history/introduce/5.html')
@app.route('/6')
def html6():
    return render_template('history/introduce/6.html')
@app.route('/7')
def html7():
    return render_template('history/introduce/7.html')
@app.route('/8')
def html8():
    return render_template('history/introduce/8.html')
@app.route('/9')
def html9():
    return render_template('history/introduce/9.html')
@app.route('/10')
def html10():
    return render_template('history/introduce/10.html')
@app.route('/11')
def html11():
    return render_template('history/introduce/11.html')
@app.route('/12')
def html12():
    return render_template('history/introduce/12.html')
@app.route('/13')
def html13():
    return render_template('history/introduce/13.html')
@app.route('/14')
def html14():
    return render_template('history/introduce/14.html')
@app.route('/15')
def html15():
    return render_template('history/introduce/15.html')
@app.route('/16')
def html16():
    return render_template('history/introduce/16.html')
@app.route('/17')
def html17():
    return render_template('history/introduce/17.html')
@app.route('/18')
def html18():
    return render_template('history/introduce/18.html')
@app.route('/19')
def html19():
    return render_template('history/introduce/19.html')
@app.route('/20')
def html20():
    return render_template('history/introduce/20.html')
@app.route('/21')
def html21():
    return render_template('history/introduce/21.html')
@app.route('/22')
def html22():
    return render_template('history/introduce/22.html')
@app.route('/23')
def html23():
    return render_template('history/introduce/23.html')
@app.route('/24')
def html24():
    return render_template('history/introduce/24.html')
@app.route('/25')
def html25():
    return render_template('history/introduce/25.html')
@app.route('/26')
def html26():
    return render_template('history/introduce/26.html')
@app.route('/27')
def html27():
    return render_template('history/introduce/27.html')
@app.route('/28')
def html28():
    return render_template('history/introduce/28.html')
@app.route('/29')
def html29():
    return render_template('history/introduce/29.html')
@app.route('/30')
def html30():
    return render_template('history/introduce/30.html')
@app.route('/31')
def html31():
    return render_template('history/introduce/31.html')
# 成员国
@app.route('/Russia')
def Russia():
    return render_template('country/introduce/Russia.html')
@app.route('/Ukraine')
def Ukraine():
    return render_template('country/introduce/Ukraine.html')
@app.route('/Poland')
def Poland():
    return render_template('country/introduce/Poland.html')
@app.route('/Turkey')
def Turkey():
    return render_template('country/introduce/Turkey.html')
@app.route('/biaoge')
def biaoge():
    return render_template('country/introduce/biaoge.html')
@app.route('/Israel')
def Israel():
    return render_template('country/introduce/Israel.html')
@app.route('/Hungary')
def Hungary():
    return render_template('country/introduce/Hungary.html')
@app.route('/Lithuania')
def Lithuania():
    return render_template('country/introduce/Lithuania.html')
@app.route('/Syrian')
def Syrian():
    return render_template('country/introduce/Syrian.html')
@app.route('/Iran')
def Iran():
    return render_template('country/introduce/Iran.html')
@app.route('/Estonia')
def Estonia():
    return render_template('country/introduce/Estonia.html')
@app.route('/India')
def India():
    return render_template('country/introduce/India.html')
@app.route('/Indonesia')
def Indonesia():
    return render_template('country/introduce/Indonesia.html')
@app.route('/The_Czech_Republic')
def The_Czech_Republic():
    return render_template('country/introduce/The_Czech_Republic.html')
@app.route('/Pakistan')
def Pakistan():
    return render_template('country/introduce/Pakistan.html')
@app.route('/The_United_Arab')
def The_United_Arab():
    return render_template('country/introduce/The_United_Arab.html')
@app.route('/Bulgaria')
def Bulgaria():
    return render_template('country/introduce/Bulgaria.html')
@app.route('/The_State_of_Qatar')
def The_State_of_Qatar():
    return render_template('country/introduce/The_State_of_Qatar.html')
@app.route('/Egypt')
def Egypt():
    return render_template('country/introduce/Egypt.html')
@app.route('/Iraq')
def Iraq():
    return render_template('country/introduce/Iraq.html')
@app.route('/Kazakhstan')
def Kazakhstan():
    return render_template('country/introduce/Kazakhstan.html')
@app.route('/Romania')
def Romania():
    return render_template('country/introduce/Romania.html')
@app.route('/Kingdom_of_Saudi_Arabia')
def Kingdom_of_Saudi_Arabia():
    return render_template('country/introduce/Kingdom_of_Saudi_Arabia.html')
@app.route('/the_Philippines')
def the_Philippines():
    return render_template('country/introduce/the_Philippines.html')
@app.route('/Azerbaijan')
def Azerbaijan():
    return render_template('country/introduce/Azerbaijan.html')
@app.route('/Arab_Emirate')
def Arab_Emirate():
    return render_template('country/introduce/Arab_Emirate.html')
@app.route('/Vietnam')
def Vietnam():
    return render_template('country/introduce/Vietnam.html')
@app.route('/Armenia')
def Armenia():
    return render_template('country/introduce/Armenia.html')
@app.route('/The_People_Republic_of_Bangladesh')
def The_People_Republic_of_Bangladesh():
    return render_template('country/introduce/The_People’s_Republic_of_Bangladesh.html')
@app.route('/Palestine')
def Palestine():
    return render_template('country/introduce/Palestine.html')
@app.route('/Singapore')
def Singapore():
    return render_template('country/introduce/Singapore.html')
@app.route('/Malaysia')
def Malaysia():
    return render_template('country/introduce/Malaysia.html')
@app.route('/Lebanon')
def Lebanon():
    return render_template('country/introduce/Lebanon.html')
@app.route('/Yemen')
def Yemen():
    return render_template('country/introduce/Yemen.html')
@app.route('/Thailand')
def Thailand():
    return render_template('country/introduce/Thailand.html')
@app.route('/Croatia')
def Croatia():
    return render_template('country/introduce/Croatia.html')
@app.route('/Jordan')
def Jordan():
    return render_template('country/introduce/Jordan.html')
@app.route('/Turkmenistan')
def Turkmenistan():
    return render_template('country/introduce/Turkmenistan.html')
@app.route('/Nepal')
def Nepal():
    return render_template('country/introduce/Nepal.html')
@app.route('/the_Republic_of_the_Union_of_Myanmar')
def the_Republic_of_the_Union_of_Myanmar():
    return render_template('country/introduce/the_Republic_of_the_Union_of_Myanmar.html')
@app.route('/The_Democratic_Socialist_Republic_of_Sri_Lanka')
def The_Democratic_Socialist_Republic_of_Sri_Lanka():
    return render_template('country/introduce/The_Democratic_Socialist_Republic_of_Sri_Lanka.html')
@app.route('/the_Kingdom_of_Cambodia')
def the_Kingdom_of_Cambodia():
    return render_template('country/introduce/the_Kingdom_of_Cambodia.html')
@app.route('/Kuwait')
def Kuwait():
    return render_template('country/introduce/Kuwait.html')
@app.route('/Mongolia')
def Mongolia():
    return render_template('country/introduce/Mongolia.html')
@app.route('/Oman')
def Oman():
    return render_template('country/introduce/Oman.html')
@app.route('/Brunei')
def Brunei():
    return render_template('country/introduce/Brunei.html')
@app.route('/Maldives')
def Maldives():
    return render_template('country/introduce/Maldives.html')
@app.route('/Bahrain')
def Bahrain():
    return render_template('country/introduce/Bahrain.html')
@app.route('/Laos')
def Laos():
    return render_template('country/introduce/Laos.html')
@app.route('/Bhutan')
def Bhutan():
    return render_template('country/introduce/Bhutan.html')
# 工程项目
@app.route('/aieraisipinuo')
def aieraisipinuo():
    return render_template('project/project/aieraisipinuo.html')
@app.route('/banamayunhesanqiao')
def banamayunhesanqiao():
    return render_template('project/project/banamayunhesanqiao.html')
@app.route('/bolaiguojijichang')
def bolaiguojijichang():
    return render_template('project/project/bolaiguojijichang.html')
@app.route('/damoladaodaqiao')
def damoladaodaqiao():
    return render_template('project/project/damoladaodaqiao.html')
@app.route('/haxinukegangjingjitequ')
def haxinukegangjingjitequ():
    return render_template('project/project/haxinukegangjingjitequ.html')
@app.route('/kaluote')
def kaluote():
    return render_template('project/project/kaluote.html')
@app.route('/kanapulihaidisuidao')
def kanapulihaidisuidao():
    return render_template('project/project/kanapulihaidisuidao.html')
@app.route('/lvyoulianmeng')
def lvyoulianmeng():
    return render_template('project/project/lvyoulianmeng.html')
@app.route('/mazhongguandanchanyeyuan')
def mazhongguandanchanyeyuan():
    return render_template('project/project/mazhongguandanchanyeyuan.html')
@app.route('/meiguoxinhaiwandaqiao')
def meiguoxinhaiwandaqiao():
    return render_template('project/project/meiguoxinhaiwandaqiao.html')
@app.route('/muhanmodeliushidaqiao')
def muhanmodeliushidaqiao():
    return render_template('project/project/muhanmodeliushidaqiao.html')
@app.route('/neiluobikuaisulu')
def neiluobikuaisulu():
    return render_template('project/project/neiluobikuaisulu.html')
@app.route('/shengtaiwenhua')
def shengtaiwenhua():
    return render_template('project/project/shengtaiwenhua.html')
@app.route('/wenhuazhiye')
def wenhuazhiye():
    return render_template('project/project/wenhuazhiye.html')
@app.route('/zhongechannenghezuoshifanyuan')
def zhongechannenghezuoshifanyuan():
    return render_template('project/project/zhongechannenghezuoshifanyuan.html')
@app.route('/zhongeshuyou')
def zhongeshuyou():
    return render_template('project/project/zhongeshuyou.html')

@app.route('/get_knowledge_graph', methods=['POST'])
def get_knowledge_graph():
    if request.is_json:
        data = request.get_json()
        nodes = []
        edges = []
        if 'relation_type' in data:
            relation_type = data.get('relation_type')
            # 根据关系类型获取相关节点和关系
            for record in graph.run(f"MATCH (a)-[rel:{relation_type}]->(b) RETURN a, rel, b"):
                node_a = record[0]
                node_b = record[2]

                nodes.append({
                    "data": {
                        "id": str(node_a.identity),
                        "label": list(node_a.labels)[0],
                        "name": node_a["name"] if "name" in node_a else "Unknown",  # 设置节点名称为节点的名称属性
                        "other_data": node_a["other_property"] if "other_property" in node_a else "Unknown"
                        # 添加其他属性数据
                    }
                })

                # 处理第二个节点
                nodes.append({
                    "data": {
                        "id": str(node_b.identity),
                        "label": list(node_b.labels)[0],
                        "name": node_b["name"] if "name" in node_b else "Unknown",  # 设置节点名称为节点的名称属性
                        "other_data": node_b["other_property"] if "other_property" in node_b else "Unknown"
                        # 添加其他属性数据
                    }
                })

                # 处理边
                edges.append({
                    "data": {
                        "id": str(node_a.identity) + '-' + str(node_b.identity),
                        "source": str(node_a.identity),
                        "target": str(node_b.identity),
                        "label": relation_type
                    }
                })
        elif 'node_name' in data:
            node_name = data.get('node_name').lower()
            for record in graph.run(
                    "MATCH (a)-[rel]->(b) WHERE toLower(a.name) = $node_name OR toLower(b.name) = $node_name RETURN a, rel, b",
                    node_name=node_name):
                node_a = record[0]
                node_b = record[2]

                nodes.append({
                    "data": {
                        "id": str(node_a.identity),
                        "label": list(node_a.labels)[0],
                        "name": node_a["name"] if "name" in node_a else "Unknown",
                        "other_data": node_a["other_data"] if "other_data" in node_a else "Unknown"
                    }
                })

                nodes.append({
                    "data": {
                        "id": str(node_b.identity),
                        "label": list(node_b.labels)[0],
                        "name": node_b["name"] if "name" in node_b else "Unknown",
                        "other_data": node_b["other_data"] if "other_data" in node_b else "Unknown"
                    }
                })

                edges.append({
                    "data": {
                        "id": str(node_a.identity) + '-' + str(node_b.identity),
                        "source": str(node_a.identity),
                        "target": str(node_b.identity),
                        "label": list(record[1].types())[0]
                    }
                })
        return jsonify({"nodes": nodes, "edges": edges})
    return jsonify({"nodes": [], "edges": []})

if __name__ == '__main__':
    app.run()
