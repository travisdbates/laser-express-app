import React, { Component } from "react"
import Select from "react-select"
import axios from "axios"
import CountUp from "react-countup"

import "./Toners.css"
import '../../../node_modules/react-select/dist/react-select.css'

var Spinner = require('react-spinkit');


export default class Toners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printerToners: [],
            value: '',
            toners: [],
        }

        this.logChange = this.logChange.bind(this)
        this.add = this.add.bind(this)
        this.subtract = this.subtract.bind(this)
    }

    componentDidMount() {
        axios.get('/api/toners/getall')
            .then(response => {
                response.data.sort((a, b) => {
                    var numA = a.number, numB = b.number;
                    if (numA < numB) {
                        return 1;
                    }
                    if (numA > numB) {
                        return -1;
                    }
                    return 0;
                })
                console.log(response.data)
                this.setState({
                    toners: response.data
                })
            })
        console.log(this.state.toners)


    }

    logChange(val) {

        //CHANGE THIS TO SELECTING CARTRIDGES/PRINTERS

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

    add(id, index) {
        // console.log(id)

        axios.put(`/api/toners/add/${id}`)
            .then(response => console.log(response))

        let tempArr = this.state.toners;
        tempArr[index].number++
        this.setState({
            toners: tempArr
        })
    }


    subtract(id, index) {
        // console.log(id)

        axios.put(`/api/toners/subtract/${id}`)
            .then(response => console.log(response))


        let tempArr = this.state.toners;
        tempArr[index].number--
        this.setState({
            toners: tempArr
        })
    }

    render() {
        return (
            <div className="outerDivD">
                <div className="sideBySideSelect">
                    <div>
                        <Select
                            className="Select-input"
                            name="form-field-one"
                            placeholder="Search by printer"
                            value={this.state.value}
                            options={this.state.printers}
                            onChange={this.logChange} />
                        <div className="placeholder"></div>
                    </div>
                    <div>
                        <Select
                            className="Select-input"
                            name="form-field-two"
                            placeholder="Search by cartridge"
                            value={this.state.value}
                            options={this.state.cartridges}
                            onChange={this.logChange} />
                        <div className="placeholder"></div>
                    </div>
                </div>
                <div className="horizontal">
                    {this.state.toners.map((toner, index) => {
                        return (
                            <div className="aboveBelowT" key={index}>
                                <div className="circleT">{this.state.toners === 0 ? 0 : <span>{toner.number}&nbsp;&nbsp;</span>}</div>
                                <div>
                                    {toner.number === 0 ? <span className="noSub"> - </span> : <button className="plusMinus" onClick={() => this.subtract(toner.tonerid, index)}> - </button>}
                                    <span className="name">{toner.name}</span>
                                    <button className="plusMinus" onClick={() => this.add(toner.tonerid, index)}> + </button>
                                </div>
                            </div>
                        )
                    })



                    }
                </div>
            </div>
        )
    }
}