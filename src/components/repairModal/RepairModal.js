/* eslint-disable */
import React, { Component } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
import "../../../node_modules/react-toastify/dist/ReactToastify.min.css"


//import './Select.css'

import "./RepairModal.css"

class RepairModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            value: '',
            currentCustomer: [],
            rdSetting: null,
            customerAdded: false,

            contactName: "",
            printer: "",
            printerID: "",
            symptoms: "",

            tech: "BB",
            notes: "",
            location: "",

            cartridge: "",
            quantity: "",

            city: "",
            name: "",
            phone: "",
            state: "",
            streetaddress: "",
            customerID: "",


            cartridgeForOrder: [{ name: '', quant: '' }],



        }
        this.logChange = this.logChange.bind(this)
        this.setDelivery = this.setDelivery.bind(this)
        this.setRepair = this.setRepair.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitRepair = this.submitRepair.bind(this)
        this.submitDelivery = this.submitDelivery.bind(this)
        this.addCartridge = this.addCartridge.bind(this)
        this.removeCartridge = this.removeCartridge.bind(this)
        this.addToArrayName = this.addToArrayName.bind(this)
        this.addToArrayQuant = this.addToArrayQuant.bind(this)
        this.submitCustomer = this.submitCustomer.bind(this)
    }

    notify = () => toast.success("Added Customer!");


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
        // console.log(this.state[formField])
        // console.log(this.state)
    }

    submitRepair() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        console.log(today)
        var time = new Date().toLocaleTimeString();

        var repair = this.state.currentCustomer.length !== 0 ? {
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
            orderStatus: false,
            invoiceStatus: false,
            notes: this.state.notes

        }
            :
            {
                customerId: this.state.customerID,
                date: today,
                time: time,
                status: "In Process",
                contactName: this.state.contactName,
                streetAddress: this.state.streetaddress,
                city: this.state.city,
                state: this.state.state,
                phone: this.state.phone,
                printer: this.state.printer,
                tech: this.state.tech,
                symptoms: this.state.symptoms,
                orderStatus: false,
                invoiceStatus: false,
                notes: this.state.notes
            }

        axios.post('/api/repairs/insert', repair)
            .then(response => {
                console.log(response)
            })
        this.props.onClose;
        window.location.replace('http://localhost:3000/#/repairs')

    }

    submitDelivery() {
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

        /*Somehow the name/quant got switched when being sent to state... Not sure how, but 
        *for now this works and send the correct info to the correct places*/

        var names = []
        var quantitiesMap = this.state.cartridgeForOrder.map((cartridge) => {
            console.log(cartridge.quant)
            names.push(cartridge.quant)
        })
        names.join()
        console.log(names)

        var quantities = []
        var namesMap = this.state.cartridgeForOrder.map((cartridge) => {
            console.log(cartridge.name)
            quantities.push(cartridge.name)
        })
        quantities.join()
        console.log(quantities)

        var delivery = this.state.currentCustomer.length !== 0 ? {
            customerId: this.state.currentCustomer[0].customerid,
            date: date,
            time: time,
            status: "In Process",
            contactName: this.state.contactName,
            streetAddress: this.state.currentCustomer[0].streetaddress,
            city: this.state.currentCustomer[0].city,
            state: this.state.currentCustomer[0].state,
            phone: this.state.currentCustomer[0].phone,
            cartridge: '{' + names + '}',
            tech: this.state.tech,
            orderStatus: false,
            invoiceStatus: false,
            notes: this.state.notes,
            quantity: '{' + quantities + '}',
        }
            :
            {
                customerId: this.state.customerID,
                date: date,
                time: time,
                status: "In Process",
                contactName: this.state.contactName,
                streetAddress: this.state.streetaddress,
                city: this.state.city,
                state: this.state.state,
                phone: this.state.phone,
                cartridge: '{' + names + '}',
                tech: this.state.tech,
                orderStatus: false,
                invoiceStatus: false,
                notes: this.state.notes,
                quantity: '{' + quantities + '}',
            }

        console.log(delivery)
        axios.post('/api/deliveries/insert', delivery)
            .then(response => {
                console.log(response)
            })
        axios.get('/api/customers/getselect')
            .then(response => {
                console.log(response.data)
                this.setState({ customers: response.data })
            })
        this.props.OnClose;
        window.location.replace('http://localhost:3000/#/deliveries')

    }

    addCartridge() {

        this.setState({ inputs: this.state.inputs.concat({ quant: '', name: '' }) });
        console.log(this.state.inputs)
    }

    removeCartridge() {
        var newInputs = this.state.inputs
        newInputs.splice(this.state.inputs.length - 1, 1)
        this.setState({
            inputs: newInputs
        })
    }

    addToArrayQuant(e, index) {
        const newArray = this.state.inputs.map((quant, qindex) => {
            if (index !== qindex) return quant
            return { ...this.state.inputs, quant: e }
        })
        this.setState({ inputs: newArray })
        // this.setState(prevState => ({
        //     cartQuantities: [...prevState.cartQuantities, e]
        // }))
        console.log(this.state.inputs)
    }

    addToArrayName(e, formField) {
        this.setState(prevState => ({
            cartNames: [...prevState.cartNames, e]
        }))
        console.log(this.state.cartNames)

    }





    handleCartridgeOrderChangeName = (idx) => (evt) => {
        const newCart = this.state.cartridgeForOrder.map((cartridge, sidx) => {
            if (idx !== sidx) return cartridge;
            return { ...newCart, name: evt.target.value, quant: this.state.cartridgeForOrder[idx].quant };
        });

        this.setState({ cartridgeForOrder: newCart });
    }

    handleCartridgeOrderChangeQuantity = (idx) => (evt) => {
        const newCart = this.state.cartridgeForOrder.map((cartridge, sidx) => {
            if (idx !== sidx) return cartridge;
            return { ...newCart, quant: evt.target.value, name: this.state.cartridgeForOrder[idx].name };
        });

        this.setState({ cartridgeForOrder: newCart });
    }

    handleSubmit = (evt) => {
        const { name, shareholders } = this.state;
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    }

    handleAddCartridgeOrder = () => {
        this.setState({
            cartridgeForOrder: this.state.cartridgeForOrder.concat([{ name: '', quant: '' }])
        });
    }

    handleRemoveCartridgeOrder = (idx) => () => {
        this.setState({
            cartridgeForOrder: this.state.cartridgeForOrder.filter((s, sidx) => idx !== sidx)
        });
    }


    submitCustomer() {
        var data = {
            name: this.state.name,
            phone: this.state.phone,
            streetaddress: this.state.streetaddress,
            city: this.state.city,
            state: this.state.state,
        }
        axios.post('/api/customers/insert', data)
            .then(response => {
                this.setState({ customerId: response.data[0].customerid })
                console.log(response.data)
            })
        this.setState({ customerAdded: !this.state.customerAdded })
        this.notify();

    }


    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="screendarken">
                {this.props.children}
                <div className="modalWindow">
                    
                    <div className="topContentRM">

                        <Select
                            className="Select-inputTEST"
                            name="form-field-one"
                            placeholder="Existing company select"
                            value={this.state.value}
                            options={this.state.customers}
                            onChange={this.logChange} />
                        <button className="closeButton" onClick={this.props.onClose}>&#10006;</button>



                    </div>
                    {this.state.currentCustomer.length !== 0 ?
                        <div className="customerInfo">
                            <div className="rowOne">
                                <div className="aboveBelow">
                                    <input className="inputBoxR Name" value={this.state.currentCustomer.length === 0 ? ' ' : this.state.currentCustomer[0].name}></input>
                                </div>
                                <div className="aboveBelow">
                                    <input className="inputBoxR Phone" value={this.state.currentCustomer.length === 0 ? ' ' : this.state.currentCustomer[0].phone}></input>
                                </div>
                            </div>
                            <div className="rowTwo">

                                <div className="aboveBelow">
                                    <input className="inputBoxR Address" value={this.state.currentCustomer.length === 0 ? ' ' : this.state.currentCustomer[0].streetaddress}></input>
                                </div>
                                <div className="aboveBelow">
                                    <input className="inputBoxR City" value={this.state.currentCustomer.length === 0 ? ' ' : this.state.currentCustomer[0].city}></input>
                                </div>
                                <div className="aboveBelow">
                                    <input className="inputBoxR State" value={this.state.currentCustomer.length === 0 ? ' ' : this.state.currentCustomer[0].state}></input>
                                </div>
                            </div>

                        </div>
                        :
                        <div className="customerInfo">
                            <div className="rowOne">
                                <div className="aboveBelow">
                                    <input className="inputBoxR Name" placeholder="NAME" onChange={(e) => { this.handleChange(e.target.value, "name") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <input className="inputBoxR Phone" placeholder="PHONE" onChange={(e) => { this.handleChange(e.target.value, "phone") }}></input>
                                </div>

                            </div>
                            <div className="rowTwo">

                                <div className="aboveBelow">
                                    <input className="inputBoxR Address" placeholder="STREET ADDRESS" onChange={(e) => { this.handleChange(e.target.value, "streetaddress") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <input className="inputBoxR City" placeholder="CITY" onChange={(e) => { this.handleChange(e.target.value, "city") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <input className="inputBoxR State" placeholder="ST" onChange={(e) => { this.handleChange(e.target.value, "state") }}></input>
                                </div>
                            </div>
                            {this.state.customerAdded ? null : <button onClick={this.submitCustomer}>Submit New Customer</button>}
                        </div>
                    }

                    <div className="buttons">
                        <button className="repairButtond" onClick={this.setRepair}>REPAIR</button>
                        <button className="deliveryButtond" onClick={this.setDelivery}>DELIVERY</button>

                    </div>

                    {this.state.rdSetting === null ? null : this.state.rdSetting === "d" ?
                        //DELIVERY ***********************************************************************************************
                        <div>
                            <div className="rowForDeliveries">
                                <div className="colOne">
                                    <div className="aboveBelow">
                                        <input className="inputBoxR Name" onChange={(e) => { this.handleChange(e.target.value, "contactName") }} placeholder="CONTACT NAME"></input>
                                    </div>
                                    <div className="aboveBelow">
                                        <input className="inputBoxR Notes" onChange={(e) => { this.handleChange(e.target.value, "notes") }} placeholder="NOTES"></input>
                                    </div>
                                    <div className="aboveBelow">
                                        <span className="inputNames Tech">Tech:  </span>
                                        {/* <input className="inputBoxR Tech" onChange={(e) => { this.handleChange(e.target.value, "tech") }}></input> */}
                                        <div className="selectFormat">
                                            <select onChange={(e) => { this.handleChange(e.target.value, "tech") }} value={this.state.tech}>
                                                <option value="BB">BB</option>
                                                <option value="LE">LE</option>
                                                <option value="RD">RD</option>

                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="colTwo">
                                    <span>Quantity - Cartridge</span>
                                    <div>
                                        {this.state.cartridgeForOrder.map((cartridge, idx) => (
                                            <div className="shareholder">
                                                <input
                                                    type="text"
                                                    placeholder={`Cartridge #${idx + 1} name`}
                                                    value={cartridge.quant}
                                                    onChange={this.handleCartridgeOrderChangeQuantity(idx)}
                                                />

                                                <select onChange={this.handleCartridgeOrderChangeName(idx)}>
                                                    <option selected disabled>Select Quantity</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>

                                                </select>
                                                <button type="button" onClick={this.handleRemoveCartridgeOrder(idx)} className="small">-</button>
                                            </div>
                                        ))}


                                    </div>
                                    <button type="button" onClick={this.handleAddCartridgeOrder} className="small">Add Cartridge</button>

                                </div>

                            </div>
                            <button onClick={this.submitDelivery}>Submit</button>

                        </div>

                        :
                        //REPAIR ***********************************************************************************************
                        <div>
                            <div className="rowOne">
                                <div className="aboveBelow">
                                    <span className="inputNames ContactNameRep">Contact Name:  </span>
                                    <input className="inputBoxR ContactNameRep" onChange={(e) => { this.handleChange(e.target.value, "contactName") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Printer">Printer:  </span>
                                    <input className="inputBoxR Printer" onChange={(e) => { this.handleChange(e.target.value, "printer") }}></input>
                                </div>
                                <div className="aboveBelow">

                                    <span className="inputNames IDNum">ID#: </span>
                                    <input className="inputBoxR IDNum" onChange={(e) => { this.handleChange(e.target.value, "printerID") }}></input>
                                </div>

                            </div>
                            <div className="rowTwo">

                                <div className="aboveBelow">
                                    <span className="inputNames Loc">Symptoms:  </span>
                                    <input className="inputBoxR Loc" onChange={(e) => { this.handleChange(e.target.value, "location") }}></input>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Tech">Tech:  </span>
                                    <select onChange={(e) => { this.handleChange(e.target.value, "tech") }}>
                                        <option value="BB">BB</option>
                                        <option value="LE">LE</option>
                                        <option value="RD">RD</option>

                                    </select>
                                </div>
                                <div className="aboveBelow">
                                    <span className="inputNames Notes">Notes:  </span>
                                    <input className="inputBoxR Notes" onChange={(e) => { this.handleChange(e.target.value, "notes") }}></input>
                                </div>
                            </div>
                            <button onClick={this.submitRepair}>Submit</button>

                        </div>}
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

RepairModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default RepairModal

