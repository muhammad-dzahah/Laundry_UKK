import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarOwner from "../../component/navbarOwner";


export default class UserOwner extends React.Component{
    constructor(){
        super()
        this.state = {
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            users: [],
            action: "",
            isModalOpen: false
        }
    }
    getUser = () => {
        let url = "http://localhost:4040/api/user"
        axios.get(url)
        .then(response => {
            this.setState({users: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.users)
    }
    componentDidMount = () =>{
        this.getUser()
    }
    render(){
        return(
            <div>
                <NavbarOwner />
                <Container className="my-4">
                    <Card className="card shadow">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List of User
                            </h2>
                            <br />

                            <ul className="list-group mx-3">
                            {this.state.users.map(user =>( 
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-3 col-sm-3">
                                            <small className="text-secondary">Name :</small> <br />
                                            <h6>{user.nama}</h6>
                                        </div>
                                        <div className="col-lg-4 col-md-3 col-sm-3">
                                            <small className="text-secondary">Username :</small>
                                            <h6>{user.username}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2">
                                            <small className="text-secondary">Role :</small> <br />
                                            <h6>{user.role}</h6>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )     
    }
}

