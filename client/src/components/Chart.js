import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './Chart.css';

am4core.useTheme(am4themes_animated);

class Chart extends React.Component {
    componentDidMount() {
        let chart = am4core.create('chart', am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.randomness = 0.1;
        series.rotationThreshold = 0.4;
        series.minFontSize = 12;
        series.maxFontSize = 70;
        series.data = this.getData(this.props.platform, this.props.data);
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
        series.labels.template.isHTML = true;
        series.labels.template.tooltipText = '[bold]{word}[/]: {value}';
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
        this.series.data = this.getData(this.props.platform, this.props.data);
    }
    
    getData(platform, data) {
        const metrics = {
            google_trends: 'searches',
            reddit_subs: 'subscribers',
            youtube_videos: 'views',
        }
        const metric = metrics[this.props.platform];        
        const chartData = [];
        data.forEach((item) => {
            chartData.push({
                word: item.name, //app.decodeHTML(item.name),
                count: item[metric] === 0 ? 10000 : item[metric],
                url: item.url
            });
        });
        return chartData;
    }
    
    render() {
        return (
            <div className="Chart" id="chart"></div>
        );
    }
}

export default Chart;