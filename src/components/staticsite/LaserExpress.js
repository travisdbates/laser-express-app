import React, { Component } from 'react'
import "./LaserExpress.css"
import LELogoWhite from "../login/LE White.svg"
import Headroom from "react-headroom"
import ScrollableAnchor from 'react-scrollable-anchor'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import "../../../node_modules/animate.css/animate.min.css"
import ScrollAnimation from 'react-animate-on-scroll';
import axios from "axios"

import deliv from "./delivery-truck (1).svg"
import print from "./print.svg"
import wrench from "./wrench.svg"
import smile from "./smiling-emoticon-square-face.svg"


import { HashLink as Link } from 'react-router-hash-link';




export default class LaserExpress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: [],
            customers: [],
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
        this.setAboutNode = this.setAboutNode.bind(this)
        this.goToSignup = this.goToSignup.bind(this)
        this.goToTop = this.goToTop.bind(this)
        this.goToRequest = this.goToRequest.bind(this)

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

    componentDidMount() {
        const userData = axios.get('/auth/me')
            .then(res => {
                console.log(res)

                console.log(res.data)
                this.setState({

                    userInfo: res.data
                })
            })
        console.log(this.state.userInfo)

        axios.get('/api/customers/getselect')
            .then(response => {
                console.log(response.data)
                this.setState({ customers: response.data })
            })

    }

    setTopNode = (node) => {
        if (node) {
            this._TopNode = node
        }
    }

    setAboutNode = (node) => {
        if (node) {
            this._aboutNode = node
        }
    }

    setSignupNode = (node) => {
        if (node) {
            this._signupNode = node
        }
    }
    setRequestNode = (node) => {
        if (node) {
            this._RequestNode = node
        }
    }
    goToTop = (event) => {
        event.preventDefault()

        // Passing the dom node from react is all you need for this to work
        scrollIntoViewIfNeeded(this._TopNode, false, true, {
            duration: 1000
        })
    }
    goToRequest = (event) => {
        event.preventDefault()

        // Passing the dom node from react is all you need for this to work
        scrollIntoViewIfNeeded(this._RequestNode, false, true, {
            duration: 1000
        })
    }
    goToAbout = (event) => {
        event.preventDefault()

        // Passing the dom node from react is all you need for this to work
        scrollIntoViewIfNeeded(this._aboutNode, false, true, {
            duration: 1000
        })
    }
    goToSignup = (event) => {
        event.preventDefault()

        // Passing the dom node from react is all you need for this to work
        scrollIntoViewIfNeeded(this._signupNode, false, true, {
            duration: 1000
        })
    }
    goToRequest = (event) => {
        event.preventDefault()

        // Passing the dom node from react is all you need for this to work
        scrollIntoViewIfNeeded(this._RequestNode, false, true, {
            duration: 1000
        })
    }




    //IMPORTED FUNCTIONS FROM REPAIR MODAL


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
        window.location.reload(true)
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
        return (
            <div style={{ backgroundColor: '#000' }}>
                <div ref={this.setTopNode}></div>

                <Headroom
                    onPin={() => console.log('pinned')}
                    onUnpin={() => console.log('unpinned')}
                    style={{
                        height: 100,
                        background: 'rgba(255, 255, 255, 1)',
                        boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
                    }}
                >
                    <div className="headerTest">
                        <h1 className="headerTitle" onClick={this.goToTop}>LASER EXPRESS</h1>

                        <div>

                            <span className="links" onClick={this.goToSignup}>WHAT WE DO &nbsp;&nbsp; |</span>
                            <span className="links" onClick={this.goToAbout}>&nbsp;  ABOUT &nbsp; |</span>
                            <span className="links" onClick={this.goToRequest}>SERVICE REQUEST</span>
                        </div>

                    </div>
                </Headroom>

                <div className="test">
                    <div className="darken">
                        <div className="line"></div>
                        <img src={LELogoWhite} className="logoForStatic" />
                        <div className="line"></div>
                    </div>
                </div>
                <div className="what">
                    <div className="columnFlex">
                        <span className="whatWeDo">WHAT WE DO</span>
                        <div className="fullWidth">
                            <div className="scrollFlex">
                                <div className="flexLeft">
                                    <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                                        <div className="centerText">
                                            <img className="icon" src={print} />
                                            <div className="centerText">
                                                <span className="iconText">Toner Cartridges for every printer under the &#9728;</span></div></div></ScrollAnimation></div>


                                <div className="flexRight">
                                    <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                                        <div className="centerText">
                                            <div className="centerText">
                                                <span className="iconText">Super speedy deliveries usually same day! (Take that Amazon!)</span>
                                                <img className="icon" src={deliv} /></div></div></ScrollAnimation></div>


                                <div className="flexLeft">
                                    <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                                        <div className="centerText">
                                            <img className="icon" src={wrench} />
                                            <div className="centerText">
                                                <span className="iconText">Solutions for your (printer) problems.</span></div></div></ScrollAnimation></div>


                                <div className="flexRight">
                                    <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                                        <div className="centerText">
                                            <div className="centerText">
                                                <span className="iconText">Free smiles with each repair or delivery! </span>
                                                <img className="icon" src={smile} /></div></div></ScrollAnimation></div>


                            </div>
                        </div>


                    </div>
                </div>
                <div ref={this.setSignupNode}></div>
                <div className="what">
                    <div className="columnFlex">
                        {/* <div className="whatEnd"> */}
                        <span className="whatWeDoA">ABOUT</span>
                        {/* </div> */}
                        <span style={{ color: 'white', width: '100vw', textAlign: 'right' }}>Keeping you printing since 1989.</span>
                        <div className="about">
                            <iframe style={{ width: "100vw", height: "45vh", minWidth: "315px", frameborder: "0", style: "border:0", marginTop: "5vh" }} src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJwcMxa1OXTYcRrcORV-5SBI4&key=AIzaSyCJ1o1TC5WreEah_DWoSLejeGsr7uxbaYA&zoom=17" allowFullscreen></iframe>
                        </div>
                    </div>

                </div>
                <div ref={this.setAboutNode}></div>
                <div className="what">
                    <div className="columnFlex">
                        <span className="whatWeDo">SERVICE REQUEST</span>{this.state.userInfo === false ? <button onClick={() => window.location = "/"} className="smallSL"> PLEASE LOGIN TO SUBMIT A REQUEST</button> : <span className="welcome">Welcome, {this.state.userInfo.user_name}</span>}

                        {this.state.userInfo === false ? null : <div>
                            <div className="buttons">
                                <button className="repairButtond" onClick={this.setRepair}>REPAIR</button>
                                <button className="deliveryButtond" onClick={this.setDelivery}>DELIVERY</button>
                            </div>
                            {this.state.rdSetting === null ? null : this.state.rdSetting === "d" ?
                                //DELIVERY ***********************************************************************************************
                                <div>
                                    <div className="rowForDeliveriesS">
                                        <div className="colOneS">
                                            <div className="centerButtons"><input className="inputBoxS Name" onChange={(e) => { this.handleChange(e.target.value, "contactName") }} placeholder="CONTACT NAME"></input></div>
                                            <div className="centerButtons"><input className="inputBoxS Notes" onChange={(e) => { this.handleChange(e.target.value, "notes") }} placeholder="NOTES"></input></div>

                                        </div>
                                    </div>
                                    <div className="colOneS">
                                        <span className="cartridgesName">CARTRIDGES</span>
                                        <div>
                                            {this.state.cartridgeForOrder.map((cartridge, idx) => (
                                                <div className="cartQuant">
                                                    <input
                                                        type="text"
                                                        placeholder={`CARTRIDGE #${idx + 1}`}
                                                        value={cartridge.quant}
                                                        onChange={this.handleCartridgeOrderChangeQuantity(idx)}
                                                        className="cartName"
                                                    />

                                                    <select onChange={this.handleCartridgeOrderChangeName(idx)} className="quant">
                                                        <option selected disabled>QUANTITY</option>
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
                                                    <button type="button" className="removeButton" onClick={this.handleRemoveCartridgeOrder(idx)}>-</button>
                                                </div>
                                            ))}


                                            <div className="centerButtons"><button type="button" onClick={this.handleAddCartridgeOrder} className="smallSAdd">+</button></div>

                                        </div>

                                    </div>
                                    <div className="centerButtons"><button className="smallS" onClick={this.submitDelivery}>SUBMIT</button></div>

                                </div>

                                :
                                //REPAIR ***********************************************************************************************
                                <div>
                                    <div className="rowForDeliveriesS">
                                        <div className="colOneS">

                                            <div className="centerButtons"><input className="inputBoxS" placeholder="CONTACT NAME" onChange={(e) => { this.handleChange(e.target.value, "contactName") }}></input></div>
                                            <div className="centerButtons"><input className="inputBoxS" placeholder="PRINTER" onChange={(e) => { this.handleChange(e.target.value, "printer") }}></input></div>
                                            <div className="centerButtons"><input className="inputBoxS" placeholder="SYMPTOMS" onChange={(e) => { this.handleChange(e.target.value, "notes") }}></input></div>
                                        </div>
                                    </div>
                                    <div className="centerButtons"><button onClick={this.submitRepair} className="smallSL">SUBMIT</button></div>

                                </div>}
                        </div>}
                    </div>
                </div>

                <div ref={this.setRequestNode}></div>


            </div >
        )
    }
}