// 柱状图模块1
(function () {
    var timeData = ['2015-02-01','2015-03-01','2015-04-01','2015-05-01','2015-06-01','2015-07-01','2015-08-01','2015-09-01','2015-10-01','2015-11-01','2015-12-01','2016-01-01','2016-02-01','2016-03-01','2016-04-01','2016-05-01','2016-06-01','2016-06-01','2016-07-01','2016-08-01','2016-09-01','2016-10-01','2016-11-01','2016-12-01',
             '2017-01-01','2017-02-01','2017-03-01','2017-04-01','2017-05-01','2017-06-01','2017-07-01','2017-08-01','2017-09-01','2017-10-01','2017-11-01','2017-12-01','2018-01-01','2018-02-01','2018-03-01','2018-04-01','2018-05-01','2018-06-01','2018-07-01','2018-08-01','2018-09-01','2018-10-01','2018-11-01','2018-12-01','2019-01-01','2019-02-01','2019-03-01',
              '2019-04-01','2019-05-01','2019-06-01','2019-07-01','2019-08-01','2019-09-01','2019-10-01','2019-11-01','2019-12-01','2020-01-01','2020-02-01','2020-03-01','2020-04-01','2020-05-01','2020-06-01','2020-07-01','2020-08-01','2020-09-01','2020-10-01','2020-11-01','2020-12-01','2021-01-01','2021-02-01','2021-03-01','2021-04-01','2021-05-01','2021-06-01',
              '2021-07-01','2021-08-01','2021-09-01','2021-10-01','2021-11-01','2021-12-01','2022-01-01','2022-02-01','2022-03-01','2022-04-01','2022-05-01','2022-06-01','2022-07-01','2022-08-01','2022-09-01','2022-10-01','2022-11-01','2022-12-01','2023-01-01','2023-02-01','2023-03-01','2023-04-01','2023-05-01','2023-06-01','2023-07-01','2023-08-01','2023-09-01','2023-10-01','2023-11-01','2023-12-01'];
              var importData = [76.56, 100, 100.69, 92.89, 101.86, 106.77, 96.3, 102.55, 92.39, 100.68, 115.43, 79.42, 66.02, 91.86, 89.49, 92.34, 92.62, 93.36, 97.9, 100.91, 90.79, 106.18, 119.58, 92.86, 91.58, 110.46, 99.67, 105.26, 108.34, 103.92, 111.49, 120.36, 106.55, 125.18, 125.37, 127.82, 97.63, 126.79, 121.87, 132.79, 123.28, 131.93, 134.6, 137.67, 128.22, 128.75, 115.8, 125.9, 92.52, 117.15,
              126.77, 121.5, 114.21, 124.53, 126.99, 125.94, 120.04, 129.42, 134.67, 105.68, 105.68, 116.61, 109.31, 101.53, 117.95, 123.7, 124.43, 143.07, 126.12, 135.96, 143.78, 129, 129, 160.42, 155.99, 154.1, 162.22, 159.52, 166.52, 168.63, 152.19, 179.1, 173.61, 151.27, 151.27, 161.38, 157, 161.94, 164.64, 163.49, 166.2, 167.95, 150.45, 159.65, 160.93, 137.39,
              137.39, 160.46, 144.8, 153.61, 151.5008284475, 141.9446128679, 152.834868025, 156.1551938296, 154.038818135, 157.7366097232];
              var exportData = [117.14, 100, 121.96, 130.9, 131.41, 133.92, 136, 142.08, 133.25, 136.31, 154.7, 117.44, 84.38, 107.53, 115.57, 121.82, 122.44, 125.26, 130.92, 127.18, 122.6, 134.2, 144.97, 124.99, 82.4, 124.27, 123.25, 131.1, 135.03, 133.2, 137.31, 137.24, 130.28, 149.64, 160.53, 138.31, 118.31, 120.57, 137.93, 146.71, 149.49, 148.65, 150.42, 156.28,
              148.92, 155.52, 153.18, 150.84, 93.76, 137.74, 134.15, 148.26, 147.56, 153.59, 148.92, 151.23, 147.63, 153.46, 164.76, 101.38, 101.38, 128.37, 138.85, 143.39, 148.07, 164.75, 163.11, 166.23, 164.44, 185.86, 195.46, 162.54, 162.54, 167.18, 182.98, 182.98, 195.11, 195.97, 204.05, 211.97, 208.15, 225.69, 236.07, 188.82, 188.82, 191.41, 189.7, 213.71, 229.67,
               230.85, 218.34, 223.77, 206.87, 204.87, 212.21, 175.51, 175.51, 218.8, 204.82, 196.54, 197.8172141111, 195.345108999, 197.4492907559, 207.3905066106, 190.5411715421, 202.4020175925];
              var totalData = [97.03, 100, 111.42, 112.06, 116.77, 120.46, 116.32, 122.49, 113, 118.65, 135.24, 98.6, 75.28, 99.77, 102.65, 107.21, 107.66, 109.45, 114.55, 114.16, 106.84, 120.31, 132.39, 109.06, 86.95, 117.43, 111.56, 118.29, 121.8, 118.69, 124.51, 128.87, 118.52, 137.52, 143.11, 133.11, 108.06, 123.65, 129.97, 139.81, 136.5, 140.37, 142.58, 147.06, 138.66,
              142.26, 134.66, 138.48, 93.15, 127.54, 130.49, 135, 131.03, 139.19, 138.05, 138.69, 133.96, 141.55, 149.85, 103.51, 103.51, 122.54, 124.21, 122.64, 133.14, 144.41, 143.94, 154.75, 145.45, 161.13, 169.85, 145.91, 145.91, 163.83, 169.6, 168.67, 178.81, 177.91, 185.45, 190.49, 180.42, 202.6, 205.12,
              170.21, 170.21, 176.53, 173.5, 188.05, 197.44, 197.47, 192.5, 196.11, 178.91, 182.46, 186.8, 156.62, 156.62, 189.89, 175.07, 175.27, 174.862958011, 168.8799898732, 175.3385221704, 181.9984455917, 172.4507191815, 180.2659809316];
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    // 2.指定配置项和数据
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: '#333',
        textStyle: {
          color: '#fff'
  },
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: timeData,
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 20
          }
        },
    },
    yAxis: {
        type: 'value',
        axisTick: {
          // 不显示刻度线
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 20
          }
        },
        splitLine: {
          lineStyle: {
              color: 'rgba(255,255,255,.1)' // 设置y轴横线的颜色为白色，可以根据需要修改颜色值
          }
      },
    },
    series: [
        {
            name: '进口贸易指数',
            type: 'bar',
            stack: '总量',
            data: importData,
            itemStyle: {
              color: 'lightblue' ,

          }
        },
        {
            name: '出口贸易指数',
            type: 'bar',
            stack: '总量',
            data: exportData,
            itemStyle: {
              color: '#8B78F6' ,
          }
        },
        {
            name: '进出口贸易指数',
            type: 'bar',
            stack: '总量',
            data: totalData,
            itemStyle: {
              color: '#1089E7' ,
              normal: {
                label: {
                    show: true,
                    color: 'white', // 使用与折线颜色一致的颜色
                    position: 'top' ,// 将数据标签显示在折线顶部
                    formatter: function (params) {
                      // 控制标签显示，例如只显示偶数索引位置的标签
                      if (params.dataIndex % 2 === 0) {
                          return params.value;
                      } else {
                          return '';
                      }
                  },
                    textStyle: {
                      fontSize: 15 // 设置标签中数字字体的大小
                  }
                }
            }
          }
        }
    ],
      // 修改图表位置大小
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '4%',
        containLabel: true,
        splitLine: {
          lineStyle: {
              color: 'transparent' // 设置图表横线的颜色
          }
      }
      },


    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    var dataIndex = 0;
