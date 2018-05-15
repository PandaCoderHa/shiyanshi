var months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
];
$(function() {
    //getShiYanShis();
    getAllYuYue();
    var myChart = echarts.init(document.getElementById("lineChart"), "default");
    var option;
    var timer = setInterval(() => {
        if (YuYueS) {
            clearInterval(timer);
            var pieData = [];
            YuYueS.forEach(y => {
                //{ value: 335, name: "直接访问" },
                var p = pieData.find(
                    p => p.name == months[new Date(y.kaishi).getMonth()]
                );
                if (p) {
                    p.value = p.value + 1;
                } else {
                    pieData.push({
                        value: 1,
                        name: months[new Date(y.kaishi).getMonth()]
                    });
                }
            });
            pieData.sort(function(a, b) {
                return months.indexOf(a.name) > months.indexOf(b.name) ? 1 : -1;
            });
            option = {
                title: {
                    text: "实验室预约数"
                },
                tooltip: {
                    trigger: "axis"
                },
                // legend: {
                //   data: ["最高气温", "最低气温"]
                // },
                // toolbox: {
                //   show: true,
                //   feature: {
                //     mark: {show: true},
                //     dataView: {show: true, readOnly: false},
                //     magicType: {show: true, type: ["line", "bar"]},
                //     restore: {show: true},
                //     saveAsImage: {show: true}
                //   }
                // },
                calculable: true,
                xAxis: [{
                    type: "category",
                    boundaryGap: false,
                    data: pieData.map(p => p.name)
                }],
                yAxis: [{
                    type: "value",
                    axisLabel: {
                        formatter: "{value}"
                    }
                }],
                series: [{
                    name: "实验室预约数",
                    type: "line",
                    data: pieData.map(p => p.value),
                    markPoint: {
                        data: [{ type: "max", name: "最大值" }, { type: "min", name: "最小值" }]
                    },
                    markLine: {
                        data: [{ type: "average", name: "平均值" }]
                    }
                }]
            };

            myChart.setOption(option);

            ////////////////////////////////////////////////////////////////////
            myChart = echarts.init(document.getElementById("pieChart"));
            var pieData = [];
            YuYueS.forEach(y => {
                //{ value: 335, name: "直接访问" },
                var p = pieData.find(p => p.name == $.trim(y.shiyanshiMing));
                if (p) {
                    p.value = p.value + 1;
                } else {
                    pieData.push({ value: 1, name: $.trim(y.shiyanshiMing) });
                }
            });
            option = {
                title: {
                    text: "各实验室预约次数",
                    //   subtext: "纯属虚构",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable: true,
                series: [{
                    name: "实验室预约数",
                    type: "pie",
                    radius: "85%",
                    center: ["50%", "50%"],
                    data: pieData
                }]
            };
            myChart.setOption(option);
        }
    }, 300);
});

function daochu() {
    var obj = {
        title: ["姓名", "班级", "实验室", '开始时间', '结束时间', '指导教师', '学院', '实验项目'],
        titleForKey: ['xueshengxingming', 'banji', "shiyanshiMing", 'kaishi', 'jieshu', 'zhidaojiaoshi', 'xueyuan', 'xiangmu'],
        data: YuYueS
    };
    exportCsv(obj);
}

function exportCsv(obj) {
    //title ["","",""]
    var title = obj.title;
    //titleForKey ["","",""]
    var titleForKey = obj.titleForKey;
    var data = obj.data;
    var str = [];
    str.push('序号,' + obj.title.join(",") + "\n");
    for (var i = 0; i < data.length; i++) {
        var temp = [i + 1];
        for (var j = 0; j < titleForKey.length; j++) {
            temp.push(data[i][titleForKey[j]]);
        }
        str.push(temp.join(",") + "\n");
    }
    var uri = "data:text/csv;charset=utf-8," + encodeURIComponent(str.join(""));
    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = "export.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}