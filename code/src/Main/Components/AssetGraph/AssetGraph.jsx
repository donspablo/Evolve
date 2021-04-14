import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import "../box.css";
import "./assetgraph.css";
class AssetGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: '55%',
            },
          }
        },
        stroke: {
          show: false
        },

        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: 'right',
          floating: false,
          fontSize: '16px',
          fontFamily: "HelveticaNeueCyr, HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', 'sans-serif'",
          fontWeight: 400,
          tooltipHoverFormatter: undefined,
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: ["#fff"],
            useSeriesColors: false
          },
          itemMargin: {
            vertical: 5
        },
        },
        labels: ['Stocks', 'Crypto', 'Bonds', 'Other Assets']
      },
      series:[],
      loading: 1
    }
  }
  
  componentDidUpdate(prevProps){

    if(prevProps.purchasePrice !== this.props.purchasePrice && this.props.isDataLoaded === 0){
      this.setState({series: this.props.purchasePrice, loading: 0})
    }
  }

  render() {

    // console.log(this.props.isDataLoaded);
    // console.log(this.props.purchasePrice);

    return (
      <div className="box assetgraph" style={this.props.gradient}>
        <span className="title">Purchase Price Distribution</span>
        <div id="chart-holder">
        {this.state.loading === 0 ? this.state.series.reduce((a,b) => a + b) !== 0 ? <Chart options={this.state.options} series={this.state.series} type="donut" width="400" /> : <span id="chart-status">No assets!</span> : <span id="chart-status">Loading chart...</span>}
        </div>
      </div>
    );
  }
}

export default AssetGraph;