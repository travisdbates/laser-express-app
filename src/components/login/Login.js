import React, {Component} from "react"
import "./Login.css"
import LELogoWhite from "./LE White.svg"
import {Link} from 'react-router-dom'

export default class Login extends Component {
    render(){
        return (
            <div className="login-container">
                <img src={LELogoWhite} className="logo" alt='logo'/>
                <a href={ process.env.REACT_APP_LOGIN }><button className="login-button">&nbsp;LOGIN</button></a>
            </div>
        )
    }
}