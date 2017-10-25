import React, { Component } from "react"
import "./Insight.css"
import axios from "axios"

//import CountUp from "react-countup"

import LineChart from "./linechart/LineChart"






export default class Insight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deliveryData: [],
            repairData: []
        }
    }
    componentDidMount() {
        axios.get('/api/repairs/d3count')
            .then(response => {
                this.setState({
                    deliveryData: response.data
                })
                console.log(this.state.deliveryData)
            })

        axios.get('/api/deliveries/d3count')
            .then(response => {
                this.setState({
                    repairData: response.data
                })
                console.log(this.state.repairData)
            })
    }


    render() {
        return (
            <div className="outermostDivI">
                <div className="fixedHeaderI">
                    <div className="sideBySideI">
                        <h1 className="insightsWord">INSIGHTS</h1>


                    </div>
                </div>
                <div className="centerGraphD">
                    <span className="graphTitle">DELIVERY CALLS</span>
                    <LineChart
                        width={1000}
                        height={400}
                        data={this.state.deliveryData}
                        selectX={datum => new Date(datum.date)}
                        selectY={datum => datum.count}
                        margin={50}
                    />
                </div>
                <div className="centerGraphD">
                    <span className="graphTitle">REPAIR CALLS</span>
                    <LineChart
                        width={1000}
                        height={400}
                        data={this.state.repairData}
                        selectX={datum => new Date(datum.date)}
                        selectY={datum => datum.count}
                        margin={50}
                    />
                </div>
            </div>
        )
    }
}