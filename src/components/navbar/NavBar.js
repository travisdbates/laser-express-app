import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import LELogoWhite from "./LE White.svg"

import "./NavBar.css"

export default class NavBar extends Component {
    render() {
        return (
            <div className="NavBarContainer">

                <div className="header-container">
                    <img src={LELogoWhite} className="logo"/>
                </div>
                <div className="tabs">
                    <NavLink className="tabbedLinks" to="/">Link 1</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 2</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 3</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 4</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 5</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 6</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 7</NavLink>
                    <NavLink className="tabbedLinks" to="/">Link 8</NavLink>
                </div>
            </div>

        )
    }
}