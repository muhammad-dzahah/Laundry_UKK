import React from 'react';
import {Card, Form, Button, Container, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import Tabs from '../component/tabsLogin';


export default class LoginAdmin extends React.Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            role: "admin",
            massage: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            role : this.state.role
        }

        let url = "http://localhost:4040/api/user/auth"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged){
                let admin = response.data.data
                let token = response.data.token
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.props.history.push("/homeAdmin")
            }else{
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <Container className="container d-flex justify-content-center align-items-center">
                <Card className="card shadow my-5 col-lg-5 col-md-8 col-sm-11" >
                    <Tabs />
                         <Card.Body className='mt-5 mb-3 px-5'>
                            <h2 className='text-center '>Are you Admin ?</h2>
                            <br />
                            <br />

                            { !this.state.logged ? (
                                <div className="alert alert-danger mt-1 text-center">
                                    { this.state.message }
                                </div>
                            ) : null }
                                
                            <Form onSubmit={ev => this.Login(ev)}>
                                <Card.Text>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="enter username" value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control type="password" placeholder="enter password" value={this.state.password}
                                        onChange={ev => this.setState({password: ev.target.value})}
                                        autoComplete="false" />
                                    </Form.Group>
                                </Card.Text>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">Submit</Button>
                                </div>
                            </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}