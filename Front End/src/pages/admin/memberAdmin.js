import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarAdmin from "../../component/navbarAdmin";

export default class MemberAdmin extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            members: [],
            action: "",
            isModalOpen: false
        }
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url)
        .then(response => { 
            this.setState({members: response.data.data})
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        console.log(this.state.members)
    }
    componentDidMount = () => {
        this.getMember()
    }
    handleAdd = () =>{
        this.setState({
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_member: item.id_member,
            nama: item.nama,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:4040/api/member"
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        
        if(this.state.action === "insert"){
            axios.post(url, form)
            .then(response => { 
                window.alert(response.data.message)
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_member) => {
        let url = "http://localhost:4040/api/member/" + id_member
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getMember();
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
    render() {
        return (
            <div>
                <NavbarAdmin />
                <Container className="my-4">
                    <Card className="card shadow">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List of Member
                            </h2>
                            <br />
                            <div className="">
                                <Button className="btn btn-success shadow my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add Member
                                </Button>
                            </div>

                            <ul className="list-group mx-3">
                            {this.state.members.map(member => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-5 col-sm-4">
                                            <small className="text-secondary">Name :</small>
                                            <h6>{member.nama}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-7 col-sm-8">
                                            <small className="text-secondary">Address :</small> <br />
                                            <h6>{member.alamat}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-5 col-sm-4">
                                            <small className="text-secondary">Gender :</small> <br />
                                            <h6>{member.jenis_kelamin}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-4">
                                            <small className="text-secondary">Telephon :</small> <br />
                                            <h6>{member.tlp}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-4">
                                            <button className="btn btn-sm btn-warning m-2" onClick={() => this.handleEdit(member)}>
                                                <AiFillEdit style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(member.id_member)}>
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
                        <Modal.Title>Form New Member</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={this.state.nama} 
                                onChange={ev => this.setState({nama: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Address </Form.Label>
                                <Form.Control type="text" value={this.state.alamat}
                                onChange={ev => this.setState({alamat: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Gender </Form.Label>
                                <Form.Select value={this.state.jenis_kelamin} 
                                onChange={ev => this.setState({jenis_kelamin: ev.target.value})}>
                                    <option>Choose Gender</option>
                                    <option value="pria">Man</option>
                                    <option value="wanita">Women</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Telepon </Form.Label>
                                <Form.Control type="text" value={this.state.tlp}
                                onChange={ev => this.setState({tlp: ev.target.value})} />
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
        );
    }
}
