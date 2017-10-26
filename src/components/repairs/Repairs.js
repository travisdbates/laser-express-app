/* eslint-disable*/

import "./Repairs.css"
import RepairModal from "../repairModal/RepairModal"

import React, { Component } from "react"
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
import "../../../node_modules/react-toastify/dist/ReactToastify.min.css"

import Toggle from 'react-toggle'
import "../deliveries/react-toggle.css"


var Spinner = require('react-spinkit');




export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideModal: false,
            hideComplete: false,


            repairs: [],
            completeRepairs: [],

        }
        this.mapOverUsers = this.mapOverUsers.bind(this)
        this.showModal = this.showModal.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)

    }

    notify = () => toast.success("Marked as complete!");

    componentDidMount() {
        axios.get("/api/repairs/get")
            .then(response => {

                response.data.sort((a, b) => {
                    var nameA = a.repairsid, nameB = b.repairsid;
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ repairs: response.data })
            })

        axios.get("/api/repairs/getcomplete")
            .then(response => {
                this.setState({ completeRepairs: response.data })
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

    updateOrder(id, index) {
        console.log(id)
        axios.put(`/api/repairs/updateorder/${id}`)
            .then(response => console.log(response))
        console.log(this.state.repairs[index])
        this.state.repairs[index].orderstatus = !this.state.repairs[index].orderstatus;
        this.setState({ repairs: this.state.repairs })

    }

    updateInvoice(id, index) {
        console.log(id)
        axios.put(`/api/repairs/updateinvoice/${id}`)
            .then(response => console.log(response))

        this.state.repairs[index].invoicestatus = !this.state.repairs[index].invoicestatus;
        this.setState({ repairs: this.state.repairs })
    }

    completeRepair(id, index) {
        axios.put(`/api/repairs/completerepair/${id}`)
            .then(response => console.log(response))
        this.state.repairs.splice(index, 1)
        this.setState({ repairs: this.state.repairs })
        this.notify();
    }

    toggleSwitch() {
        this.setState({
            hideComplete: !this.state.hideComplete
        })
        console.log(this.state.hideComplete)
    }

    render() {
        return (
            <div className="outermostDiv">
                <div className="fixedHeader">
                    <div className="repairsSideBySide">
                        <h1 className="repairsWord">REPAIRS</h1>
                        <div className="repairsShowCompleteTitle">
                            <span className="repairsShowComplete">SHOW COMPLETE</span>
                            <Toggle
                                defaultChecked={this.state.hideComplete}
                                onChange={this.toggleSwitch} />
                        </div>
                    </div>
                    <div className="repairsHeader">
                        <span className="headerTitleRepairs">DATE</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">TIME</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">STATUS</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairsM">CONTACT</span>
                        <div className="repairsDividerM"></div>

                        <span className="headerTitleRepairsM">ADDRESS</span>
                        <div className="repairsDividerM"></div>

                        <span className="headerTitleRepairs">PHONE</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairsM">PRINTER</span>
                        <div className="repairsDividerM"></div>

                        <span className="headerTitleRepairs">TECH</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">SYMPTOMS</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">ORDERED</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">INVOICED</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairs">NOTES</span>
                        <div className="repairsDivider"></div>

                        <span className="headerTitleRepairsM">COMPLETE</span>

                    </div>
                </div>
                {this.state.repairs.length === 0 ? <Spinner name='double-bounce' /> : this.state.hideComplete ?
                
                this.state.completeRepairs.map((repairs, index) => {
                    let d = repairs.date.substring(0, repairs.date.indexOf('T'))
                    

                    return (
                        <div className="repairContainer" key={repairs.repairsid}>
                            <span className="detailsRepairs">{d}</span>
                            <span className="detailsRepairs">{repairs.time}</span>
                            <span className="detailsRepairs">{repairs.status}</span>
                            <span className="detailsRepairsM">{repairs.contactname}</span>
                            <span className="detailsRepairsM">{repairs.streetaddress}</span>
                            <span className="detailsRepairs">{repairs.phone}</span>
                            <span className="detailsRepairsM">{repairs.printer}</span>
                            <span className="detailsRepairs">{repairs.tech}</span>
                            <span className="detailsRepairs">{repairs.symptoms}</span>
                            <span className="detailsRepairs">{repairs.orderstatus === false ? <button onClick={() => this.updateOrder(repairs.repairsid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                <button onClick={() => this.updateOrder(repairs.repairsid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                            <span className="detailsRepairs">{repairs.invoicestatus === false ? <button onClick={() => this.updateInvoice(repairs.repairsid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                <button onClick={() => this.updateInvoice(repairs.repairsid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                            <span className="detailsRepairs">{repairs.notes}</span>
                            <span className="detailsRepairsM"><button className="completed" onClick={() => this.completeRepair(repairs.repairsid, index)}>&#10003;</button></span>


                        </div>
                    )
                })
                :
                this.state.repairs.map((repairs, index) => {
                    let d = repairs.date.substring(0, repairs.date.indexOf('T'))
                    
                    return (
                        <div className="repairContainer" key={repairs.repairsid}>
                            <span className="detailsRepairs">{d}</span>
                            <span className="detailsRepairs">{repairs.time}</span>
                            <span className="detailsRepairs">{repairs.status}</span>
                            <span className="detailsRepairsM">{repairs.contactname}</span>
                            <span className="detailsRepairsM">{repairs.streetaddress}</span>
                            <span className="detailsRepairs">{repairs.phone}</span>
                            <span className="detailsRepairsM">{repairs.printer}</span>
                            <span className="detailsRepairs">{repairs.tech}</span>
                            <span className="detailsRepairs">{repairs.symptoms}</span>
                            <span className="detailsRepairs">{repairs.orderstatus === false ? <button onClick={() => this.updateOrder(repairs.repairsid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                <button onClick={() => this.updateOrder(repairs.repairsid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                            <span className="detailsRepairs">{repairs.invoicestatus === false ? <button onClick={() => this.updateInvoice(repairs.repairsid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                <button onClick={() => this.updateInvoice(repairs.repairsid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                            <span className="detailsRepairs">{repairs.notes}</span>
                            <span className="detailsRepairsM"><button className="complete" onClick={() => this.completeRepair(repairs.repairsid, index)}>&#10003;</button></span>


                        </div>
                    )
                })
                
            }
                <button className="addDeliveryButton" onClick={this.showModal} onClose={this.showModal}>
                    <div className="vert"></div>
                    <div className="horiz"></div>
                </button>

                <RepairModal show={this.state.hideModal} onClose={this.showModal} />
                <ToastContainer
                    position="top-right"
                    type="default"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </div>

        )
    }
}