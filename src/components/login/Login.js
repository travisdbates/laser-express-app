import React, {Component} from "react"
import "./Login.css"
import LELogoWhite from "./LE White.svg"

export default class Login extends Component {
    render(){
        return (
            <div className="login-container">
                <img src={LELogoWhite} className="logo" alt='logo'/>
                <span>Login Credentials: test@test.com | password: test</span>
                <a href={ process.env.REACT_APP_LOGIN }><button className="loginbutton">&nbsp;LOGIN</button></a>
            </div>
        )
    }
}