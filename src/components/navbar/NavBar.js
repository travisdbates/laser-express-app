import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import LELogoWhite from "./LE White.svg"
import DelivTruck from "./delivery-truck.svg"
import clipboard from "./clipboard.svg"
import repair from "./screwdriver-and-wrench-crossed.svg"
import customer from "./avatar-inside-a-circle.svg"
import "./NavBar.css"

export default class NavBar extends Component {

    render() {
        return (
            <div className="NavBarContainer">


                <div className="tabs">
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/deliveries">DELIVERIES</NavLink>
                    <div className="divider"></div>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/orders">ORDERS</NavLink>
                    <div className="divider"></div>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/repairs">REPAIRS</NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" to="/dashboard"><div className="aboveBelowNav"><img src={LELogoWhite} className="logoForNav" alt="logo" />{window.location.href.search('dash') === -1 ? <span>DASHBOARD</span> : null}</div></NavLink>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/customers">CUSTOMERS</NavLink>
                    <div className="divider"></div>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/toners">TONERS</NavLink>
                    <div className="divider"></div>
                    <NavLink className="tabbedLinks" activeClassName="tabbedLinksActive" exact to="/insight">INSIGHT</NavLink>
                </div>


                <div className="footer">
                    <NavLink className="tabbedLinksMobile" activeClassName="tabbedLinksMobileActive" exact to="/deliveries">
                        <img src={DelivTruck} className="delivTruck" alt="delivery" /></NavLink>
                    <NavLink className="tabbedLinksMobile" activeClassName="tabbedLinksMobileActive" exact to="/orders">
                        <img src={clipboard} className="delivTruck" alt="delivery" /></NavLink>

                    <NavLink className="headerMobile" to="/dashboard">
                        <img src={LELogoWhite} className="logoForNavMobile" alt="logo" />
                    </NavLink>
                    <NavLink className="tabbedLinksMobile" activeClassName="tabbedLinksMobileActive" exact to="/repairs">
                        <img src={repair} className="delivTruck" alt="delivery" /></NavLink>
                    <NavLink className="tabbedLinksMobile" activeClassName="tabbedLinksMobileActive" exact to="/customers">
                        <img src={customer} className="delivTruck" alt="delivery" /></NavLink>

                </div>


            </div>

        )
    }
}