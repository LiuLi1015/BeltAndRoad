// 饼形图1
(function () {
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    var option = {
      color: ["#1089E7", "#F57474"],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        position: 'right'
      },
      legend: {
        bottom: 0,
        left: 10,
        // 小图标的宽度和高度
        itemWidth: 10,
        itemHeight: 10,
        // 修改图例组件的文字为 12px
        textStyle: {
          color: "lightyellow",
          fontSize: "20"
        }
      },
      series: [{
        name: '空中航线-海上航线',
        type: 'pie',
        // 设置饼形图在容器中的位置
        center: ["50%", "42%"],
        // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        // 图形上的文字
        label: {
          show: false,
          position: 'center'
        },
        // 链接文字和图形的线
        labelLine: {
          show: false
        },
        data: [{
            value: 43,
            name: "海上航线通达43个国家"
          },
          {
            value: 57,
            name: "空中航线直航57个国家"
          },
          
        ]
      }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    })

    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.display = 'none';
    popup.style.backgroundColor = '#A9A9A9';
    document.body.appendChild(popup);
    popup.style.width='870px';
    popup.style.height='620px';
    var chartContainer = document.querySelector('.line2');
    var chart = document.querySelector('.line2 .chart');
    var isPopupVisible = false;

    document.querySelector('.line2 h2').addEventListener('click', function() {
        if (!isPopupVisible) {
            popup.style.display = 'block';
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.zIndex = '9999';
           chart.style.width = '100%';
           chart.style.height = '100%';
           popup.appendChild(chart);
           myChart.resize(); // 重新渲染图表以适应新的大小
          isPopupVisible = true;
        } else {
          popup.style.display = 'none';
          chartContainer.appendChild(chart);
          myChart.resize();
          isPopupVisible = false;
        }
    });
  })();

  
  // 饼形图2
  (function () {
    var myChart = echarts.init(document.querySelector('.bar .chart'));
    var option = {
      color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom:20,
        itemWidth: 5,
        itemHeight: 5,
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: 18
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top:'10%',
        containLabel: true
      },
      series: [{
        name: '地区分布',
        type: 'pie',
        radius: ["10%", "60%"],
        center: ['50%', '40%'],
        roseType: 'radius',
        label: {
          fontsize: 16
        },
        labelLine: {
          length: 6,
          length2: 8
        },
        data: [{
            value: 38,
            name: '亚洲'
          },
          {
            value: 39,
            name: '非洲'
          },
          {
            value: 26,
            name: '欧洲'
          },
          {
            value: 9,
            name: '大洋洲'
          },
          {
            value: 11,
            name: '北美洲'
          },
          {
            value: 8,
            name: '南美洲'
          }
        ]
      }]
    };
  
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  (function () {
    var myChart = echarts.init(document.querySelector('.line .chart'));
    var dunhuangColors = ['#F29C82', '#F9E0B7', '#8C7851', '#B8C99D', '#726250', '#ACBB8E', '#CCA66D', '#E2C17C', '#EF8E38', '#F4B55C', '#994B42', '#A396A7'];
    var barData = [
        ["巴基斯坦", 2710.5, 0.0037, 0.0384, 0.0368, 0.0405, 0.0404, 0.04],
        ["白俄罗斯", 546.09, 0.0007, 0.0156, 0.0126, 0.0328, 0.0365, 0.02],
        ["保加利亚", 489.53, 0.0007, 0.0024, 0.0128, 0.0155, 0.0297, 0.02],
        ["波兰", 4747.75, 0.0065, 0.0173, 0.0102, 0.0172, -0.0389, 0],
        ["俄罗斯", 13260.16, 0.0181, 0.0352, 0.0128, 0.0071, -0.0373, 0],
        ["菲律宾", 2924.51, 0.004, 0.0668, 0.0706, 0.0622, 0.0591, 0.06],
        ["哈萨克斯坦", 1843.61, 0.0025, 0.05, 0.06, 0.043, 0.0116, 0.04],
        ["捷克", 1851.56, 0.0025, -0.008, -0.0048, 0.0271, 0.0454, 0.01],
        ["罗马尼亚", 1779.56, 0.0024, 0.0064, 0.0353, 0.0296, 0.0375, 0.03],
        ["马来西亚", 2962.84, 0.004, 0.0547, 0.0469, 0.0601, 0.0497, 0.05],
        ["蒙古国", 117.18, 0.0002, 0.1232, 0.1165, 0.0788, 0.0236, 0.08],
        ["孟加拉", 2065.31, 0.0028, 0.0626, 0.0604, 0.0631, 0.0681, 0.06],
        ["缅甸", 628.77, 0.0009, 0.0733, 0.0843, 0.087, 0.0703, 0.08],
        ["斯里兰卡", 812.47, 0.0011, 0.0914, 0.034, 0.0488, 0.0479, 0.06],
        ["泰国", 3952.97, 0.0054, 0.0723, 0.027, 0.0082, 0.0282, 0.03],
        ["土耳其", 7179.32, 0.0098, 0.0213, 0.0419, 0.0302, 0.0398, 0.03],
        ["乌克兰", 905.24, 0.0012, 0.0024, -0.0003, -0.0655, -0.0987, -0.04],
        ["新加坡", 2927.34, 0.004, 0.0367, 0.0467, 0.0326, 0.0201, 0.03],
        ["伊朗", 3900.39, 0.0053, -0.0661, -0.0191, 0.0434, 0.0038, -0.01],
        ["以色列", 2994.13, 0.0041, 0.0238, 0.0438, 0.0316, 0.0251, 0.03],
        ["印度", 20730.02, 0.0282, 0.0562, 0.0664, 0.0724, 0.0756, 0.07],
        ["印度尼西亚", 8589.53, 0.0117, 0.0603, 0.0556, 0.0502, 0.0479, 0.05],
        ["越南", 1914.54, 0.0026, 0.0525, 0.0542, 0.0598, 0.0668, 0.06]
    ];
    var countries = barData.map(function (item) {
        return item[0];
    });
    var gdpGlobRatio = barData.map(function (item) {
        return item.slice(1);
    });
    var barOption = {
  color: dunhuangColors,
  title: {
  //text: '各国GDP数据纵向柱形图'
},
tooltip: {
trigger: 'axis',
axisPointer: {
    type: 'shadow'
}
},
// legend: {
// // data: ['GDP全球比', '2015年增速', '2014年增速', '2013年增速', '2012年增速']
// },
grid: {
left: '3%',
right: '4%',
bottom: '3%',
top:7,
containLabel: true
},
xAxis: {
type: 'category',
data: countries,
axisLabel: {
    textStyle: {
        color: '#fff', // 设置y轴坐标文字颜色为白色
        fontSize:18
    }
}
},
yAxis: {
type: 'value',
axisLabel: {
    textStyle: {
        color: '#fff' // 设置y轴坐标文字颜色为白色
    }
}
},
series: [
{
    name: 'GDP全球比',
    type: 'bar',
    label: {
        show: false,
        position: 'inside'
    },
    data: [] // 初始化为空数组
},
{
    name: '2015年增速',
    type: 'bar',
    label: {
        show: false,
        position: 'inside'
    },
    data: [] // 初始化为空数组
},
{
    name: '2014年增速',
    type: 'bar',
    label: {
        show: false,
        position: 'inside'
    },
    data: [] // 初始化为空数组
},
{
    name: '2013年增速',
    type: 'bar',
    label: {
        show: false,
        position: 'inside'
    },
    data: [] // 初始化为空数组
},
{
    name: '2012年增速',
    type: 'bar',
    label: {
        show: false,
        position: 'inside'
    },
    data: [] // 初始化为空数组
}
]
};
// 设置延时渲染
function renderWithDelay(seriesIndex) {
    if (seriesIndex >= barOption.series.length) {
        return; // 所有系列渲染完成，退出
    }
    setTimeout(function() {
        // 渲染当前系列数据
        barOption.series[seriesIndex].data = gdpGlobRatio.map(function (item) {
            return item[seriesIndex + 1]; // 系列数据索引从1开始，因此需要+1
        });
        myChart.setOption(barOption); // 更新图表
        renderWithDelay(seriesIndex + 1); // 递归调用，渲染下一个系列
    }, 1000); // 设置延时为1秒，您可以根据需要调整
}
renderWithDelay(0);

window.addEventListener('resize', function () {
    myChart.resize();
  })
var popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.display = 'none';
    popup.style.backgroundColor = '#A9A9A9';
    document.body.appendChild(popup);
    popup.style.width='870px';
    popup.style.height='620px';
    var chartContainer = document.querySelector('.line');
    var chart = document.querySelector('.line .chart');
    var isPopupVisible = false;

    document.querySelector('.line h2').addEventListener('click', function() {
        if (!isPopupVisible) {
            popup.style.display = 'block';
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.zIndex = '9999';
           chart.style.width = '100%';
           chart.style.height = '100%';
           popup.appendChild(chart);
           myChart.resize(); // 重新渲染图表以适应新的大小
          isPopupVisible = true;
        } else {
          popup.style.display = 'none';
          chartContainer.appendChild(chart);
          myChart.resize();
          isPopupVisible = false;
        }
    });
})();

// 饼形图1
(function () {
    var pieChart;
    var pieChart = echarts.init(document.querySelector('.map .chart'));
    var pieData = [
        {
            "name": "印度",
            "value": "130971.3"
        },
        {

            "name": "阿尔巴尼亚",
            "value": "288.5"
        },
        {
            "name": "阿富汗",
            "value": "3273.9"
        },
        {
            "name": "阿联酋",
            "value": "985.6"
        },
        {
            "name": "阿曼",
            "value": "395.7"
        },
        {
            "name": "阿塞拜疆",
            "value": "949.2"
        },
        {
            "name": "埃及",
            "value": "9020.3"
        },
        {
            "name": "爱沙尼亚",
            "value": "131.2"
        },
        {
            "name": "巴基斯坦",
            "value": "18987"
        },
        {
            "name": "巴勒斯坦",
            "value": "2699.7"
        },
        {
            "name": "巴林",
            "value": "131.9"
        },
        {
            "name": "白俄罗斯",
            "value": "945.1"
        },
        {
            "name": "保加利亚",
            "value": "712.6"
        },
        {
            "name": "波黑",
            "value": "385.4"
        },
        {
            "name": "波兰",
            "value": "3800.3"
        },
        {
            "name": "不丹",
            "value": "79.1"
        },
        {
            "name": "东帝汶",
            "value": "118.7"
        },
        {
            "name": "俄罗斯",
            "value": "14630"
        },
        {
            "name": "菲律宾",
            "value": "10419.5"
        },
        {
            "name": "格鲁吉亚",
            "value": "367.8"
        },
        {
            "name": "哈萨克斯坦",
            "value": "1794.7"
        },
        {
            "name": "黑山",
            "value": "62.3"
        },
        {
            "name": "吉尔吉斯斯坦",
            "value": "605.9"
        },
        {
            "name": "捷克",
            "value": "1056.1"
        },
        {
            "name": "卡塔尔",
            "value": "257.8"
        },
        {
            "name": "科威特",
            "value": "422.5"
        },
        {
            "name": "克罗地亚",
            "value": "420.4"
        },
        {
            "name": "拉脱维亚",
            "value": "197.6"
        },
        {
            "name": "老挝",
            "value": "716.3"
        },
        {
            "name": "黎巴嫩",
            "value": "459.7"
        },
        {
            "name": "立陶宛",
            "value": "287.5"
        },
        {
            "name": "罗马尼亚",
            "value": "1986.9"
        },
        {
            "name": "马尔代夫",
            "value": "35.4"
        },
        {
            "name": "马来西亚",
            "value": "3152.3"
        },
        {
            "name": "马其顿",
            "value": "207.6"
        },
        {
            "name": "蒙古",
            "value": "301.4"
        },
        {
            "name": "孟加拉国",
            "value": "16151.3"
        },
        {
            "name": "缅甸",
            "value": "5225.4"
        },
        {
            "name": "摩尔多瓦",
            "value": "355.3"
        },
        {
            "name": "尼泊尔",
            "value": "2875.8"
        },
        {
            "name": "塞尔维亚",
            "value": "713.2"
        },
        {
            "name": "沙特阿拉伯",
            "value": "3201.3"
        },
        {
            "name": "束埔寨",
            "value": "1577.6"
        },
        {
            "name": "斯里兰卡",
            "value": "2125.2"
        },
        {
            "name": "斯洛伐克",
            "value": "541.8"
        },
        {
            "name": "斯洛文尼亚",
            "value": "206.5"
        },
        {
            "name": "塔吉克斯坦",
            "value": "865.5"
        },
        {
            "name": "泰国",
            "value": "6898.1"
        },
        {
            "name": "土耳其",
            "value": "7855.9"
        },
        {
            "name": "土库曼斯坦",
            "value": "546.3"
        },
        {
            "name": "文莱",
            "value": "42.3"
        },
        {
            "name": "乌克兰",
            "value": "4250.1"
        },
        {
            "name": "乌兹别克斯坦",
            "value": "3134.3"
        },
        {
            "name": "新加坡",
            "value": "558.4"
        },
        {
            "name": "匈牙利",
            "value": "983.5"
        },
        {
            "name": "叙利亚",
            "value": "341.8"
        },
        {
            "name": "亚美尼亚",
            "value": "299.1"
        },
        {
            "name": "也门",
            "value": "2913.2"
        },
        {
            "name": "伊拉克",
            "value": "3606.7"
        },
        {
            "name": "伊朗",
            "value": "8046"
        },
        {
            "name": "以色列",
            "value": "852.8"
        },

        {
            "name": "印度尼西亚",
            "value": "25880.2"
        },
        {
            "name": "约旦",
            "value": "697.6"
        },
        {
            "name": "越南",
            "value": "9263.7"
        }
    ];

    var dunhuangColors = ['#F29C82', '#F9E0B7', '#8C7851', '#B8C99D', '#726250', '#ACBB8E', '#CCA66D', '#E2C17C', '#EF8E38', '#F4B55C', '#994B42', '#A396A7'];

    var pieOption = {
        color: dunhuangColors,
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '80%'],
                data: pieData,
                label: {
                    show: false, // 初始不显示标签
                    position: 'outside', // 标签位置
                    formatter: '{b}', // 仅显示name
                    fontSize:18
                },
                labelLine: {
                    show: false // 初始不显示连接线
                }
            }
        ]
    };
    pieChart.setOption(pieOption);

    var dataIndex = 0;
    var interval;

    function showNextSector() {
        if (dataIndex < pieData.length) {
            pieChart.dispatchAction({
                type: 'pieToggleSelect',
                seriesIndex: 0,
                dataIndex: dataIndex
            });
            dataIndex++;
        } else {
            clearInterval(interval);
            // 当所有扇形都显示后，延时一段时间再显示标签和连接线
            setTimeout(() => {
                pieOption.series[0].label.show = true;
                pieOption.series[0].labelLine.show = true;
                pieChart.setOption(pieOption);
            }, 50); // 设置一个延时，例如1秒钟
        }
    }

    interval = setInterval(showNextSector, 80); // 每个扇形间隔200毫秒出现
  })();
  
  (function () {
    var countries = ['印度', '印度尼西亚', '巴基斯坦', '孟加拉国', '俄罗斯', '菲律宾', '越南', '埃及', '伊朗', '土耳其', '泰国', '缅甲', '乌克兰', '波兰', '伊拉克', '阿富汗', '沙特阿拉伯', '马来西亚'];
    var gdpData = [130971.31, 25880.22, 189873, 16151.34, 146305, 10419.56, 9263.77, 8, 80469, 7855.9, 6898.1, 5225.4, 4250.1, 3800.3, 3606.7, 3273.9, 3201.3, 3152.3];
    var myChart = echarts.init(document.querySelector(".line3 .chart"));

    var option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:8,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: countries,
            axisLabel: {
                textStyle: {
                    color: '#fff', // 设置y轴坐标文字颜色为白色
                    fontSize:18
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#fff' // 设置y轴坐标文字颜色为白色
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            formatter: function (params) {
                return params[0].name + '<br/>' + '人口数: ' + params[0].value + ' 万人';
            }
        },
        series: [{
            data: gdpData,
            type: 'line',
            areaStyle: {
                color: 'rgba(0, 0, 255, 0.3)' // Blue color fill
            }
        }]
    };
    window.addEventListener('resize', function () {
        myChart.resize();
      })

    myChart.setOption(option);
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.display = 'none';
    popup.style.backgroundColor = '#A9A9A9';
    document.body.appendChild(popup);
    popup.style.width='870px';
    popup.style.height='620px';
    var chartContainer = document.querySelector('.line3');
    var chart = document.querySelector('.line3 .chart');
    var isPopupVisible = false;

    document.querySelector('.line3 h2').addEventListener('click', function() {
        if (!isPopupVisible) {
            popup.style.display = 'block';
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.zIndex = '9999';
           chart.style.width = '100%';
           chart.style.height = '100%';
           popup.appendChild(chart);
           myChart.resize(); // 重新渲染图表以适应新的大小
          isPopupVisible = true;
        } else {
          popup.style.display = 'none';
          chartContainer.appendChild(chart);
          myChart.resize();
          isPopupVisible = false;
        }
    });
})();