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

    notifyD = () => toast.success("Submitted to Delivery Log!");


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

    submitDelivery(index, timeD) {
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
        axios.put(`/api/deliveriesapproval/update/${timeD}`)
        this.state.deliveriesForApproval.splice(index, 1)
        this.setState({ deliveriesForApproval: this.state.deliveriesForApproval })
        this.notifyD();
    }

    deleteDelivery(index, time) {
        this.state.deliveriesForApproval.splice(index, 1)
        this.setState({ deliveriesForApproval: this.state.deliveriesForApproval })
        console.log(time)
        axios.put(`/api/deliveriesapproval/update/${time}`)
            .then(response => {
                console.log(response)
            })
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
                        <button className="closeButton" onClick={() => window.location.reload(true)}>&#10006;</button>
                    </div>
                    <div className="centerContainer">
                        <div className="containerForAdds">
                            {this.state.deliveriesForApproval.map((delivery, index) => {

                                return (
                                    <div className="containerForA">
                                        <span>Name: {delivery.contactname}</span>
                                        <span >Order: {this.orderFormat(delivery.quantity, delivery.cartridge).map((order, indexOrder) => {
                                            return (

                                                <span >{order}</span>
                                            )

                                        })}</span>
                                        <div className="rowFlexAM">
                                            <button className="yes" onClick={() => this.submitDelivery(index, delivery.time)}>&#10003;</button>
                                            <button className="no" onClick={() => this.deleteDelivery(index, delivery.time)}>&#x2715;</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
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

