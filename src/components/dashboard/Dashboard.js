import React, { Component } from "react"
import "./Dashboard.css"
import axios from "axios"
import {Link} from "react-router-dom"

import {render} from "react-dom"
import CountUp from "react-countup"

import RepairModal from "../repairModal/RepairModal"

var Spinner = require('react-spinkit');


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            totalRepairs: 0,
            totalDeliveries: 0,
            hideModal: false,

        }
        this.showModal = this.showModal.bind(this)
    }
    componentDidMount() {
        const userData = axios.get('/auth/me')
        .then(res => {
            console.log(res.data)
            this.setState({

                userInfo: res.data
            })
        })

        axios.get('/api/repairs/count')
            .then(response => {
                console.log(response.data)
                this.setState({ totalRepairs: response.data[0].count })
            })

        axios.get('/api/deliveries/count')
            .then(response => {
                console.log(response.data)
                this.setState({ totalDeliveries: response.data[0].count })
            })


    }

    showModal() {
        this.setState({ hideModal: !this.state.hideModal })
        console.log(this.state.hideModal)
    }
    render() {
        return (
            <div className="dash-container">
                <h1 className="tempTitle">DASHBOARD</h1>
              <h1 className="greeting">Welcome, {this.state.userInfo.user_name}.</h1>

                <div className="rdCircles">
                    <div className="aboveBelow">
                        <Link className="circle" to="localhost:3000/repairs">{this.state.totalRepairs === 0 ? <Spinner name='double-bounce' /> : <CountUp duration={1.84} start={0} end={this.state.totalRepairs}/>}&nbsp;</Link>
                        <span className="descriptions">REPAIRS</span>
                    </div>
                    <div className="aboveBelow">
                        <Link className="circle" to="localhost:300/>deliveries">{this.state.totalDeliveries === 0 ? <Spinner name='double-bounce' /> : <CountUp duration={1.84} start={0} end={this.state.totalDeliveries}/>}&nbsp;</Link>
                        <span className="descriptions">DELIVERIES</span>
                    </div>
                </div>

                <button onClick={this.showModal} onClose={this.showModal} className="newCall">N&nbsp;&nbsp;E&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp; C&nbsp;&nbsp;A&nbsp;&nbsp;L&nbsp;&nbsp;L</button>

                <RepairModal show={this.state.hideModal} onClose={this.showModal} />

                <a href='http://localhost:3005/auth/logout'><button  className="newCall">L&nbsp;&nbsp;O&nbsp;&nbsp;G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; O&nbsp;&nbsp;U&nbsp;&nbsp;T</button></a>

            </div>
        )
    }
}