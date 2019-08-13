import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './Chart.css';

am4core.useTheme(am4themes_animated);

class Chart extends React.Component {
    componentDidMount() {
        console.log(this.state.data);
        let chart = am4core.create('chart', am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        
        series.randomness = 0.1;
        series.rotationThreshold = 0.4;
        const chartData = [];
        this.props.data.forEach((item) => {
            chartData.push({
                word: item.name, //app.decodeHTML(item.name),
                count: item.searches === 0 ? 10000 : item.searches,
                url: item.url
            });
        });
        series.data = chartData;
        series.dataFields.word = "word";
        series.dataFields.value = "count";
        series.heatRules.push({
         "target": series.labels.template,
         "property": "fill",
         "min": am4core.color("#ccc"),
         "max": am4core.color("#fff"),
         "dataField": "value"
        });
        series.labels.template.url = "{url}";
        series.labels.template.urlTarget = "_blank";
        series.labels.template.tooltipText = "[bold]{word}[/]: {value} tweet mentions";
        series.tooltip.fontSize = 15;
        const hoverState = series.labels.template.states.create("hover");
        hoverState.properties.fill = am4core.color("#009bd6"); 
        this.chart = chart;
        
        /*let chart = am4core.create("chart", am4charts.XYChart);
        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        this.chart = chart;
        */
    }
    
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    
    render() {
        return (
            <div className="Chart" id="chart" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

export default Chart;