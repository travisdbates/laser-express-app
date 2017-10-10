import React, {Component} from "react"
import axios from "axios"

export default class Customers extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers: []
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
            <div>
            <h1>Name: </h1><h1>{customer[index].name}</h1>
            </div>
        })
    }
    render () {
        return (
            <div>
                <h1>Customers</h1>

                {console.log(this.state.customers[0])}
            
                {!this.state.customers.name ? <h1>Loading...</h1> : <h2>{this.state.customers[0].name}</h2>}
            
            </div>
            
        )
    }
}