var timer = setInterval(function() {
    if (dataIndex < timeData.length) {
        myChart.setOption({
            series: [
                {
                    data: importData.slice(0, dataIndex + 1)
                },
                {
                    data: exportData.slice(0, dataIndex + 1)
                },
                {
                    data: totalData.slice(0, dataIndex + 1)
                }
            ]
        });
        dataIndex++;
    } else {
        dataIndex = 0; // 重置数据索引
    }
}, 170); // 设置每隔0.17秒绘制一个数据点


    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 柱状图模块2
  (function () {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));

    // 2.指定配置项和数据
    var option = {
      grid: {
        top: "10%",
        left: '22%',
        bottom: '10%',
        // containLabel: true
      },
      tooltip: {},
      yAxis: {
          data:['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
          axisTick: {
            // 不显示刻度线
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 24
            }
          },
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 24
          }
        },
        splitLine: {
          lineStyle: {
              color: 'rgba(255,255,255,.1)' // 设置y轴横线的颜色为白色，可以根据需要修改颜色值
          }
      },
      },
      series: [{
          name: '投资国家个数',
          type: 'bar',
          data: [49, 53, 59, 56, 56, 58, 57, 57],
          barCategoryGap: '50%',
          itemStyle: {
            color: '#F8B448' // 设置第一段的颜色
        },
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
              // 获取折线最后一个数据点的值
              var lastValue = params.data[params.data.length - 1];
              return lastValue;
          },
          textStyle: {
            fontSize: 20,
            color:"white"
        }
      }

      },{
          name: '投资额',
          type: 'bar',
          data: [148.2, 145.3, 143.6, 156.4, 150.4, 177.9, 203, 209.7],
          barCategoryGap: '50%',
          itemStyle: {
            color: '#8B78F6' // 设置第一段的颜色
        },
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
              // 获取折线最后一个数据点的值
              var lastValue = params.data[params.data.length - 1];
              return lastValue;
          },
          textStyle: {
            fontSize: 20,
            color:"white"
        }
      }
      }],
      animation: true,
      animationDuration: 12000,
      animationEasing: 'linear' ,
      animationRepeat: true, // 设置动画循环
    };

    // 3.把配置项给实例对象
    myChart.setOption(option);

    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 折线图模块1
  (function () {
    var timeData = ['2017-07-01','2017-08-01','2017-09-01','2017-10-01','2017-11-01','2017-12-01','2018-01-01','2018-02-01','2018-03-01','2018-04-01','2018-05-01','2018-06-01','2018-07-01',
             '2018-08-01','2018-09-01','2018-10-01','2018-11-01','2018-12-01','2019-01-01','2019-02-01','2019-03-01','2019-04-01','2019-05-01','2019-06-01','2019-07-01','2019-08-01','2019-09-01','2019-10-01','2019-11-01','2019-12-01','2020-01-01','2020-02-01','2020-03-01','2020-04-01','2020-05-01','2020-06-01','2020-07-01','2020-08-01','2020-09-01','2020-10-01','2020-11-01','2020-12-01','2021-01-01','2021-02-01','2021-03-01','2021-04-01',
             '2021-05-01','2021-06-01','2021-07-01','2021-08-01','2021-09-01','2021-10-01','2021-11-01','2021-12-01','2022-01-01','2022-02-01','2022-03-01','2022-04-01',
             '2022-05-01','2022-06-01','2022-07-01','2022-08-01','2022-09-01','2022-10-01','2022-11-01','2022-12-01','2023-01-01','2023-02-01','2023-03-01','2023-04-01','2023-05-01','2023-06-28','2023-07-26','2023-08-30','2023-09-27','2023-10-25','2023-11-29','2023-12-27'];
             var tradeVolumeData = [112.11 ,108.63 ,113.1 ,118.16 ,108.08 ,131.01 ,127.79 ,125.59 ,112.39 ,109.14 ,121.29 ,126.86 ,124.61 ,124.88 ,126.63 ,133.29 ,127.01 ,134.91 ,123.57 ,129.35 ,96.57 ,121.77 ,128.74 ,129.01 ,130 ,132.84 ,133.67 ,139.8 ,131.35 ,144.82 ,148.78 ,148.78 ,112.06 ,123.82 ,119.79 ,
             111.68 ,129.05 ,134.93 ,134.96 ,151.01 ,138.51 ,153.53 ,161.07 ,null ,149.28 ,157.81 ,172.4 ,165.16 ,181.82 ,171.49 ,181.33 ,189.38 ,173.83 ,204.76 ,206.06 ,201.41 ,156.29 ,178.81 ,189.57 ,200.05 ,209.66 ,209.61 ,205.55 ,217.76 ,193.73 ,212.09 ,207.05 ,190.496990303 ,177.9932574444 ,
             215.8517420782 ,201.75 ,192.4 ,199.62 ,184.09 ,191.85 ,205.68 ,192.36 ,207.55 ];
             var containerVolumeData = [117.46 ,121.43 ,121.12 ,117.17 ,105.52 ,121.9 ,126.69 ,123.93 ,106.35 ,107.05 ,126.75 ,129.53 ,123.85 ,118.1 ,119.34 ,127.24 ,115.2 ,118.26 ,122.95 ,115.32 ,93.76 ,129.44 ,131.9 ,133.98 ,135.74 ,134.14 ,134.51 ,131.17 ,122.14 ,131.04 ,140.28 ,140.28 ,107.74 ,124.94 ,122.48 ,
             117.9 ,129.98 ,137.39 ,143.06 ,143.3 ,138.88 ,147.5 ,148.25 ,145.27 ,125.83 ,145.89 ,152.62 ,145.2 ,138.92 ,139.91 ,152.28 ,144.32 ,140.11 ,145.41 ,155.24 ,165.89 ,120.33 ,127.37 ,107.45 ,110.62 ,136.76 ,141.09 ,131.56 ,128.11 ,124.47 ,134.22 ,130.41 ,127.52 ,120.2552188369 ,147.7393302947 ,154.95 ,146.32 ,153.78 ,150.4 ,147.41 ,152.15 ,141.12 ,147.74 ];
             var shippingPriceData = [91.03 ,94.86 ,98.52 ,101.68 ,99.81 ,101.76 ,90.71 ,93.56 ,91.94 ,89.32 ,94.82 ,97.6 ,101.23 ,105.14 ,99.99 ,104.19 ,98.52 ,101.3 ,94.82 ,89.16 ,89.39 ,84.29 ,90.06 ,93.67 ,102.62 ,106.64 ,112.53 ,112.67 ,104.88 ,109.79 ,108.53 ,93.2 ,97.02 ,102.62 ,86.33 ,93.13 ,101.1 ,99.31 ,99.07 ,103.46 ,101.67 ,123.03 ,152.34 ,159 ,170.29 ,176.77 ,
             200.18 ,207.87 ,222.87 ,247.19 ,260.18 ,276.23 ,243.74 ,239.94 ,238.26 ,241.33 ,255.1 ,240.48 ,250.59 ,247.14 ,243.32 ,219.94 ,201.48 ,180.64 ,159.87 ,138.88 ,123.13 ,113.97 ,124.62 ,119.67 ,114.24 ,109.66 ,104.74 ,100.79 ,103.32 ,113.32 ,110.66 ,124.19 ];
               // 指定图表的配置项和数据
    var myChart = echarts.init(document.querySelector(".line .chart"));
    var option = {
      tooltip: {
        trigger: 'axis',
          // 修改悬浮框的背景颜色和边框颜色
        backgroundColor: 'rgba(50,50,50,0.7)',
        position: function (point, params, dom, rect, size) {
           return {top: point[1], left: '90%'};
       },
        borderColor: '#333',
        textStyle: {
              color: '#fff'
  }
    },

    xAxis: {
              type: 'category',
              data: timeData,
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)"
                }
              },
              axisLabel: {
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: 20
                }
              },
    },
    yAxis: {
        type: 'value',
        axisTick: {
          // 不显示刻度线
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 20
          }
        },
        splitLine: {
          lineStyle: {
              color: 'rgba(255,255,255,.1)' // 设置y轴横线的颜色为白色，可以根据需要修改颜色值
          }
      },
    },
    series: [
        {
            name: '一带一路贸易额指数',
            type: 'line',
            data: tradeVolumeData,
            itemStyle: {
              color: '#1089E7', // 设置第一段的颜色
          },
          label: {
            show: true,
            position: 'right',
            formatter: function (params) {
                // 获取折线最后一个数据点的值
                var lastValue = params.data[params.data.length - 1];
                return lastValue;
            },
            textStyle: {
              fontSize: 16,
              color:"white"
          }
        }
        },
        {
            name: '一带一路集装箱海运量指数',
            type: 'line',
            data: containerVolumeData,
            itemStyle: {
              color: '#F57474', // 设置第一段的颜色
          },
          label: {
            show: true,
            position: 'right',
            formatter: function (params) {
                // 获取折线最后一个数据点的值
                var lastValue = params.data[params.data.length - 1];
                return lastValue;
            },
            textStyle: {
              fontSize: 20,
              color:"white"
          }
        }
        },
        {
            name: '海上丝绸之路运价指数',
            type: 'line',
            data: shippingPriceData,
            itemStyle: {
              color: '#56D0E3' ,// 设置第一段的颜色
          },
          label: {
            show: true,
            position: 'right',
            formatter: function (params) {
                // 获取折线最后一个数据点的值
                var lastValue = params.data[params.data.length - 1];
                return lastValue;
            },
            textStyle: {
              fontSize: 20,
              color:"white"
          }
        }
        }
    ],
      grid: {
        top: "20%",
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show: true, // 显示边框
        borderColor: '#012f4a' // 边框颜色
      },

    };

    myChart.setOption(option);
    var currentIndex = 0;
    var interval = setInterval(function() {
      myChart.setOption({
        series: [
          {
            data: tradeVolumeData.slice(0, currentIndex),
          },
          {
            data: containerVolumeData.slice(0, currentIndex),
          },
          {
            data: shippingPriceData.slice(0, currentIndex),
          }
        ]
      });

      if (currentIndex < timeData.length) {
        currentIndex++;

        // 让悬浮框随折线缓慢移动并显示数据
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex - 1 // 显示当前数据点的悬浮框
        });
      } else {
        currentIndex = 0; // 重置currentIndex为0，实现循环绘制
      }
    }, 150);


    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function () {
      myChart.resize();
    })

    myChart.setOption(option);
  })();

  (function () {
    var myChart = echarts.init(document.querySelector('.line2 .chart'));

    var option = {
      grid: {
        top: '30',
        left: '10',
        right: '30',
        bottom: '10',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
          data: ["2015","2016","2017","2018","2019","2020","2021","2022"],
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 20
            }
          },
      },
      yAxis: {
        axisTick: {
          // 不显示刻度线
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 20
          }
        },
        splitLine: {
          lineStyle: {
              color: 'rgba(255,255,255,.1)' // 设置y轴横线的颜色为白色，可以根据需要修改颜色值
          }
      },
      },
      series: [{
          name: '投资额同比增长',
          type: 'line',
          areaStyle: { // 添加这一行
            color: 'blue' // 设置填充颜色为红色
          },
          lineStyle: {
          },
          label: {
            show: true,
            position: 'right',
            formatter: function (params) {
                // 获取折线最后一个数据点的值
                var lastValue = params.data[params.data.length - 1];
                return lastValue;
            },
            textStyle: {
              fontSize: 20,
              color:"white"
          }
        },
          data: [18.2, -2, -1.2, 8.9, -3.8, 18.30,14.10,3.3]
      }],
      // animation: true, // 添加这一行
      // animationDuration: 3000, // 添加这一行
      // animationEasing: 'linear' // 添加这一行
    };

    myChart.setOption(option);
    var currentIndex = 0;
    var interval = setInterval(function () {
        myChart.setOption({
            series: [
                {
                    data: option.series[0].data.slice(0, currentIndex),
                }
            ]
        });

        if (currentIndex < option.xAxis.data.length) {
            currentIndex++;

            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: currentIndex - 1
            });
        } else {
            currentIndex = 0;
        }
    }, 1200);

    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();



  // 饼形图1
  (function () {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    var option = {
      color: ["#1089E7", "#F57474"],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        position: 'right'
      },
      legend: {
        // 垂直居中,默认水平居中
        // orient: 'vertical',

        bottom: 0,
        left: 10,
        // 小图标的宽度和高度
        itemWidth: 10,
        itemHeight: 10,
        // 修改图例组件的文字为 12px
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "19"
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
  })();

  // 饼形图2
  (function () {
    var myChart = echarts.init(document.querySelector('.pie2 .chart'));
    var option = {
      color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: 20
        }
      },
      series: [{
        name: '地区分布',
        type: 'pie',
        radius: ["10%", "60%"],
        center: ['50%', '40%'],
        // 半径模式  area面积模式
        roseType: 'radius',
        // 图形的文字标签
        label: {
          fontsize: 20
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长(斜线)
          length: 6,
          // 连接文字线长(横线)
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
