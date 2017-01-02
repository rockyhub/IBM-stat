$(function () {

    // Uncomment to style it like Apple Watch
    
    if (!Highcharts.theme) {
        Highcharts.setOptions({
            chart: {
                backgroundColor: '#f5f5f5'
            },
            colors: ['#b32772', '#a0dfe8', '#8dba3f'],
            title: {
                style: {
                    color: 'silver'
                }
            },
            tooltip: {
                style: {
                    color: 'silver'
                }
            }
        });
    }
    // 

    Highcharts.chart('container', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        title: {
            text: 'Usage Comparison',
            style: {
                fontSize: '18px',
                color:'#000'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: -160,
            endAngle: 160,
            background: [{ // Track for Move
                outerRadius: '0%',
                innerRadius: '0%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '0%',
                innerRadius: '0%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '0%',
                innerRadius: '0%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '14px',
                dataLabels: {
                    enabled: true,
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                },
                linecap: 'square',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Team',
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: 54
            }],
            dataLabels:{
                format: '<div>{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span></div>',
            }
            
        }, {
            name: 'Business Unit',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '90%',
                innerRadius: '90%',
                y: 71
            }],
            dataLabels:{
                format: '<div>{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span></div>',
            }
        }, {
            name: 'IBM',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '80%',
                innerRadius: '80%',
                y: 89
            }],
            dataLabels:{
                format: '<div>{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span></div>',
            }
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path()
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path()
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path()
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });


});