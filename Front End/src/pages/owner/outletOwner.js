import React from 'react';
import axios from "axios";
import { Modal, Button, Card, Container, Form } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarAdmin from '../../component/navbarAdmin';
import NavbarOwner from '../../component/navbarOwner';

export default class OutletOwner extends React.Component{
    constructor(){
        super()
        this.state = {
            id_outlet: "",
            lokasi: "",
            outlets: [],
            action: "",
            isModalOpen: false
        }
    }
    getOutlet = () => {
        let url = "http://localhost:4040/api/outlet"
        axios.get(url)
        .then(response => {
            this.setState({outlets: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(this.state.outlets)
    }
    componentDidMount = () =>{
        this.getOutlet()
    }
    handleAdd = () => {
        this.setState({
            id_outlet: "",
            lokasi: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) => {
        this.setState({
            id_outlet: item.id_outlet,
            lokasi: item.lokasi,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) => {
        event.preventDefault();
        let url = "http://localhost:4040/api/outlet"
        let form = {
            id_outlet: this.state.id_outlet,
            lokasi: this.state.lokasi
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getOutlet()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        }
    }
    handleDelete = (id_outlet) => {
        let url = "http://localhost:4040/api/outlet/" + id_outlet
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getOutlet();
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
                <NavbarOwner />
                <Container className="my-4 d-flex justify-content-center"> 
                    <Card className="card shadow col-lg-6 col-md-6 col-sm-6">
                        <Card.Body className='card-body'>
                            <h2 className='text-black text-center my-4'>
                                Outlet
                            </h2>
                            <br />
                            <ul className="list-group mx-3">
                            {this.state.outlets.map(outlet => (
                                <li className="list-group-item">
                                    <center className="row">   
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <small className="text-secondary">Location :</small>
                                            <h6>{outlet.lokasi}</h6>
                                        </div>
                                    </center>
                                </li>
                            ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form New Outlet</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" value={this.state.id_outlet} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Lokasi </Form.Label>
                                <Form.Control type="text" value={this.state.lokasi}
                                onChange={ev => this.setState({lokasi: ev.target.value})} />
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