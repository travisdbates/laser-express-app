import React, { Component } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import axios from "axios"

import '../../../node_modules/react-select/dist/react-select.css'

import "./RepairModal.css"

class RepairModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            value: '',
            currentCustomer: [],
        }
        this.logChange = this.logChange.bind(this)
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
                    <div className="topContent">
                        <Select
                            className="Select-input"
                            name="form-field-one"
                            placeholder="Existing company select"
                            value={this.state.value}
                            options={this.state.customers}
                            onChange={this.logChange} />
                    </div>
                    <div className="customerInfo">
                        <div className="rowOne">
                            <div className="aboveBelow">
                                <span className="inputNames Name">Name:  </span>
                                <input className="inputBox Name" value={this.state.currentCustomer.length === 0 ? 'none' : this.state.currentCustomer[0].name}></input>
                            </div>
                            <div className="aboveBelow">
                                <span className="inputNames Phone">Phone:  </span>
                                <input className="inputBox Phone" value={this.state.currentCustomer.length === 0 ? 'none' : this.state.currentCustomer[0].phone}></input>
                            </div>
                            <div className="aboveBelow">

                                <span className="inputNames ID">ID: </span>
                                <input className="inputBox ID" value={this.state.currentCustomer.length === 0 ? 'none' : this.state.currentCustomer[0].customerid}></input>
                            </div>
                        </div>
                        <div className="rowTwo">

                        <div className="aboveBelow">
                            <span className="inputNames Address">Address:  </span>
                            <input className="inputBox Address" value={this.state.currentCustomer.length === 0 ? 'none' : this.state.currentCustomer[0].streetaddress}></input>
                        </div>
                        <div className="aboveBelow">
                            <span className="inputNames City">City:  </span>
                            <input className="inputBox City" value={this.state.currentCustomer.length === 0 ? 'none' : this.state.currentCustomer[0].city}></input>
                        </div>
                        <div className="aboveBelow">
                            <span className="inputNames State">State:  </span>
                            <input className="inputBox State" value={this.state.currentCustomer.length === 0 ? 'none' : this.state.currentCustomer[0].state}></input>
                        </div>
                        </div>
                        
                    </div>
                    <div>
                        <button>Repair</button>
                        <button>Delivery</button>

                    </div>

                </div>
            </div>

        )
    }
}

RepairModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default RepairModal