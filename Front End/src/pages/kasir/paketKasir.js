import React from 'react';
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import NavbarAdmin from '../../component/navbarAdmin';
import NavbarKasir from '../../component/navbarKasir';

export default class PaketKasir extends React.Component{
    constructor(){
        super()
        this.state = {
            id_paket: "",
            jenis: "",
            harga: "",
            pakets: [],
            action: "",
            isModalOpen: false
        }
    }
    getPaket = () => {
        let url = "http://localhost:4040/api/paket"
        axios.get(url)
        .then(response => {
            this.setState({pakets: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.pakets)
    }
    componentDidMount = () =>{
        this.getPaket()
    }
    render(){
        return(
            <div>
                <NavbarKasir />
                <Container className="my-4 d-flex justify-content-center"> 
                    <Card className="card shadow col-lg-6 col-md-10 col-sm-10">
                        <Card.Body className='card-body'>
                            <h2 className='text-black text-center my-4'>
                                Paket
                            </h2> 
                            <br />
                            <ul className="list-group mx-3">
                            {this.state.pakets.map(paket => (
                                <li className="list-group-item">
                                    <div className="row">   
                                        <div className="col-lg-5 col-md-6 col-sm-4">
                                            <small className="text-secondary">Jenis :</small>
                                            <h6>{paket.jenis}</h6>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-4">
                                            <small className="text-secondary">Harga :</small> <br />
                                            <h6>{paket.harga}</h6>
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