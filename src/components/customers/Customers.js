import "./Customers.css"
import CustomerModal from "../customerModal/CustomerModal"
import NavBar from "../navbar/NavBar"

import React, { Component } from "react"
import axios from "axios"

var Spinner = require('react-spinkit');




export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customersaZ: [],
            customerszA: [],
            hideModal: false,
            alpha: false
        }
        this.mapOverUsers = this.mapOverUsers.bind(this)
        this.showModal = this.showModal.bind(this)
        this.alphabetize = this.alphabetize.bind(this)
    }
    componentDidMount() {

        axios.get("/api/customers/get")
            .then(response => {
                //console.log(response.data)
                var aZ = response.data.sort((a, b) => {
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                })
                var zA = aZ.slice();
                var zA = zA.reverse();
                console.log(aZ)
                console.log(zA)
                this.setState({
                    customersaZ: aZ,
                    customerszA: zA
                })
            })
    }

    mapOverUsers() {
        this.state.customers.map((customer, index) => {
            return (
                <h2>{customer.name}</h2>
            )

        })
    }

    showModal() {
        this.setState({ hideModal: !this.state.hideModal })
        console.log(this.state.hideModal)
    }

    alphabetize() {
        console.log(this.state.alpha)
        console.log(this.state.customersaZ)
        console.log(this.state.customerszA)
        this.setState({ alpha: !this.state.alpha })
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="outermostDiv">
                    <div className="fixedHeader">
                        <div className="customerToggle">
                            <h1 className="customersWord">CUSTOMERS</h1>

                        </div>
                        <div className="customerHeader">
                            <span className="headerTitleCustomers" onClick={this.alphabetize}>NAME</span>
                            <div className="customersDivider"></div>

                            <span className="headerTitleCustomers">PHONE</span>
                            <div className="customersDivider"></div>

                            <span className="headerTitleCustomers">STREET ADDRESS</span>
                            <div className="customersDivider"></div>

                            <span className="headerTitleCustomers">CITY</span>
                            <div className="customersDivider"></div>

                            <span className="headerTitleCustomers">STATE</span>

                        </div>
                    </div>
                    {this.state.customersaZ.length === 0 ? <Spinner name='double-bounce' /> : this.state.alpha ?
                        this.state.customersaZ.map((customer, index) => {
                            return (
                                <div className="customerContainerC" key={customer.customerid}>
                                    <span className="details">{customer.name}</span>
                                    <span className="details">{customer.phone}</span>
                                    <span className="details">{customer.streetaddress}</span>
                                    <span className="details">{customer.city}</span>
                                    <span className="details">{customer.state}</span>


                                </div>
                            )
                        })
                        :
                        this.state.customerszA.map((customer, index) => {
                            return (
                                <div className="customerContainerC" key={customer.customerid}>
                                    <span className="details">{customer.name}</span>
                                    <span className="details">{customer.phone}</span>
                                    <span className="details">{customer.streetaddress}</span>
                                    <span className="details">{customer.city}</span>
                                    <span className="details">{customer.state}</span>


                                </div>
                            )
                        })

                    }
                    <button className="addCustomer" onClick={this.showModal} onClose={this.showModal}>
                        <div className="vert"></div>
                        <div className="horiz"></div>
                    </button>

                    <CustomerModal show={this.state.hideModal} onClose={this.showModal} />
                </div>
            </div>

        )
    }
}