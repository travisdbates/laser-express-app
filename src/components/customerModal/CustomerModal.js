import React, { Component } from "react"
import PropTypes from "prop-types"

import axios from "axios"

import '../../../node_modules/react-select/dist/react-select.css'

import "./CustomerModal.css"

class CustomerModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            streetAdress: '',
            city: '',
            state: ''

        }
        this.logChange = this.logChange.bind(this)
        this.setDelivery = this.setDelivery.bind(this)
        this.setRepair = this.setRepair.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitCustomer = this.submitCustomer.bind(this)
    }
    componentDidMount() {
        axios.get('/api/customers/getselect')
            .then(response => {
                console.log(response.data)
                this.setState({ customers: response.data })
            })
    }

    logChange(val) {
        console.log("selected: " + JSON.stringify(val))
        this.setState({ value: val })
        if (val !== null) {
            axios.get(`/api/customers/getone/${val.value}`)
                .then(response => {
                    this.setState({ currentCustomer: response.data })
                    console.log(response.data)
                })
        }
        else this.setState({ currentCustomer: [] })
    }


    setDelivery() {
        this.setState({ rdSetting: "d" })
    }

    setRepair() {
        this.setState({ rdSetting: "r" })
    }

    handleChange(e, formField) {

        this.setState({
            [formField]: e
        })
        console.log(this.state[formField])
    }

    submitCustomer(){
        var data = {
            name: this.state.name,
            phone: this.state.phone,
            streetaddress: this.state.streetAdress,
            city: this.state.city,
            state: this.state.state,
        }
        axios.post('/api/customers/insert', data)
        .then(response => {
            console.log(response.data)
        })
    }


    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="screendarken">
                {this.props.children}
                <div className="modal-window">
                    <div className="rightAlign">
                        <button className="close-button" onClick={this.props.onClose}>&#10006;</button>
                    </div>

                    <div className="customerInfo">
                        <div>
                            <div className="rowOne">
                                <div className="aboveBelow">
                                    <span className="inputNames Name">Name:  </span>
                                    <input className="inputBox Name" onChange={(e) => { this.handleChange(e.target.value, "name") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Phone">Phone:  </span>
                                    <input className="inputBox Phone" onChange={(e) => { this.handleChange(e.target.value, "phone") }}></input>
                                </div>


                            </div>
                            <div className="rowTwo">

                                <div className="aboveBelow">
                                    <span className="inputNames street">Street Address:  </span>
                                    <input className="inputBox street" onChange={(e) => { this.handleChange(e.target.value, "streetAddress") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames city">City:  </span>
                                    <input className="inputBox city" onChange={(e) => { this.handleChange(e.target.value, "city") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames state">State:  </span>
                                    <input className="inputBox state" onChange={(e) => { this.handleChange(e.target.value, "state") }}></input>
                                </div>
                            </div>
                            <button onClick={this.submitCustomer}>Submit</button>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

CustomerModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default CustomerModal