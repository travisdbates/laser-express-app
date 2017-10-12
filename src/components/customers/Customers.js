import "./Customers.css"

import React, {Component} from "react"
import axios from "axios"

var Spinner = require('react-spinkit');




export default class Customers extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers: [],
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
        axios.get("/api/customers/get")
        .then(response => {
            this.setState({ customers: response.data})
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
                <h1 className="temp">Customers</h1>

                {console.log(this.state.customers)}
            
                <div className="customersHeader">
                    <span className="headerTitleName">NAME</span>
                    <span className="headerTitle">PHONE</span>
                    <span className="headerTitle">STREET ADDRESS</span>
                    <span className="headerTitle">CITY</span>
                    <span className="headerTitle">STATE</span>


                </div>
                {this.state.customers.length === 0 ? <Spinner name='double-bounce' /> : this.state.customers.map((customer, index) => {
                    return (
                    <div className="customer-container" key={customer.customerid}>
                        <span className="name">{customer.name}</span>
                        <span className="details">{customer.phone}</span>
                        <span className="details">{customer.streetaddress}</span>
                        <span className="details">{customer.city}</span>
                        <span className="details">{customer.state}</span>


                    </div>
                    )
                })}
            <button className="addCustomer">+</button>
            </div>
            
        )
    }
}