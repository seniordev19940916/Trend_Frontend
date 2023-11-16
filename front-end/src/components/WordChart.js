import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class WordChart extends React.Component {
    componentDidMount() {
        let chart = am4core.create('word-chart', am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.randomness = 0.1;
        series.rotationThreshold = 0.4;
        series.minFontSize = 12;
        series.maxFontSize = 70;
        series.data = this.getData(this.props.data);
        series.dataFields.word = "word";
        series.dataFields.value = "count";
        series.heatRules.push({
         "target": series.labels.template,
         "property": "fill",
         "min": am4core.color("#eec22d"),
         "max": am4core.color("#74bc5c"),
         "dataField": "value"
        });
        series.labels.template.url = "{url}";
        series.labels.template.urlTarget = "_blank";
        series.labels.template.isHTML = true;
        series.labels.template.tooltipText = this.props.platform === "google_trends" ? '[bold]{word}[/]: {value}+ searches' : '[bold]{word}[/]: {value} tweets';
        series.tooltip.fontSize = 15;
        const hoverState = series.labels.template.states.create("hover");
        hoverState.properties.fill = am4core.color("#009bd6"); 
        this.chart = chart;
        this.series = series;
    }
    
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    
    componentDidUpdate() {
        this.series.data = this.getData(this.props.data);
    }
    
    getData(data) {
        const chartData = [];
        if (data) {
            const metric = this.props.platform === "google_trends" ? "searches" : "tweets";
            data.forEach((item) => {
                chartData.push({
                    word: item.name, //app.decodeHTML(item.name),
                    count: item[metric],
                    url: item.url
                });
            });
        }
        return chartData;
    }
    
    render() {
        return (
            <div className="chart" id="word-chart"></div>
        );
    }
}

export default WordChart;