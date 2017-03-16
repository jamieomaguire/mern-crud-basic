import React, { Component } from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';

import style from './style';

class DailyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      okay: 0,
      bad: 0,
      chartData: {
        labels: ['Good', 'Okay', 'Bad'],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    '#68D286',
                    '#FBAD2F',
                    '#EB585C'
                ],
                hoverBackgroundColor: [
                '#68D286',
                '#FBAD2F',
                '#EB585C'
                ]
            }
        ],
        options: {
            cutoutPercentage: 50,
            datasetStrokeWidth : 5,
            elements: {
                arc: {
                    borderWidth: 2
                }
            },
            legend: {
                labels: {
                    boxWidth: 20,
                    padding: 25
                }
            }
        }
      }, // chartData
    };
    this.retrieveMealValues = this.retrieveMealValues.bind(this);
    this.calculateMealValues = this.calculateMealValues.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }
  // retrieve the meal values from the entries data
  retrieveMealValues() {
    let entries = this.props.data;
    let values = entries.map((el) => {
      return el.value;
    });
    // calculate the meal values and set the state
    this.calculateMealValues(values);
  }
  // calculate the number of each meal value
  calculateMealValues(vals) {
    let values = vals;
    // create values to use when reducing the values array
    let good = 'good';
    let okay = 'okay';
    let bad = 'bad';
    // calculate the occurences of good, okay and bad in the values array
    let goodCount = values.reduce((n, val) => {
      return n + (val === good);
    }, 0);
    let okayCount = values.reduce((n, val) => {
      return n + (val === okay);
    }, 0);
    let badCount = values.reduce((n, val) => {
      return n + (val === bad);
    }, 0);
    this.setState({
      good: goodCount * 10,
      okay: okayCount * 10,
      bad: badCount * 10
    });
  }
  // retreive the values, calculate the occurences and then update the chart with those values
  updateChart() {
    this.retrieveMealValues();
    this.setState({
      chartData: {
        labels: ['Good', 'Okay', 'Bad'],
        datasets: [
            {
                data: [`${this.state.good}`, `${this.state.okay}`, `${this.state.bad}`],
                backgroundColor: [
                    '#68D286',
                    '#FBAD2F',
                    '#EB585C'
                ],
                hoverBackgroundColor: [
                '#68D286',
                '#FBAD2F',
                '#EB585C'
                ]
            }
        ],
        options: {
            cutoutPercentage: 50,
            datasetStrokeWidth : 5,
            elements: {
                arc: {
                    borderWidth: 2
                }
            },
            legend: {
                labels: {
                    boxWidth: 20,
                    padding: 25
                }
            }
        }
      }
    })
  }
  // load entries into state
  componentWillMount() {
    setInterval(
      this.updateChart, 0
    );
  }

  render() {

    defaults.global.legend.display = false;

    return (
      <div style={ style.container }>
        <Doughnut data={ this.state.chartData }/>
        {/*<h3>Good is: {this.state.good > 0 ? this.state.good : null}</h3>
        <h3>Okay is: {this.state.okay > 0 ? this.state.okay : null}</h3>
        <h3>Bad is: {this.state.bad > 0 ? this.state.bad : null}</h3>*/}
      </div>
    )
  }
}

export default DailyChart;