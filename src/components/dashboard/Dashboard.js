import React, { Component } from "react"
import "./Dashboard.css"
import axios from "axios"

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
        // const userData = axios.get('/auth/me')
        // .then(res => {
        //     //console.log(res.data)
        //     this.setState({

        //         userInfo: res.data
        //     })
        // })

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
                {/* <h2 className="tempInfo">{this.state.userInfo.email}</h2> */}

                <div className="rdCircles">
                    <h1>REPAIRS: {this.state.totalRepairs === 0 ? <Spinner name='double-bounce' /> : this.state.totalRepairs}</h1>
                    <h1>DELIVERIES: {this.state.totalDeliveries === 0 ? <Spinner name='double-bounce' /> : this.state.totalDeliveries}</h1>
                </div>

                <button onClick={this.showModal} onClose={this.showModal}>NEW CALL</button>

                <RepairModal show={this.state.hideModal} onClose={this.showModal} />

                <a href='http://localhost:3005/auth/logout'><button>Log out</button></a>

            </div>
        )
    }
}