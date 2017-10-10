import React, {Component} from "react"
import "./Login.css"
import LELogoWhite from "./LE White.svg"
import {Link} from 'react-router-dom'

export default class Login extends Component {
    render(){
        return (
            <div className="login-container">
                <img src={LELogoWhite} className="logo"/>
                <a href={ process.env.REACT_APP_LOGIN }><button className="login-button">LOGIN</button></a>
                <Link to="/nav"><button className="login-button">NavBar</button></Link>
            </div>
        )
    }
}