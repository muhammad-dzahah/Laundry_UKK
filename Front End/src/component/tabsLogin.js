import React from "react";
import {Card, Form, Button, Container, Nav} from 'react-bootstrap'

export default class Tabs extends React.Component{
    Logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location="/"
    }
    render(){
        return (
            <ul class="nav nav-tabs nav-fill">
                <li class="nav-item">
                    <a class="nav-link active" href="/">Admin</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/loginKasir">Kasir</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/loginOwner">Owner</a>
                </li>
            </ul>
        )
    }
}

