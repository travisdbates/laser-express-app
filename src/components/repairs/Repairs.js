import "./Repairs.css"
import RepairModal from "../repairModal/RepairModal"

import React, { Component } from "react"
import axios from "axios"

var Spinner = require('react-spinkit');




export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideModal: false,
            
            repairs: [],
            customersTest: [
                {
                    "customerid": 1,
                    "name": "Customer Name",
                    "phone": "8012338495",
                    "streetaddress": "33 W Center",
                    "city": "Provo",
                    "state": "UT"
                }]
        }
        this.mapOverUsers = this.mapOverUsers.bind(this)
        this.showModal = this.showModal.bind(this)
    }
    componentDidMount() {
        axios.get("/api/repairs/get")
            .then(response => {
                this.setState({ repairs: response.data })
            })
    }

    showModal() {
        this.setState({ hideModal: !this.state.hideModal })
        console.log(this.state.hideModal)
    }

    mapOverUsers() {
        this.state.customers.map((customer, index) => {
            return (
                <h2>{customer.name}</h2>
            )

        })
    }
    render() {
        return (
            <div className="outermostDiv">
                <div className="fixedHeader">
                    <h1 className="repairsWord">REPAIRS</h1>
                    <div className="repairsHeader">
                        <span className="headerTitleRepairs">DATE</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">TIME</span>
                        <div className="repairsDivider"></div>
                        
                        <span className="headerTitleRepairs">STATUS</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">CONTACT</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">ADDRESS</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">PHONE</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">PRINTER</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">TECH</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">SYMPTOMS</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">ORDERED</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">INVOICED</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">NOTES</span>
                    </div>
                </div>
                {this.state.repairs.length === 0 ? <Spinner name='double-bounce' /> : this.state.repairs.map((repairs, index) => {
                    return (
                        <div className="repairContainer" key={repairs.repairsid}>
                            <span className="detailsRepairs">{repairs.date}</span>
                            <span className="detailsRepairs">{repairs.time}</span>
                            <span className="detailsRepairs">{repairs.status}</span>
                            <span className="detailsRepairs">{repairs.contactname}</span>
                            <span className="detailsRepairs">{repairs.streetaddress}</span>
                            <span className="detailsRepairs">{repairs.phone}</span>
                            <span className="detailsRepairs">{repairs.printer}</span>
                            <span className="detailsRepairs">{repairs.tech}</span>
                            <span className="detailsRepairs">{repairs.symptoms}</span>
                            <span className="detailsRepairs">{repairs.orderstatus === false ? "NO" : "YES"}</span>
                            <span className="detailsRepairs">{repairs.invoicestatus === false ? "NO" : "YES"}</span>
                            <span className="detailsRepairs">{repairs.notes}</span>


                        </div>
                    )
                })}
                <button className="addDeliveryButton" onClick={this.showModal} onClose={this.showModal}>
                    <div className="vert"></div>
                    <div className="horiz"></div>
                </button>

                <RepairModal show={this.state.hideModal} onClose={this.showModal} />
            </div>

        )
    }
}