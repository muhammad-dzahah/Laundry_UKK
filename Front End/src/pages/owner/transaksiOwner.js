import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { Modal, Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import moment from 'moment'
import NavbarAdmin from "../../component/navbarAdmin";
import NavbarOwner from "../../component/navbarOwner";

export default class TransaksiOwner extends React.Component {
    constructor() {
        super()
        this.state = {
            id_transaksi: "",
            id_member: "",
            id_outlet: "",
            idUser: "",
            namaUser: "",
			tgl: "",
			batas_waktu: "",
			tgl_bayar: "",
			dibayar: "",
			id_user: "",
			id_paket: "",
            status: "",
			qty: 0,
			jenis_paket: "",
            outlet: "",
			harga: 0,
            transaksi: [],
			detail_transaksi: [],
            users: [],
			members: [],
			pakets: [],
            outlets: [],
            action: "",
            isModalOpen: false
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({members: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.members)
    }
    getUser = () => {
        let owner = JSON.parse(localStorage.getItem('owner'))
        // console.log(admin.nama)
        this.setState({idUser: owner.id_user})
        this.setState({namaUser: owner.nama})
        let url = "http://localhost:4040/api/user"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({users: response.data.data})
            // console.log(this.state.users)
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getOutlet = async () => {
        let url = "http://localhost:4040/api/outlet"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({outlets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.outlets)
    }
	getPaket = async () => {
        let url = "http://localhost:4040/api/paket"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({pakets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.pakets)
    }
    getTransaksiIdOutlet = () => {
        // console.log(this.state.outlet)
        if(this.state.outlet !== null && this.state.outlet !== undefined && this.state.outlet !== ""){
            let url = "http://localhost:4040/api/transaksi/outlet/" + this.state.outlet
            console.log(url)
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                console.log(response);
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
            // console.log('run esle')
            let url = "http://localhost:4040/api/transaksi/"
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                console.log(response);
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
	componentDidMount() {
		this.getMember()
		this.getPaket()
        this.getUser()
        this.getOutlet()
        this.getTransaksiIdOutlet()
    }
    handleAdd = () =>{
        this.setState({
            id_transaksi: 0,
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            id_user: "",
            id_member: "",
            id_outlet: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            id_outlet: item.id_outlet,
            action: "update",
            isModalOpen: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        // $("#modal_member").modal("hide")
        let url = "http://localhost:4040/api/transaksi"
        let form = {
            id_transaksi: this.state.id_transaksi,
            id_user: this.state.id_user,
            id_member: this.state.id_member,
            id_outlet: this.state.id_outlet,
            tgl: this.state.tgl,
            tgl_bayar: this.state.tgl_bayar,
            status: this.state.status,
            batas_waktu: this.state.batas_waktu,
            dibayar: this.state.dibayar,
        }

        if(this.state.action === "insert"){ 
            let url = "http://localhost:4040/api/transaksi"
            axios.post(url, form, this.headerConfig())
            .then(response => { 
                window.alert(response.data.message)
                this.getTransaksiIdOutlet()
                // console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksiIdOutlet()
                // console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_transaksi) => {
        let url = "http://localhost:4040/api/transaksi/" + id_transaksi
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
            .then(response => {
                this.getTransaksiIdOutlet();
                this.handleClose()
                console.log(response)
            })
            
            .catch(error => {
                console.log(error);
            })
        }
    }
    handleSaveEdit = (event) =>{
        event.preventDefault();
        let url = "http://localhost:4040/api/transaksi"
        let form = {
            status: this.state.status,
            batas_waktu: this.state.batas_waktu,
        }
    }
    GantiStatusBayar(id_transaksi, dibayar) {
        if (dibayar === 'belum_dibayar') {
            return (
                <div className="badge bg-danger text-white">
                    Belum Dibayar
                </div>
            )
        } else if (dibayar === 'dibayar') {
            return (
                <div className="badge bg-success text-white">
                    Sudah Dibayar
                </div>
            )
        }
    }
    GantiStatus(status) {
        if (status === 'baru') {
            return (
                <div className="badge bg-info">
                    Baru
                    <br />
                </div>
            )
        } else if (status === 'proses') {
            return (
                <div className="badge bg-warning">
                    Sedang diproses
                    <br />
                </div>
            )
        } else if (status === 'selesai') {
            return (
                <div className="badge bg-danger">
                    Siap Diambil
               </div>
            )
        } else if (status === 'diambil') {
            return (
                <div className="badge bg-success">
                    Telah Diambil
                </div>
            )
        }
    }
    JenisPaket(jenis) {
        if (jenis === 'kaos') {
            return (
                <div className="text-nowrap">
                    Kaos
                </div>
            )
        } else if (jenis === 'kiloan') {
            return (
                <div className="text-nowrap">
                    Kiloan
                </div>
            )
        } else if (jenis === 'bed_cover') {
            return (
                <div className="text-nowrap">
                    Bed Cover
                </div>
            )
        } else if (jenis === 'selimut') {
            return (
                <div className="text-nowrap">
                    Selimut
                </div>
            )
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
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List Transaksi
                            </h2>
                            <br />
                            <div className="">
                                <Button className="btn btn-success my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add transaksi
                                </Button>
                            </div>
                            <div className="mx-3 my-3">
                                <Form.Select id= "mySelect" value={this.state.outlet} onChange={ev => this.setState({outlet: ev.target.value})} onClick={this.getTransaksiIdOutlet}>
                                    <option value="">Pilih Outlet</option>
                                {this.state.outlets.map(outlet => (
                                    <option value={outlet.id_outlet}>{outlet.lokasi}</option>
                                ))}
                                </Form.Select>
                            </div>
                            <ul className="list-group mx-3">
                            {this.state.transaksi.map(transaksi => (
                                <li className="list-group-item">
                                    <div className="row mx-1 mb-3">
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Member Name :</small>
                                            <h6>{transaksi.member.nama}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Date :</small>
                                            <h6>{moment(transaksi.tgl).format('DD-MM-YYYY')}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Payment Date :</small> <br />
                                            <h6>{moment(transaksi.tgl_bayar).format('DD-MM-YYYY')}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Deadline :</small> <br />
                                            <h6>{moment(transaksi.batas_waktu).format('DD-MM-YYYY')}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Outlet Location:</small> <br />
                                            <h6>{transaksi.outlet.lokasi}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Status :</small> <br />
                                            <h6>{this.GantiStatus(transaksi.status)}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Payment :</small> <br />
                                            <h6>{this.GantiStatusBayar(transaksi.id_transaksi, transaksi.dibayar)}
                                            </h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Total :</small> <br />
                                            <h6>Rp. {transaksi.total}</h6>
                                        </div>                                        
                                        
                                        <hr />
                                        <div className="col-lg-9">
                                            <small className="text-secondary">
                                                Detail Transaksi
                                            </small> <br />
                                            {transaksi.detail_transaksi.map(detail => (
                                                <strong className="row">
                                                    {/** area nama paket col-3 */}
                                                    <div className="col-lg-3">
                                                        {detail.paket.jenis}
                                                    </div>
                                                    {/** area qty col-2 */}
                                                    <div className="col-lg-2">
                                                        qty: {detail.qty}
                                                    </div>
                                                    {/** area harga paket col-3 */}
                                                    <div className="col-lg-3">
                                                        @ Rp {detail.paket.harga}
                                                    </div>
                                                    {/** area total paket col-lg 4 */}
                                                    <div className="col-lg-4">
                                                        Rp {detail.paket.harga * detail.qty}
                                                    </div>
                                                </strong>
                                            ))}
                                        </div>
                                        <div className="col-lg-3 mt-4">
                                            <button className="btn btn-sm btn-secondary my-2" onClick={() => this.showData(transaksi.id_transaksi)}>
                                                <strong style={{color: "white"}}>Download PDF</strong>
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
                        <Modal.Title>Form Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label> Nama User </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.idUser} onChange={ev => this.setState({id_user: ev.target.value})} disabled>
                                    {this.state.users.map(user => (
                                    <option value={user.id_user} hidden> {user.username}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>tanggal</Form.Label>
                                <Form.Control type="date" value={this.state.tgl} 
                                onChange={ev => this.setState({tgl: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>batas waktu</Form.Label>
                                <Form.Control type="date" value={this.state.batas_waktu} 
                                onChange={ev => this.setState({batas_waktu: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>tanggal bayar</Form.Label>
                                <Form.Control type="date" value={this.state.tgl_bayar} 
                                onChange={ev => this.setState({tgl_bayar: ev.target.value})} />
                            </Form.Group>
                            {/* <Form.Group className="mb-2"> */}
                            {/* <Form.Label> status </Form.Label> */}
                                {/* <Form.Select value={this.state.status} 
                                onChange={ev => this.setState({status: ev.target.value})}>
                                    <option value="status">Pilih Status</option>
                                    <option value="baru">Baru</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">Diambil</option>
                                </Form.Select> */}
                            {/* </Form.Group> */}
                            <Form.Group className="mb-2">
                            <Form.Label> Pilih Paket  </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_paket} onChange={ev => this.setState({id_paket: ev.target.value})}>
                                    {this.state.pakets.map(paket => (
                                    <option value={paket.id_paket}> {paket.jenis}</option>
                                    ))}
                            </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                            <Form.Label> dibayar </Form.Label>
                                <Form.Select value={this.state.dibayar} 
                                onChange={ev => this.setState({dibayar: ev.target.value})}>
                                    <option value="pilih">Pilih</option>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="belum_dibayar">Belum dibayar</option>
                                </Form.Select>
                            </Form.Group>
                           
                            <Form.Group className="mb-2">
                            <Form.Label> Nama Member </Form.Label>
                            <Form.Select value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
							{this.state.members.map(member => (
								<option     value={member.id_member} >{member.nama}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                            <Form.Group className="mb-2">
                            <Form.Label> Nama Outlet </Form.Label>
                            <Form.Select value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
							{this.state.outlets.map(outlet => (
								<option     value={outlet.id_outlet} >{outlet.nama_outlet}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                            
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Modal.Body>
                    </Form>
                </Modal>
                <Modal show={this.state.isModalOpen1} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>FORM EDIT TRANSAKSI</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                        <Form.Group className="mb-2">
                                <Form.Label> id user </Form.Label>
                                <Form.Control type="number" value={this.state.id_user}
                                onChange={ev => this.setState({id_user: ev.target.value})} />
                            </Form.Group>
                        {/* <Form.Group className="mb-2"> 
                             <Form.Label> member </Form.Label> 
                                 <Form.Select value={this.state.id_member} 
                                onChange={ev => this.setState({id_member: ev.target.value})}>
                                    {this.state.member.map(member => (
                                    <option value={member.id_member}>{member.nama}</option>
                                    ))}
                                </Form.Select> 
                             </Form.Group>  */}
                            <Form.Group className="mb-2">
                                <Form.Label>tanggal</Form.Label>
                                <Form.Control type="date" value={this.state.tgl} 
                                onChange={ev => this.setState({tgl: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>batas waktu</Form.Label>
                                <Form.Control type="date" value={this.state.batas_waktu} 
                                onChange={ev => this.setState({batas_waktu: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>tanggal bayar</Form.Label>
                                <Form.Control type="date" value={this.state.tgl_bayar} 
                                onChange={ev => this.setState({tgl_bayar: ev.target.value})} />
                            </Form.Group>
                             <Form.Group className="mb-2"> 
                             <Form.Label> status </Form.Label> 
                                 <Form.Select value={this.state.status} 
                                onChange={ev => this.setState({status: ev.target.value})}>
                                    <option value="status">Pilih Status</option>
                                    <option value="baru">Baru</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">Diambil</option>
                                </Form.Select> 
                             </Form.Group> 
                           
                            <Form.Group className="mb-2">
                            <Form.Label> dibayar </Form.Label>
                                <Form.Select value={this.state.dibayar} 
                                onChange={ev => this.setState({dibayar: ev.target.value})}>
                                    <option value="pilih">Pilih</option>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="belum_dibayar">Belum dibayar</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                            <Form.Label> Nama Member </Form.Label>
                            <Form.Select value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
							{this.state.members.map(member => (
								<option     value={member.id_member} >{member.nama}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        
                            <Form.Group className="mb-2">
                            <Form.Label> Nama Outlet </Form.Label>
                            <Form.Select value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
							{this.state.outlets .map(outlet => (
								<option     value={outlet.id_outlet} >{outlet.nama_outlet}</option>
                                 ))}
                            </Form.Select>
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
