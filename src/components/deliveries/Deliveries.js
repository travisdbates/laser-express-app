/* eslint-disable*/

import "./Deliveries.css"
import RepairModal from "../repairModal/RepairModal"
import React, { Component } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "../../../node_modules/react-toastify/dist/ReactToastify.css"
import Toggle from 'react-toggle'
import "./react-toggle.css"
import NavBar from "../navbar/NavBar"
import CountUp from "react-countup"
import ApprovalModal from "../approvalmodal/ApprovalModal"

var Spinner = require('react-spinkit');




export default class Deliveries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideModal: false,
            hideApproval: false,
            hideComplete: false,

            deliveries: [],
            deliveriesToOrders: [],
            completeDeliveries: [],
            deliveriesReset: [],
            deliveriesForApprovalCount: 0,

            updateState: 0,
            delivTech: true,

        }
        this.showModal = this.showModal.bind(this)
        this.showModalApprove = this.showModalApprove.bind(this)
        
        this.updateOrder = this.updateOrder.bind(this)
        this.completeDelivery = this.completeDelivery.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.sendToOrder = this.sendToOrder.bind(this)
        this.deleteDelivery = this.deleteDelivery.bind(this)
        this.sortDeliveryName = this.sortDeliveryName.bind(this)
        this.sortDeliveryTech = this.sortDeliveryTech.bind(this)

    }

    notify = () => toast.success("Marked as complete!");
    notifyOrder = () => toast.success("Sent to Order Log!");
    deleted = () => toast.warning("Deleted!")


    componentDidMount() {

        axios.get("/api/deliveries/getcomplete")
            .then(response => {
                this.setState({
                    completeDeliveries: response.data
                })
            })


        axios.get("/api/deliveries/getall")
            .then(response => {
                response.data.sort((a, b) => {
                    var nameA = a.deliveriesid, nameB = b.deliveriesid;
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
                console.log(response.data)
                this.setState({ deliveries: response.data })
                this.setState({ deliveriesReset: response.data })
            })

            axios.get("/api/deliveriesapprove/count")
            .then(response => {
                console.log(response.data)
                this.setState({deliveriesForApprovalCount: response.data[0].count})
            })
            console.log(this.state.deliveriesForApprovalCount)

    }

    showModal() {
        this.setState({ hideModal: !this.state.hideModal })
    }

    showModalApprove() {
        this.setState({ hideApproval: !this.state.hideApproval })
        console.log(this.state.hideApproval)
    }

    updateOrder(id, index) {
        axios.put(`/api/deliveries/updateorder/${id}`)
        this.state.deliveries[index].orderstatus = !this.state.deliveries[index].orderstatus;
        this.setState({ deliveries: this.state.deliveries })

    }

    updateInvoice(id, index) {

        axios.put(`/api/deliveries/updateinvoice/${id}`)


        this.state.deliveries[index].invoicestatus = !this.state.deliveries[index].invoicestatus;
        this.setState({ deliveries: this.state.deliveries })
    }

    completeDelivery(id, index) {
        axios.put(`/api/deliveries/completedelivery/${id}`)

        this.state.deliveries.splice(index, 1)
        this.setState({ deliveries: this.state.deliveries })
        this.notify();
    }

    toggleSwitch() {
        this.setState({
            hideComplete: !this.state.hideComplete
        })
    }

    orderFormat(id, q, c) {
        var arr = [];
        for (var i = 0; i < q.length; i++) {
            arr.push(q[i] + " - " + c[i])
        }
        return arr;

    }

    sendToOrder(index, indexOrder, order, delivCart, delivQuant) {


        var order = {
            date: this.state.deliveries[index].date,
            time: this.state.deliveries[index].time,
            quantity: delivQuant[indexOrder],
            item: delivCart[indexOrder],
            customer: this.state.deliveries[index].contactname
        }

        axios.post('/api/orders/insert', order)
            .then((response) => {
            })

        this.notifyOrder();
    }

    deleteDelivery(id, index) {
        const result = window.confirm("Are you sure? This action cannot be undone.")
        if (!result) return;
        axios.put(`/api/deliveries/deletedelivery/${id}`)

        this.state.completeDeliveries.splice(index, 1)
        this.setState({ completeDeliveries: this.state.completeDeliveries })
        this.deleted();
    }

    sortDeliveryName() {
        let tempArr = this.state.deliveries;
        tempArr.sort((a, b) => {
            var xa = a.contactname.toLowerCase(), xb = b.contactname.toLowerCase();
            if (xa < xb) {
                return -1;
            }
            if (xa > xb) {
                return 1;
            }
            return 0;
        })
        this.setState({ deliveries: tempArr })

    }

    sortDeliveryTech() {
        if (this.state.delivTech) {
            console.log("Tech Sort Active")
            let tempArr = this.state.deliveries;
            tempArr.sort((a, b) => {
                var xa = a.tech.toLowerCase(), xb = b.tech.toLowerCase();
                if (xa < xb) {
                    return -1;
                }
                if (xa > xb) {
                    return 1;
                }
                return 0;
            })
            this.setState({
                deliveries: tempArr,
                delivTech: !this.state.delivTech
            })
        }
        else {
            console.log("Tech Sort Inactive")
            console.log(this.state.deliveriesReset)
            var tempArr = this.state.deliveries;
            tempArr.sort((a, b) => {
                var nameA = a.deliveriesid, nameB = b.deliveriesid;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            this.setState({
                deliveries: tempArr,
                delivTech: !this.state.delivTech
            })

        }

    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className="outermostDiv">
                    <div className="fixedHeader">
                        <div className="sideBySide">
                            <h1 className="deliveriesWord">DELIVERIES</h1>{this.state.deliveriesForApprovalCount.length === 0 ? null : <div className="flexRow"><span className="forApproval">Deliveries for approval: </span><span onClick={this.showModalApprove} className="circleD"><CountUp duration={3} start={0} end={this.state.deliveriesForApprovalCount} /></span></div>}
                            <div className="showCompleteTitle">
                                <span className="showComplete">SHOW COMPLETE</span>
                                <Toggle
                                    defaultChecked={this.state.hideComplete}
                                    onChange={this.toggleSwitch} />
                            </div>
                        </div>
                        <div className="deliveriesHeader">
                            <span className="headerTitleDeliveries">DATE</span>
                            <div className="deliveriesDivider"></div>

                            <span className="headerTitleDeliveries">TIME</span>
                            <div className="deliveriesDivider"></div>
                            {/* <span className="headerTitleDeliveries">STATUS</span>
                        <div className="deliveriesDivider"></div> */}

                            <span className="headerTitleDeliveriesM" onClick={this.sortDeliveryName}>CONTACT</span>
                            

                            <div className="deliveriesDividerM"></div>

                            <span className="headerTitleDeliveriesM">ADDRESS</span>
                            <div className="deliveriesDividerM"></div>

                            <span className="headerTitleDeliveries">PHONE</span>
                            <div className="deliveriesDivider"></div>

                            <span className="headerTitleDeliveriesM">CARTRIDGE</span>
                            <div className="deliveriesDividerM"></div>

                            <span className="TechD" onClick={this.sortDeliveryTech}>TECH</span>
                            <div className="deliveriesDivider"></div>

                            <span className="headerTitleDeliveries">ORDERED</span>
                            <div className="deliveriesDivider"></div>

                            <span className="headerTitleDeliveries">INVOICED</span>
                            <div className="deliveriesDivider"></div>

                            <span className="headerTitleDeliveries">NOTES</span>
                            <div className="deliveriesDivider"></div>

                            {this.state.hideComplete ? <span className="headerTitleDeliveriesM">DELETE</span> : <span className="headerTitleDeliveriesM">COMPLETE</span>}

                        </div>
                    </div>
                    {this.state.deliveries.length === 0 ? <Spinner name='double-bounce' /> : this.state.hideComplete ?
                        this.state.completeDeliveries.map((deliveries, index) => {


                            return (
                                <div className="deliveryContainer" key={deliveries.deliveriesid}>
                                    <span className="detailsDeliveries">{deliveries.date}</span>
                                    <span className="detailsDeliveries">{deliveries.time}</span>
                                    {/* <span className="detailsDeliveries">{deliveries.status}</span> */}
                                    <span className="detailsDeliveriesM">{deliveries.contactname}</span>
                                    <span className="detailsDeliveriesM">{deliveries.streetaddress}</span>
                                    <span className="detailsDeliveries">{deliveries.phone}</span>
                                    <span className="detailsDeliveriesM">{deliveries.cartridge}</span>
                                    <span className="detailsDeliveries">{deliveries.tech}</span>
                                    <span className="detailsDeliveries">{deliveries.orderstatus === false ? <button onClick={() => this.updateOrder(deliveries.deliveriesid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                        <button onClick={() => this.updateOrder(deliveries.deliveriesid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                                    <span className="detailsDeliveries">{deliveries.invoicestatus === false ? <button onClick={() => this.updateInvoice(deliveries.deliveriesid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                        <button onClick={() => this.updateInvoice(deliveries.deliveriesid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                                    <span className="detailsDeliveries">{deliveries.notes}</span>
                                    <span className="detailsDeliveriesM"><button className="completed" onClick={() => this.deleteDelivery(deliveries.deliveriesid, index)}>&#x2715;</button></span>



                                </div>
                            )
                        })
                        :
                        this.state.deliveries.map((deliveries, index) => {

                            return (
                                <div className="deliveryContainer" key={deliveries.deliveriesid}>
                                    <span className="detailsDeliveries">{deliveries.date}</span>
                                    <span className="detailsDeliveries">{deliveries.time}</span>
                                    {/* <span className="detailsDeliveries">{deliveries.status}</span> */}
                                    <span className="detailsDeliveriesM">{deliveries.contactname}</span>
                                    <span className="detailsDeliveriesM">{deliveries.streetaddress}</span>
                                    <span className="detailsDeliveries">{deliveries.phone}</span>
                                    <span className="detailsDeliveriesM">{this.orderFormat(deliveries.deliveriesid, deliveries.quantity, deliveries.cartridge).map((order, indexOrder) => {
                                        return (
                                            <div>
                                                <span className="detailsDeliveriesO">{order}</span>
                                                <button className="sendToOrder" onClick={() => this.sendToOrder(index, indexOrder, order, deliveries.cartridge, deliveries.quantity)}>&rarr;</button>
                                            </div>)
                                    })}</span>
                                    <span className="detailsDeliveries">{deliveries.tech}</span>
                                    <span className="detailsDeliveries">{deliveries.orderstatus === false ? <button onClick={() => this.updateOrder(deliveries.deliveriesid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                        <button onClick={() => this.updateOrder(deliveries.deliveriesid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                                    <span className="detailsDeliveries">{deliveries.invoicestatus === false ? <button onClick={() => this.updateInvoice(deliveries.deliveriesid, index)} className="notOrdered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button> :
                                        <button onClick={() => this.updateInvoice(deliveries.deliveriesid, index)} className="Ordered"><div><span className="yes">YES</span><span className="slash">/</span><span className="no">NO</span></div></button>}</span>
                                    <span className="detailsDeliveries">{deliveries.notes}</span>
                                    <span className="detailsDeliveriesM"><button className="complete" onClick={() => this.completeDelivery(deliveries.deliveriesid, index)}>&#10003;</button></span>



                                </div>
                            )
                        })


                    }
                    <button className="addDeliveryButton" onClick={this.showModal} onClose={this.showModal}>
                        <div className="vert"></div>
                        <div className="horiz"></div>
                    </button>

                    <RepairModal show={this.state.hideModal} onClose={this.showModal} />
                    <ApprovalModal  show={this.state.hideApproval} onClose={this.showModalApprove} />
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
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </div>



        )
    }
}