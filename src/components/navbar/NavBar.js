import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import LELogoWhite from "./LE White.svg"

import "./NavBar.css"

export default class NavBar extends Component {
    render() {
        return (
            <div className="NavBarContainer">

                <div className="header-container">
                    <img src={LELogoWhite} className="logoNav" alt="logo"/>
                </div>
                <div className="tabs">
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" to="/dashboard">DASHBOARD</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/deliveries">DELIVERIES</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/repairs">REPAIRS</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/orders">ORDERS</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/customers">CUSTOMERS</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/toners">TONERS</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/insight">INSIGHT</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/">Link</NavLink>
                </div>
            </div>

        )
    }
}