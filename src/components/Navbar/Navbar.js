import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css"
import logo from "../../logo.png";

class Navbar extends Component {

    render () {
        return (
            <div className="menu"> 
                <div className="logo">
                    <img src={ logo } alt="Homely Logo"/>
                </div>

                <div className="search">
                    <div className="input-group stylish-input-group">
                        <span className="input-group-addon"> 
                            <button type="submit"> 
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                        <input type="text" className="form-control" placeholder="Search for the location within Dublin, Ireland" ></input>
                    </div>
                </div>

                <nav className="nav"> 
                <div className="wrap">
                <ul className="nav-menu" >
                {MenuItems.map((item, index) =>{
                    return (
                    <li className="nav-item" key={index}>
                        <a className={item.cName} class="nav-link"  href={item.url}> 
                        {item.title}     
                        </a>
                    </li>

                    )
                })}
                </ul>
            </div>
            <span className="nav-indicator"></span>
            </nav>
        </div>
        )
    }
}

export default Navbar
