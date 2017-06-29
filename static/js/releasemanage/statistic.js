/**
 * Created by hekangjia on 16-5-11.
 */

var project_chart = echarts.init(document.getElementById('project_chart'));
var project_chart_option = {
    title: {
        text: '项目发布统计'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        left: 'right',
        data:['开发环境', '测试环境']
    },
    color:['#3c8dbc', '#008d4c'],
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
            data : ['0621', '0620', '0619', '0615', '0522', '0611', '0601']
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
            name:'开发环境',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[320, 302, 301, 334, 390, 330, 320]
        },
        {
            name:'测试环境',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[120, 132, 101, 134, 90, 230, 210]
        }
    ]
};
project_chart.showLoading();


var time_chart = echarts.init(document.getElementById('time_chart'));
var time_chart_option = {
    title: {
        text: '时间发布统计'
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
time_chart.showLoading();

var people_chart = echarts.init(document.getElementById('people_chart'));
var people_chart_option = {
    title: {
        text: '人员发布统计'
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
people_chart.showLoading();

var module_chart = echarts.init(document.getElementById('module_chart'));
var module_chart_option = {
    title: {
        text: '模块发布统计'
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
module_chart.showLoading();
