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
            rdSetting: null,

            contactName: "",
            printer: "",
            printerID: "",
            symptoms: "",

            tech: "",
            notes: "",
            location: "",

            cartridge: "",
            quantity: "",

        }
        this.logChange = this.logChange.bind(this)
        this.setDelivery = this.setDelivery.bind(this)
        this.setRepair = this.setRepair.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitRepair = this.submitRepair.bind(this)
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
    
    submitRepair(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        }
        if(mm<10) {
            mm = '0'+mm
        }
        today = mm + '/' + dd + '/' + yyyy;

        var time = new Date().toLocaleTimeString();

        var repair = {
            customerId: this.state.currentCustomer[0].customerid,
            date: today,
            time: time,
            status: "In Process",
            contactName: this.state.contactName,
            streetAddress: this.state.currentCustomer[0].streetaddress,
            city: this.state.currentCustomer[0].city,
            state: this.state.currentCustomer[0].state,
            phone: this.state.currentCustomer[0].phone,
            printer: this.state.printer,
            tech: this.state.tech,
            symptoms: this.state.symptoms,
            orderStatus: "No",
            invoiceStatus: "No",
            notes: this.state.notes

        }
        axios.post('/api/repairs/insert', repair)
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
                                <input className="inputBox Name" value={this.state.currentCustomer.length === 0 ? '' : this.state.currentCustomer[0].name}></input>
                            </div>
                            <div className="aboveBelow">
                                <span className="inputNames Phone">Phone:  </span>
                                <input className="inputBox Phone" value={this.state.currentCustomer.length === 0 ? '' : this.state.currentCustomer[0].phone}></input>
                            </div>
                            <div className="aboveBelow">

                                <span className="inputNames ID">ID: </span>
                                <input className="inputBox ID" value={this.state.currentCustomer.length === 0 ? '' : this.state.currentCustomer[0].customerid}></input>
                            </div>
                        </div>
                        <div className="rowTwo">

                            <div className="aboveBelow">
                                <span className="inputNames Address">Address:  </span>
                                <input className="inputBox Address" value={this.state.currentCustomer.length === 0 ? '' : this.state.currentCustomer[0].streetaddress}></input>
                            </div>
                            <div className="aboveBelow">
                                <span className="inputNames City">City:  </span>
                                <input className="inputBox City" value={this.state.currentCustomer.length === 0 ? '' : this.state.currentCustomer[0].city}></input>
                            </div>
                            <div className="aboveBelow">
                                <span className="inputNames State">State:  </span>
                                <input className="inputBox State" value={this.state.currentCustomer.length === 0 ? '' : this.state.currentCustomer[0].state}></input>
                            </div>
                        </div>

                    </div>
                    <div className="buttons">
                        <button className="repairButton" onClick={this.setRepair}>Repair</button>
                        <button className="deliveryButton" onClick={this.setDelivery}>Delivery</button>

                    </div>
                    {this.state.rdSetting === null ? null : this.state.rdSetting === "d" ?
                        <div>
                            <div className="rowOne">
                                <div className="aboveBelow">
                                    <span className="inputNames ContactName" >Contact Name:  </span>
                                    <input className="inputBox Name" onChange={(e) => { this.handleChange(e.target.value, "contactName") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Phone">Cartridge:  </span>
                                    <input className="inputBox Phone" onChange={(e) => { this.handleChange(e.target.value, "cartridge") }}></input>
                                </div>
                                <div className="aboveBelow">

                                    <span className="inputNames Qty">Quantity: </span>
                                    <input className="inputBox Qty" onChange={(e) => { this.handleChange(e.target.value, "quantity") }}></input>
                                </div>

                            </div>
                            <div className="rowTwo">

                                <div className="aboveBelow">
                                    <span className="inputNames Loc">Location:  </span>
                                    <input className="inputBox Loc" onChange={(e) => { this.handleChange(e.target.value, "location") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Tech">Tech:  </span>
                                    <input className="inputBox Tech" onChange={(e) => { this.handleChange(e.target.value, "tech") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Notes">Notes:  </span>
                                    <input className="inputBox Notes" onChange={(e) => { this.handleChange(e.target.value, "notes") }}></input>
                                </div>

                            </div>
                            <button>Submit</button>

                        </div>

                        :

                        <div>
                            <div className="rowOne">
                                <div className="aboveBelow">
                                    <span className="inputNames ContactNameRep">Contact Name:  </span>
                                    <input className="inputBox ContactNameRep" onChange={(e) => { this.handleChange(e.target.value, "contactName") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Printer">Printer:  </span>
                                    <input className="inputBox Printer" onChange={(e) => { this.handleChange(e.target.value, "printer") }}></input>
                                </div>
                                <div className="aboveBelow">

                                    <span className="inputNames IDNum">ID#: </span>
                                    <input className="inputBox IDNum" onChange={(e) => { this.handleChange(e.target.value, "printerID") }}></input>
                                </div>

                            </div>
                            <div className="rowTwo">

                                <div className="aboveBelow">
                                    <span className="inputNames Loc">Symptoms:  </span>
                                    <input className="inputBox Loc" onChange={(e) => { this.handleChange(e.target.value, "location") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Tech">Tech:  </span>
                                    <input className="inputBox Tech" onChange={(e) => { this.handleChange(e.target.value, "tech") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Notes">Notes:  </span>
                                    <input className="inputBox Notes" onChange={(e) => { this.handleChange(e.target.value, "notes") }}></input>
                                </div>
                            </div>
                            <button  onClick={this.submitRepair}>Submit</button>

                        </div>}
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