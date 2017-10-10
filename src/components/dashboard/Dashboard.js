import React, {Component} from "react"
import "./Dashboard.css"
import LELogoWhite from "./LE White.svg"
import axios from "axios"

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo: {}
        }

    }
    componentDidMount(){
        const userData = axios.get('/auth/me')
        .then(res => {
            console.log(res.data)
            this.setState({
                
                userInfo: res.data
            })
        })
    }
    render(){
        return (
            <div className="dash-container">
                <img src={LELogoWhite} className="logo"/>
                <h1 className="tempTitle">DASHBOARD</h1>
                <h2 className="tempInfo">{this.state.userInfo.email}</h2>
                <a href='http://localhost:3005/auth/logout'><button>Log out</button></a>
            </div>
        )
    }
}