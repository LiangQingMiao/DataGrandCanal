function getOption(graphInfo) {
    for (var i = 0; i < graphInfo.nodes.length; i++) {
        graphInfo.nodes[i].x = null;
        graphInfo.nodes[i].y = null;
        graphInfo.nodes[i].draggable = true;
    }
    title = graphInfo['title'];
    nodes = graphInfo['nodes'];
    links = graphInfo['links'];
    categories = graphInfo['categories'];
    var option = {
        title: {
            text: title,
            x: 'right',
            y: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                var abc = "<b>" + params.data.zs + "</b>";
                return abc;
            }
        },
        color: ['#EE6A50', '#4F94CD', '#B3EE3A', '#DAA520'],
        toolbox: {
            show: true,
            feature: {
                restore: {
                    show: true
                },
                magicType: {
                    show: true,
                    type: ['force', 'chord']
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        legend: {
            x: 'left',
            data: categories
        },
        series: [{
            type: 'force',
            name: title,
            ribbonType: false,
            categories: categories,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            color: '#333'
                        }
                    },
                    nodeStyle: {
                        brushType: 'both',
                        borderColor: 'rgba(255,215,0,0.4)',
                        borderWidth: 1
                    },
                    linkStyle: {
                        type: 'curve'
                    }
                },
                emphasis: {
                    label: {
                        show: false
                    },
                    nodeStyle: {},
                    linkStyle: {}
                }
            },
            useWorker: false,
            minRadius: 20,
            maxRadius: 20,
            gravity: 3.1,
            scaling: 2.5,
            linkSymbol: 'arrow',
            roam: 'move',
            nodes: nodes,
            links: links
        }]
    };
    return option;
}
function createGraph(myChart, mygraph) {
    option = getOption(mygraph) ;
    myChart.setOption(option);
    myChart.on('click',
    function(params) {
        var data = params.value
        if (data.source == undefined) {
            nodeName = params.name;
            window.open("http://www.bootstrapmb.com")
        }
    });
    myChart.on('mouseup',
    function(params) {
        var option = myChart.getOption();
        option.series[0].data[params.dataIndex].x = params.event.offsetX;
        option.series[0].data[params.dataIndex].y = params.event.offsetY;
        option.series[0].data[params.dataIndex].fixed = true;
        myChart.setOption(option);
    });
}