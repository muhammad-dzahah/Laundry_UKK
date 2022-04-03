import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NavbarOwner from "../../component/navbarOwner";

export default class MemberOwner extends React.Component {
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
    render() {
        return (
            <div>
                <NavbarOwner />
                <Container className="my-4">
                    <Card className="card shadow">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List of Member
                            </h2>
                            <br />

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
                                        <div className="col-lg-3 col-md-5 col-sm-4">
                                            <small className="text-secondary">Gender :</small> <br />
                                            <h6>{member.jenis_kelamin}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4">
                                            <small className="text-secondary">Telephon :</small> <br />
                                            <h6>{member.tlp}</h6>
                                        </div>                                        
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
