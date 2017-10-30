/* eslint-disable */
import React, { Component } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
import "../../../node_modules/react-toastify/dist/ReactToastify.min.css"


//import './Select.css'

import "./ApprovalModal.css"

class ApprovalModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deliveriesForApproval: [],
            currentCustomer: [],


        }
        this.orderFormat = this.orderFormat.bind(this)
    }

    notify = () => toast.success("Submitted to Delivery Log!");


    componentDidMount() {
        axios.get("/api/deliveriesapprove/get")
            .then(response => {
                console.log(response.data)
                this.setState({ deliveriesForApproval: response.data })
            })

    }

    orderFormat(q, c) {
        var arr = [];
        for (var i = 0; i < q.length; i++) {
            arr.push(q[i] + " - " + c[i])
        }
        return arr;

    }

    submitDelivery(index) {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        date = mm + '/' + dd + '/' + yyyy;

        var time = new Date().toLocaleTimeString();


        var delivery = this.state.deliveriesForApproval[index]



        console.log(delivery)
        axios.post('/api/deliveries/insert', delivery)
            .then(response => {
                console.log(response)
            })
        this.notify;
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="screendarken">
                {this.props.children}
                <div className="modalWindowA">
                    <div className="topContentRM">
                        <button className="closeButton" onClick={this.props.onClose}>&#10006;</button>
                    </div>
                    {this.state.deliveriesForApproval.map((delivery, index) => {
                        
                        return (
                            <div className="containerForA">
                                <span>{delivery.contactname}</span>
                                <span >{this.orderFormat(delivery.quantity, delivery.cartridge).map((order, indexOrder) => {
                                    return (
                                        <div>
                                            <span >{order}</span>
                                        </div>)

                                })}</span>
                                <button onClick={() => this.submitDelivery(index)}></button>


                            </div>
                        )
                    })}

                </div>
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

ApprovalModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default ApprovalModal

