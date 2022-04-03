import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";

export default class ComponentToPrint extends React.Component {
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
            outlets:[],
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
    getTransaksiIdOutlet = () => {
        // console.log(this.state.outlet)
        if(this.state.outlet !== null && this.state.outlet !== undefined && this.state.outlet !== ""){
            console.log('get transaksi by id')
            let url = "http://localhost:4040/api/transaksi/outlet/" + this.state.outlet
            // console.log(url)
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                // console.log(response);
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty
                        total += (harga * qty)
                    }
                    //tambahkan key "total"
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error))
        // console.log(this.state.outlets)
        }else{
            console.log('get transaksi')
            let url = "http://localhost:4040/api/transaksi/"
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                console.log(response)
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty
                        total += (harga * qty)
                    }
                    //tambahkan key "total"
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error))
        }  
    }
    getUser = async () => {
        let url = "http://localhost:4040/api/user"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({user: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.user)
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({member: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.member)
    }
    getPaket = async () => {
        let url = "http://localhost:4040/api/paket"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({paket: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.paket)
    }
    getOutlet = async () => {
        let url = "http://localhost:4040/api/outlet"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({outlets: response.data.data})
            console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        console.log(this.state.outlet)
    }
    
    componentDidMount = () => {
        this.getTransaksiIdOutlet()
        this.getMember()
        this.getPaket()
        this.getUser()
        this.getOutlet()
    }
    GantiStatus(status) {
        if (status === 'baru') {
            return (
                <div className="badge bg-info">
                    New
                <br />
                </div>
            )
        } else if (status === 'proses') {
            return (
                <div className="badge bg-warning">
                    Processed
                    <br />
                </div>
            )
        } else if (status === 'selesai') {
            return (
                <div className="badge bg-success">
                    Finished
                    <br />
                </div>
            )
        } else if (status === 'diambil') {
            return (
                <div className="badge bg-secondary">
                    Taken
                </div>
            )
        }
    }
    GantiStatusBayar(id_transaksi, dibayar) {
        if (dibayar === 'belum_dibayar') {
            return (
                <div className="badge bg-danger text-white">
                    Not Yet Paid
                </div>
            )
        } else if (dibayar === 'dibayar') {
            return (
                <div className="badge bg-success text-white">
                    Paid
                </div>
            )
        }
    }
    tambahPaket(e) {
		e.preventDefault()
		// tutup modal
		// this.modal.hide()
		// utk menyimpan data paket yg dipilih beserta jumlahnya
		// ke dalam array detail_transaksi
		let idPaket = this.state.id_paket
		let selectedPaket = this.state.pakets.find(
			paket => paket.id_paket == idPaket
		)
		let newPaket = {
			id_paket: this.state.id_paket,
			qty: this.state.qty,
			jenis_paket: selectedPaket.jenis,
			harga: selectedPaket.harga
		}

		// Ambil array detail_transaksi
		let temp = this.state.detail_transaksi
		temp.push(newPaket)
		this.setState({ detail_transaksi: temp })
	}
    addPaket() {
		// menampilkan form modal utk memilih paket
		// this.modal = new Modal(
		// 	document.getElementById('modal_paket')
		// )
		// this.modal.show()

		// kosongkan form nya
		this.setState({
			id_paket: "",
			qty: 0,
			jenis_paket: "",
			harga: 0,
            isModalOpen: true
		})
	}
    render() {
        return (
            <div>
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                Report Transaksi
                            </h2>
                            <br />
                            <div className="mx-3 my-3">
                                <Form.Select id= "mySelect" onChange={ev => this.setState({outlet: ev.target.value})} onClick={this.getTransaksiIdOutlet}>
                                    <option value="">All Outlet</option>
                                {this.state.outlets.map(outlet => (
                                    <option value={outlet.id_outlet}>{outlet.lokasi}</option>
                                ))}
                                </Form.Select>
                            </div>
                            <ul className="list-group mx-3">
                            {this.state.transaksi.map(transaksi => (
                                <li className="list-group-item">
                                    <div className="row mx-1 mb-3">
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Member Name :</small>
                                            <h6>{transaksi.member.nama}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Date :</small>
                                            <h6>{moment(transaksi.tgl).format('DD-MM-YYYY')}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Payment Date :</small> <br />
                                            <h6>{moment(transaksi.tgl_bayar).format('DD-MM-YYYY')}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Deadline :</small> <br />
                                            <h6>{moment(transaksi.batas_waktu).format('DD-MM-YYYY')}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Outlet Location:</small> <br />
                                            <h6>{transaksi.outlet.lokasi}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Status :</small> <br />
                                            <h6>{this.GantiStatus(transaksi.status)}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Payment :</small> <br />
                                            <h6>{this.GantiStatusBayar(transaksi.id_transaksi, transaksi.dibayar)}
                                            </h6>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <small className="text-secondary">Total :</small> <br />
                                            <h6>Rp. {transaksi.total}</h6>
                                        </div>                                        
                                        <hr />
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