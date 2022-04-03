import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BiDetail } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr" 
import NavbarKasir from "../../component/navbarKasir";

export default class TransaksiKasir extends React.Component {
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
            outlet: "",
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
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.user)
    }
    getMember = async () => {
        let url = "http://localhost:4040/api/member"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({member: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.member)
    }
    getPaket = async () => {
        let url = "http://localhost:4040/api/paket"
        await axios.get(url, this.headerConfig())    
        .then(response => { 
            this.setState({paket: response.data.data})
            // console.log(response)
        })
        .catch(error => {
                console.log(error);
        })
        // console.log(this.state.paket)
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
        // console.log(this.state.outlet)
    }
    
    getUsers = () => {
        let kasir = JSON.parse(localStorage.getItem('kasir'))
        this.setState({id_user: kasir.id_user})
    }
    componentDidMount = () => {
        this.getTransaksiIdOutlet()
        this.getMember()
        this.getUsers()
        this.getPaket()
        this.getUser()
        this.getOutlet()
    }
    handleAdd = () =>{
        this.setState({
            id_transaksi: 0,
            id_member: "",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"baru",
            dibayar:"",
            id_user: this.state.id_user,
            id_outlet:"",
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
            isModalOpen1: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:4040/api/transaksi"
        let form = {
                id_transaksi: this.state.id_transaksi,
                id_member: this.state.id_member,
                tgl: this.state.tgl,
                batas_waktu: this.state.batas_waktu,
                tgl_bayar: this.state.tgl_bayar,
                status: this.state.status,
                dibayar: this.state.dibayar,
                id_user: this.state.id_user,
                id_outlet: this.state.id_outlet
            }
        
        if(this.state.action === "insert"){
            axios.post(url, form,this.headerConfig())
            .then(response => { 
                window.alert("success")
                this.getTransaksiIdOutlet()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form,this.headerConfig())
            .then(response => {
                window.alert(response.data)
                this.getTransaksiIdOutlet()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_transaksi) => {
        let url = "http://localhost:4040/api/transaksi/" + id_transaksi
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url,this.headerConfig())
          .then(response => {
            this.getTransaksiIdOutlet();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false,
            isModalOpen1: false
        })
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
    render() {
        return (
            <div>
                <NavbarKasir />
                <Container className="my-4">
                    <Card className="card">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List Transaksi
                            </h2>
                            <br />
                            <div className="">
                                <Button className="btn btn-success my-3 mx-3" href="/newTransaksiKasir">
                                    New Transaksi
                                </Button>
                                <Button className="btn btn-danger my-3 mx-3" href="/laporanKasir">
                                    to Report Page
                                </Button>
                            </div>
                            <div className="mx-3 my-3">
                                <Form.Select id= "mySelect" onChange={ev => this.setState({outlet: ev.target.value})} onClick={this.getTransaksiIdOutlet}>
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
                                        <div className="col-lg-3">
                                            <small className="text-secondary">User :</small> <br />
                                            <h6>{transaksi.user.nama}</h6>
                                        </div>                                       
                                        
                                        <hr />
                                        <div className="col-lg-9">
                                            <small className="text-secondary">
                                                Detail Transaksi
                                            </small> 
                                            <br />
                                            {transaksi.detail_transaksi.map(detail => (
                                                <strong className="row  text-muted">
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
                                            <button className="btn btn-sm btn-warning m-2" onClick={() => this.handleEdit(transaksi)}>
                                                <AiFillEdit style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(transaksi.id_transaksi)}>
                                                <ImCross style={{color: "white"}}/>
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
                        <Modal.Title>New Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label> User Name </Form.Label>
                                <Form.Select id= "mySelect" value={this.state.idUser} onChange={ev => this.setState({id_user: ev.target.value})} disabled>
                                    {this.state.user.map(user => (
                                        <option value={user.id_user} hidden> {user.username}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Member Name </Form.Label>
                                <Form.Select value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Choose Member</option>
                                {this.state.member.map(member => (
                                    <option value={member.id_member} >{member.nama}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={this.state.tgl} 
                                onChange={ev => this.setState({tgl: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control type="date" value={this.state.batas_waktu} 
                                onChange={ev => this.setState({batas_waktu: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Payment Date</Form.Label>
                                <Form.Control type="date" value={this.state.tgl_bayar} 
                                onChange={ev => this.setState({tgl_bayar: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Choose Item  </Form.Label>
                                <Form.Select id= "mySelect" value={this.state.id_paket} onChange={ev => this.setState({id_paket: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Choose Item</option>
                                        {this.state.paket.map(paket => (
                                        <option value={paket.id_paket}> {paket.jenis}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Payment </Form.Label>
                                <Form.Select value={this.state.dibayar} 
                                onChange={ev => this.setState({dibayar: ev.target.value})}>
                                    <option value="pilih">Choose</option>
                                    <option value="dibayar">Paid</option>
                                    <option value="belum_dibayar">Not yet paid</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> Pilih Outlet </Form.Label>
                                <Form.Select id= "mySelect" value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Choose Outlet</option>
							{this.state.outlets.map(outlet => (
								<option value={outlet.id_outlet}>{outlet.lokasi}</option>
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