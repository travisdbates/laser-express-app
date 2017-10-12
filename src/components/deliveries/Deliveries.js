import "./Deliveries.css"
import RepairModal from "../repairModal/RepairModal"
import React, {Component} from "react"
import axios from "axios"

var Spinner = require('react-spinkit');





export default class Deliveries extends Component {
    constructor(props){
        super(props);
        this.state = {
            hideModal: false,
            
            deliveries: [],

        }
        this.showModal = this.showModal.bind(this)
        
    }

    componentDidMount(){
        axios.get("/api/deliveries/getall")
        .then(response => {
            this.setState({ deliveries: response.data})
        })
    }

    showModal(){
        this.setState({hideModal: !this.state.hideModal})
        console.log(this.state.hideModal)
    }
    render () {
        return (
            <div>
                <h1 className="temp">Deliveries</h1>

                {console.log(this.state.deliveries)}
            
                <div className="customersHeader">
                    <span className="headerTitleDeliveries">DATE</span>
                    <span className="headerTitleDeliveries">TIME</span>
                    <span className="headerTitleDeliveries">STATUS</span>
                    <span className="headerTitleDeliveries">CONTACT</span>
                    <span className="headerTitleDeliveries">ADDRESS</span>
                    <span className="headerTitleDeliveries">PHONE</span>
                    <span className="headerTitleDeliveries">LOCATION</span>
                    <span className="headerTitleDeliveries">CARTRIDGE</span>
                    <span className="headerTitleDeliveries">TECH</span>
                    <span className="headerTitleDeliveries">ORDERED</span>
                    <span className="headerTitleDeliveries">INVOICED</span>
                    <span className="headerTitleDeliveries">NOTES</span>


                </div>
                {this.state.deliveries.length === 0 ? <Spinner name='double-bounce' /> : this.state.deliveries.map((deliveries, index) => {
                    return (
                    <div className="customer-container" key={deliveries.deliveriesid}>
                        <span className="detailsDeliveries">{deliveries.date}</span>
                        <span className="detailsDeliveries">{deliveries.time}</span>
                        <span className="detailsDeliveries">{deliveries.status}</span>
                        <span className="detailsDeliveries">{deliveries.contactname}</span>
                        <span className="detailsDeliveries">{deliveries.streetaddress}</span>
                        <span className="detailsDeliveries">{deliveries.phone}</span>
                        <span className="detailsDeliveries">{deliveries.location}</span>
                        <span className="detailsDeliveries">{deliveries.cartridge}</span>
                        <span className="detailsDeliveries">{deliveries.tech}</span>
                        <span className="detailsDeliveries">{deliveries.orderstatus}</span>
                        <span className="detailsDeliveries">{deliveries.invoicestatus}</span>
                        <span className="detailsDeliveries">{deliveries.notes}</span>


                    </div>
                    )
                })}
            <button className="addDelivery" onClick={this.showModal} onClose={this.showModal}>+</button>
                
                <RepairModal show={this.state.hideModal} onClose={this.showModal}/>
            </div>
            
        )
    }
}