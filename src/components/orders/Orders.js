import "./Orders.css"
import React, { Component } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "../../../node_modules/react-toastify/dist/ReactToastify.css"
import Toggle from 'react-toggle'
import "../deliveries/react-toggle.css"
import NavBar from "../navbar/NavBar"


var Spinner = require('react-spinkit');

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideModal: false,
            hideComplete: false,

            orders: [],
            ordersComplete: [],

            orderToEdit: null,
            cost: '',
            ordernumber: '',
            vendor: '',
            notes: '',

        }
        this.showModal = this.showModal.bind(this)
        this.completeOrder = this.completeOrder.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)


    }

    notify = () => toast.success("Marked as complete!");

    componentDidMount() {
        axios.get("/api/orders/getall")
            .then(response => {
                response.data.sort((a, b) => {
                    var nameA = a.ordersid, nameB = b.ordersid;
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ orders: response.data })
            })

        axios.get("/api/orders/getcomplete")
            .then(response => {
                console.log(response)
                response.data.sort((a, b) => {
                    var nameA = a.ordersid, nameB = b.ordersid;
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({ ordersComplete: response.data })
            })
    }

    showModal() {
        this.setState({ hideModal: !this.state.hideModal })
        console.log(this.state.hideModal)
    }

    completeOrder(id, index) {
        axios.put(`/api/orders/completeorder/${id}`)
            .then(response => console.log(response))
        this.state.orders.splice(index, 1)
        this.setState({ orders: this.state.orders })
        this.notify();
    }

    toggleSwitch() {
        this.setState({
            hideComplete: !this.state.hideComplete
        })
        console.log(this.state.hideComplete)
    }

    editOrder(id, index) {
        let orderToEdit = this.state.orders[index]
        console.log(orderToEdit.name)

        this.setState({ orderToEdit: orderToEdit })
        console.log(this.state.orders[index].cost)
        let type = typeof(this.state.orders[index].cost)
        console.log(type)
        let costForEdit = parseFloat(this.state.orders[index].cost.replace( /[^0-9]/, '' ), 10).toFixed(2)
        this.setState({cost: costForEdit})


    }

    handleChange(e, formField) {

        this.setState({
            [formField]: e
        })
        //console.log(this.state[formField])
        console.log(this.state)
    }

    updateOrder(index){
        let cost = parseFloat(this.state.cost).toFixed(2)
        let updatedOrderForState = {
            ordersid: this.state.orders[index].ordersid,
            date: this.state.orders[index].date,
            time: this.state.orders[index].time,
            quantity: this.state.quantity,
            item: this.state.orders.item,
            customer: this.state.orders[index].name,
            cost: cost,
            ordernumber: this.state.orders[index].ordernumber,
            vendor: this.state.vendor,
            notes: this.state.notes,
            customerid: this.state.orders[index].customerid,
        }
        let temp = this.state.orders;
        temp[index] = updatedOrderForState
        this.setState({orders: temp, orderToEdit: null})
        console.log(typeof(cost))
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="outermostDiv">
                    <div className="fixedHeader">
                        <div className="sideBySide">

                            <h1 className="ordersWord">ORDERS</h1>
                            <div className="showCompleteTitle">
                                <span className="showComplete">SHOW COMPLETE</span>

                                <Toggle
                                    defaultChecked={this.state.hideComplete}
                                    onChange={this.toggleSwitch} />
                            </div>
                        </div>
                        <div className="ordersHeader">
                            <span className="headerTitleOrders">DATE</span>
                            <div className="ordersDivider"></div>

                            <span className="headerTitleOrders">TIME</span>
                            <div className="ordersDivider"></div>
                            <span className="headerTitleOrdersM">QUANTITY</span>
                            <div className="ordersDividerM"></div>

                            <span className="headerTitleOrdersM">ITEM</span>
                            <div className="ordersDividerM"></div>

                            <span className="headerTitleOrdersM">CUSTOMER</span>
                            <div className="ordersDividerM"></div>

                            <span className="headerTitleOrders">COST PER</span>
                            <div className="ordersDivider"></div>

                            <span className="headerTitleOrders">ORDER NUMBER</span>
                            <div className="ordersDivider"></div>

                            <span className="headerTitleOrders">VENDOR</span>
                            <div className="ordersDivider"></div>

                            <span className="headerTitleOrders">TOTAL COST</span>
                            <div className="ordersDivider"></div>

                            <span className="headerTitleOrders">NOTES</span>
                            <div className="ordersDivider"></div>

                            <span className="headerTitleOrdersM">COMPLETE</span>

                        </div>
                    </div>
                    {this.state.orders.length === 0 ? <div className="centerCenter"><span className="forApproval">No orders here...</span><Spinner name='pacman' color="#eded4d" fadeIn="quarter" /></div> : this.state.hideComplete ?

                        this.state.ordersComplete.map((order, index) => {

                            //Extends the NumberFormat for use below in order to properly display the total amounts after converting the MONEY type from
                            //the database.
                            var formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                                // the default value for minimumFractionDigits depends on the currency
                                // and is usually already 2
                            });

                            let costOfProduct = parseFloat(order.cost.replace('$', ''))
                            return (

                                <div className="ordersContainer" key={index}>
                                    <span className="detailsOrders">{order.date}</span>
                                    <span className="detailsOrders">{order.time}</span>
                                    <span className="detailsOrdersM">{order.quantity}</span>
                                    <span className="detailsOrdersM">{order.item}</span>
                                    <span className="detailsOrdersM">{order.name}</span>
                                    <span className="detailsOrders">{order.cost}</span>
                                    <span className="detailsOrders">{order.ordernumber}</span>
                                    <span className="detailsOrders">{order.vendor}</span>
                                    <span className="detailsOrders">{formatter.format(order.quantity * costOfProduct)}</span>
                                    <span className="detailsOrders">{order.notes}</span>
                                    <span className="detailsOrdersM"><button className="completedOrdercomplete" onClick={() => this.completeOrder(order.ordersid, index)}>&#10003;</button></span>


                                </div>
                            )
                        })






                        : this.state.orders.map((order, index) => {

                            //Extends the NumberFormat for use below in order to properly display the total amounts after converting the MONEY type from
                            //the database.
                            var formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                                // the default value for minimumFractionDigits depends on the currency
                                // and is usually already 2
                            });

                            let costOfProduct = parseFloat(order.cost.replace('$', ''))
                            return (
                                <div>
                                    {this.state.orderToEdit ?
                                        this.state.orderToEdit.ordersid === order.ordersid ?
                                        <div className="ordersContainer" key={index}>
                                        <span className="detailsOrders">{order.date}</span>
                                        <span className="detailsOrders">{order.time}</span>
                                        <span className="detailsOrdersM">{order.quantity}</span>
                                        <span className="detailsOrdersM">{order.item}</span>
                                        <span className="detailsOrdersM">{order.name}</span>
                                        <input className="detailsOrders" type="number" min="0.01" step="0.01" max="2500" value={this.state.cost} onChange={(e) => this.handleChange(e.target.value, 'cost')}></input>
                                        <input className="detailsOrders" value={order.ordernumber} onChange={(e) => this.handleChange(e.target.value, 'ordernumber')}></input>
                                        <input className="detailsOrders" value={order.vendor} onChange={(e) => this.handleChange(e.target.value, 'vendor')}></input>
                                        <span className="detailsOrders">{formatter.format(order.quantity * this.state.cost)}</span>
                                        <input className="detailsOrders" value={order.notes} onChange={(e) => this.handleChange(e.target.value, 'notes')}></input>
                                        <span className="detailsOrdersM"><button className="completedOrder" onClick={() => this.updateOrder(index)}>&#10003;</button><button onClick={() => this.setState({ orderToEdit: null })} className="cancel">&#x2715;</button></span>

                                    </div>

                                            :
                                            <div className="ordersContainer" key={index}>
                                                <span className="detailsOrders">{order.date}</span>
                                                <span className="detailsOrders">{order.time}</span>
                                                <span className="detailsOrdersM">{order.quantity}</span>
                                                <span className="detailsOrdersM">{order.item}</span>
                                                <span className="detailsOrdersM">{order.name}</span>
                                                <span className="detailsOrders">{order.cost}</span>
                                                <span className="detailsOrders">{order.ordernumber}</span>
                                                <span className="detailsOrders">{order.vendor}</span>
                                                <span className="detailsOrders">{formatter.format(order.quantity * costOfProduct)}</span>
                                                <span className="detailsOrders">{order.notes}</span>
                                                <span className="detailsOrdersM"><button className="completedOrder" onClick={() => this.completeOrder(order.ordersid, index)}>&#10003;</button><button onClick={() => this.editOrder(order.orderid, index)} className="complete">&#x270E;</button></span>

                                            </div>
                                        :
                                        <div className="ordersContainer" key={index}>
                                            <span className="detailsOrders">{order.date}</span>
                                            <span className="detailsOrders">{order.time}</span>
                                            <span className="detailsOrdersM">{order.quantity}</span>
                                            <span className="detailsOrdersM">{order.item}</span>
                                            <span className="detailsOrdersM">{order.name}</span>
                                            <span className="detailsOrders">{order.cost}</span>
                                            <span className="detailsOrders">{order.ordernumber}</span>
                                            <span className="detailsOrders">{order.vendor}</span>
                                            <span className="detailsOrders">{formatter.format(order.quantity * costOfProduct)}</span>
                                            <span className="detailsOrders">{order.notes}</span>
                                            <span className="detailsOrdersM"><button className="completedOrder" onClick={() => this.completeOrder(order.ordersid, index)}>&#10003;</button><button onClick={() => this.editOrder(order.orderid, index)} className="complete">&#x270E;</button></span>

                                        </div>
                                    }
                                </div>
                            )
                        })}
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
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>

        )
    }
}