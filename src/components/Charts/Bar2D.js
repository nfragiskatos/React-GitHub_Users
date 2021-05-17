import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "bar2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Forked",
        yAxisName: "Forks",
        xAxisName: "Repos",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px",
        paletteColors: "#4b42ff, #df00a9, #d70022, #005a71, #9400ff",
        theme: "fusion",
      },
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
