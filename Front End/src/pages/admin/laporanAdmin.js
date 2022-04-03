import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BiDetail } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr" 
import NavbarAdmin from "../../component/navbarAdmin";
import ComponentToPrint from "../../component/componentToPrint";
import ReactToPrint from "react-to-print";

export default class LaporanAdmin extends React.Component {
    constructor() {
        super()
        this.state = {
            token:"",
            id_transaksi: "",
            id_member: "",
            id_paket:"",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"",
            dibayar:"",
            id_user:"",
            idUser:"",
            namaUser:"",
            id_outlet:"",
            qty:0,
            users:[],
            user:[],
            paket:[],
            transaksi: [],
            member: [],
            outlet:[],
            nama: "",
            action: "",
            isModalOpen: false
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
    }

    render() {
        return (
            <div>
                <NavbarAdmin />
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <br />
                            <ReactToPrint
                                trigger={()=> {
                                return <button type="button" className="btn m-3 btn-secondary btn-lg btn-block"><GrDocumentPdf/> Print To PDF</button>}}
                                content={()=>this.componentRef}
                            />
                            <Button type="button" className="btn m-3 btn-primary btn-lg btn-block" href="/transaksiAdmin">
                                Back to Transaksi
                            </Button>
                            <br/>
                            <ComponentToPrint ref={el => (this.componentRef = el)} />
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}