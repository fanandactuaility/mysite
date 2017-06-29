/**
 * Created by hekangjia on 16-2-24.
 */
// 基于准备好的dom，初始化echarts实例
var status_statistics_chart = echarts.init(document.getElementById('status_statistics_chart'));
var status_statistics_chart_option = {
    title : {
        text: '发布状态统计',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        left: 'right',
        data: ['发布成功', '发布失败', '正在发布','异常状态']
    },
    color:['#008d4c','#dd4b39', '#3c8dbc', '#f39c12'],
    series : [
        {
            name: '发布状态',
            type: 'pie',
            radius : '75%',
            center: ['50%', '60%'],
            data:[
                {value:1335, name:'发布成功'},
                {value:310, name:'发布失败'},
                {value:10, name:'正在发布'},
                {value:234, name:'异常状态'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

status_statistics_chart.showLoading();
//status_statistics_chart.setOption(status_statistics_chart_option);

var time_statistics_chart = echarts.init(document.getElementById('time_statistics_chart'));
var time_statistics_chart_option = {
    title: {
        text: '发布时间统计'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        left: 'right',
        data:['发布成功','发布失败', '正在发布','异常状态']
    },
    color:['#008d4c','#dd4b39', '#3c8dbc', '#f39c12'],
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '7%',
        top: '12%',
        bottom: '12%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['2016/02/20','2016/02/21','2016/02/22','2016/02/23','2016/02/25','2016/02/28','2016/02/29']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 10         // 右边在 第七个 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 10         // 右边在 第七个 的位置。
        }
    ],
    series : [
        {
            name:'发布成功',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'发布失败',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'正在发布',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'异常状态',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
        }
    ]
};
time_statistics_chart.showLoading();

var module_statistics_chart = echarts.init(document.getElementById('module_statistics_chart'));
var module_statistics_chart_option = {
    title: {
        text: '发布模块统计'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        left: 'right',
        data:['发布成功', '发布失败', '正在发布', '异常状态']
    },
    color:['#008d4c','#dd4b39', '#3c8dbc', '#f39c12'],
    grid: {
        left: '3%',
        right: '7%',
        top: '12%',
        bottom: '12%',
        containLabel: true
    },
    yAxis : [
        {
            type : 'value'
        }
    ],
    xAxis : [
        {
            type : 'category',
            data : ['carman', 'oms', 'datacenter', 'wms', 'goodscenter', 'shop', 'sshop']
        }
    ],
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 6         // 右边在 第七个 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 6         // 右边在 第七个 的位置。
        }
    ],
    series : [
        {
            name:'发布成功',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[320, 302, 301, 334, 390, 330, 320]
        },
        {
            name:'发布失败',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'正在发布',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {}},
            data:[150, 212, 201, 154, 190, 330, 410]
        },
        {
            name:'异常状态',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        }
    ]
};
module_statistics_chart.showLoading();

var people_statistics_chart = echarts.init(document.getElementById('people_statistics_chart'));
var people_statistics_chart_option = {
    title: {
        text: '发布人员统计'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        left: 'right',
        data:['发布成功', '发布失败', '正在发布', '异常状态']
    },
    color:['#008d4c','#dd4b39', '#3c8dbc', '#f39c12'],
    grid: {
        left: '3%',
        right: '7%',
        top: '12%',
        bottom: '12%',
        containLabel: true
    },
    yAxis : [
        {
            type : 'value'
        }
    ],
    xAxis : [
        {
            type : 'category',
            data : ['张三','李四','王五','赵六','阿猫','阿狗','词穷']
        }
    ],
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 6         // 右边在 第七个 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 6         // 右边在 第七个 的位置。
        }
    ],
    series : [
        {
            name:'发布成功',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[320, 302, 301, 334, 390, 330, 320]
        },
        {
            name:'发布失败',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'正在发布',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'异常状态',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {}},
            data:[150, 212, 201, 154, 190, 330, 410]
        }
    ]
};
people_statistics_chart.showLoading();

var trend_statistics_chart = echarts.init(document.getElementById('trend_statistics_chart'));
var trend_statistics_chart_option = {
    title : {
        text: '发布趋势统计',
        subtext: '"1"代表成功，"0"代表失败，最多展示200条发布状态'
    },
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
    color:['#008d4c','#dd4b39', '#3c8dbc', '#f39c12'],
        grid: {
        left: '3%',
        right: '7%',
        top: '15%',
        bottom: '15%',
        containLabel: true
    },
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 10         // 右边在 第七个 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            startValue: 0,      // 左边在 第一个 的位置。
            endValue: 10         // 右边在 第七个 的位置。
        }
    ],
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'状态',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1, 1, 1, 0, 1, 1, 1]
        }
    ]
};
trend_statistics_chart.showLoading();
