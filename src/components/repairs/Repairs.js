import "./Repairs.css"

import React, {Component} from "react"
import axios from "axios"

var Spinner = require('react-spinkit');




export default class Customers extends Component {
    constructor(props){
        super(props);
        this.state = {
            repairs: [],
            customersTest: [
                {
                    "customerid": 1,
                    "name": "Customer Name",
                    "phone": "8012338495",
                    "streetaddress": "33 W Center",
                    "city": "Provo",
                    "state": "UT"
                }]
        }
        this.mapOverUsers = this.mapOverUsers.bind(this)
    }
    componentDidMount(){
        axios.get("/api/repairs/get")
        .then(response => {
            this.setState({ repairs: response.data})
        })
    }

    mapOverUsers(){
        this.state.customers.map( (customer, index) =>{
            return (
            <h2>{customer.name}</h2>
            ) 
            
        })
    }
    render () {
        return (
            <div>
                <h1 className="temp">Repairs</h1>

                {console.log(this.state.repairs)}
            
                <div className="customersHeader">
                    <span className="headerTitleRepairs">DATE</span>
                    <span className="headerTitleRepairs">TIME</span>
                    <span className="headerTitleRepairs">STATUS</span>
                    <span className="headerTitleRepairs">CONTACT</span>
                    <span className="headerTitleRepairs">ADDRESS</span>
                    <span className="headerTitleRepairs">PHONE</span>
                    <span className="headerTitleRepairs">LOCATION</span>
                    <span className="headerTitleRepairs">PRINTER</span>
                    <span className="headerTitleRepairs">ID</span>
                    <span className="headerTitleRepairs">TECH</span>
                    <span className="headerTitleRepairs">SYMPTOMS</span>
                    <span className="headerTitleRepairs">ORDERED</span>
                    <span className="headerTitleRepairs">INVOICED</span>
                    <span className="headerTitleRepairs">NOTES</span>


                </div>
                {this.state.repairs.length === 0 ? <Spinner name='double-bounce' /> : this.state.repairs.map((repairs, index) => {
                    return (
                    <div className="customer-container" key={repairs.repairsid}>
                        <span className="detailsRepairs">{repairs.date}</span>
                        <span className="detailsRepairs">{repairs.time}</span>
                        <span className="detailsRepairs">{repairs.status}</span>
                        <span className="detailsRepairs">{repairs.contactname}</span>
                        <span className="detailsRepairs">{repairs.streetaddress}</span>
                        <span className="detailsRepairs">{repairs.phone}</span>
                        <span className="detailsRepairs">{repairs.location}</span>
                        <span className="detailsRepairs">{repairs.printer}</span>
                        <span className="detailsRepairs">{repairs.idnumber}</span>
                        <span className="detailsRepairs">{repairs.tech}</span>
                        <span className="detailsRepairs">{repairs.symptoms}</span>
                        <span className="detailsRepairs">{repairs.orderstatus}</span>
                        <span className="detailsRepairs">{repairs.invoicestatus}</span>
                        <span className="detailsRepairs">{repairs.notes}</span>


                    </div>
                    )
                })}
            <button className="addRepair">+</button>
            </div>
            
        )
    }
}