import React from 'react';
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import NavbarAdmin from '../../component/navbarAdmin';

export default class PaketAdmin extends React.Component{
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
    handleAdd = () =>{
        this.setState({
            id_paket: 0,
            jenis: "",
            harga: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_paket: item.id_paket,
            jenis: item.jenis,
            harga: item.harga,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave =(event)=>{
        event.preventDefault();
        let url = "http://localhost:4040/api/paket"
        let form = {
            id_paket: this.state.id_paket,
            jenis: this.state.jenis,
            harga: this.state.harga
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_paket) => {
        let url = "http://localhost:4040/api/paket/" + id_paket
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getPaket();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    render(){
        return(
            <div>
                <NavbarAdmin />
                <Container className="my-4"> 
                    <Card className="card shadow">
                        <Card.Body className='card-body'>
                            <h2 className='text-black text-center my-4'>
                                Paket
                            </h2>
                            <br />
                            <div className="">
                                <Button className="btn btn-success shadow my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add Paket
                                </Button>
                            </div>
                            <ul className="list-group mx-3">
                            {this.state.pakets.map(paket => (
                                <li className="list-group-item">
                                    <div className="row">   
                                        <div className="col-lg-5 col-md-4 col-sm-4">
                                            <small className="text-secondary">Jenis :</small>
                                            <h6>{paket.jenis}</h6>
                                        </div>
                                        <div className="col-lg-5 col-md-4 col-sm-4">
                                            <small className="text-secondary">Harga :</small> <br />
                                            <h6>{paket.harga}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-4">
                                            <button className="btn btn-sm btn-warning m-2" onClick={() => this.handleEdit(paket)}>
                                                <AiFillEdit style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(paket.id_paket)}>
                                                <MdDelete style={{color: "white"}}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form New Paket</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Jenis</Form.Label>
                                <Form.Control type="text" value={this.state.jenis} 
                                onChange={ev => this.setState({jenis: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Harga </Form.Label>
                                <Form.Control type="text" value={this.state.harga}
                                onChange={ev => this.setState({harga: ev.target.value})} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Modal.Body>
                    </Form>
                </Modal>
            </div>
        )     
    }
}