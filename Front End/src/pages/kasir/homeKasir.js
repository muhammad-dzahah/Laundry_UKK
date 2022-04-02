import axios from 'axios';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import NavbarKasir from '../../component/navbarKasir';


export default class HomeKasir extends React.Component{
    constructor(){
        super()
        this.state = {
            userName: "",
            countMember: "",
            countUser: "",
            countPaket: "",
            countTransaksi: "",
            token: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getUsername = () => {
        let user = JSON.parse(localStorage.getItem('kasir'))
        this.setState({userName: user.nama})
    }
    getMember = () => {
        let url = "http://localhost:4040/api/member"
        axios.get(url)
        .then(response => {
          this.setState({countMember: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getUser = () => {
        let url = "http://localhost:4040/api/user"
        axios.get(url)
        .then(response => {
          this.setState({countUser: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getPaket = () => {
        let url = "http://localhost:4040/api/paket"
        axios.get(url)
        .then(response => {
          this.setState({countPaket: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getTransaksi = () => {
        let url = "http://localhost:4040/api/transaksi"
        axios.get(url)
        .then(response => {
          this.setState({countTransaksi: response.data.data.length});
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount = () => {
        this.getMember()
        this.getUser()
        this.getPaket()
        this.getTransaksi()
        this.getUsername()
    }
    render(){
        return(
            <div>
                <NavbarKasir />
                <Container className="container my-4">
                    <Card className="card shadow px-4 rounded rounded-5 border-0">
                        <Card.Body>
                            <h3 className="my-2">
                                <strong className="text-secondary">Welcome Back, </strong> 
                                <strong>{this.state.userName}</strong>
                            </h3>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card className="card shadow p-4 rounded rounded-5 border-0">
                        <Card.Body className="card-body">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-light">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Member Count</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <strong>{this.state.countMember}</strong>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-light">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>User Count</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <strong>{this.state.countUser}</strong>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-light">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Paket Count</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <strong>{this.state.countPaket}</strong>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                                    <div className="border border-secondary bg-light">
                                        <div className="card-body" >
                                            <h5 className="text-secondary">
                                                <strong>Transaksi Count</strong>
                                            </h5>
                                            <h1 className="text text-end">
                                                <strong>{this.state.countTransaksi}</strong>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>    
                </Container>
            </div>
        )     
    }
}

