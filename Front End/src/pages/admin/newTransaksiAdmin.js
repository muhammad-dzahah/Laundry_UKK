import React, { Component } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";

export default class NewTransaksiAdmin extends Component {
  constructor() {
    super();
    this.state = {
      id_member: 0,
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      status: "baru",
      dibayar: 2,
      id_user: "",
      id_outlet: 0,
      detail_transaksi: [],
      members: [],
      users: [],
      pakets: [],
      outlets: [],
      id_paket: "",
      qty: 0,
      jenis_paket: "",
      harga: 0,
      action: "",
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  getMember() {
    let url = "http://localhost:4040/api/member"
    axios.get(url)
      .then((response) => this.setState({ members: response.data.data }))
      .catch((error) => console.log(error));
  }

  getUser() {
    let url = "http://localhost:4040/api/user"
    axios.get(url)
      .then((response) => this.setState({ users: response.data.data }))
      .catch((error) => console.log(error));
  }

  getPaket() {
    let url = "http://localhost:4040/api/paket"
    axios.get(url)
      .then((response) => this.setState({ pakets: response.data.data }))
      .catch((error) => console.log(error));
  }

  getOutlet() {
      let url = "http://localhost:4040/api/outlet"
      axios.get(url)
      .then((response) => this.setState({ outlets: response.data.data})) 
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.getMember();
    this.getUser();
    this.getPaket();
    this.getOutlet();
  }

  tambahPaket(event) {
    event.preventDefault();
    this.modal.hide();
    let idPaket = this.state.id_paket;
    let list_paket = this.state.pakets;
    let selectedPaket = list_paket.find(
      ({ id_paket }) => id_paket === parseInt(idPaket)
    );

    console.log(selectedPaket);
    let newPaket = {
      id_paket: this.state.id_paket,
      qty: this.state.qty,
      jenis: selectedPaket.jenis,
      harga: selectedPaket.harga,
    };

    let temp = this.state.detail_transaksi;
    temp.push(newPaket);
    this.setState({ detail_transaksi: temp });
    console.log(temp);
  }

  addPaket() {
    this.modal = new Modal(document.getElementById("modal_paket"));
    this.modal.show();

    this.setState({
      id_paket: "",
      qty: 0,
      jenis: "",
      harga: 0,
      action: "tambah",
    });
  }

  editPaket() {
    this.modal = new Modal(document.getElementById("modal_paket"));
    this.modal.show();
    this.setState({
      id_paket: "",
      qty: 0,
      jenis: "",
      harga: 0,
      action: "edit",
    });
  }

  hapusPaket(id_paket) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
      //mencari posisi index dari data yang akan dihapus
      console.log(id_paket);
      let temp = this.state.detail_transaksi;
      let index = temp.findIndex((detail) => detail.id_paket === id_paket);

      //menghapus data pada array
      temp.splice(index, 1);

      this.setState({ detail_transaksi: temp });
    }
  }

  simpanTransaksi() {
    if (document.getElementById("member").value === 0) {
      window.alert("Tolong lengkapi data Member");
      return;
    }
    if (document.getElementById("tgl").value === "") {
      window.alert("Tolong lengkapi data tanggal transaksi");
      return;
    }
    if (document.getElementById("batas_waktu").value === "") {
      window.alert("Tolong lengkapi data batas waktu");
      return;
    }
    if (document.getElementById("tgl_bayar").value === "") {
      window.alert("Tolong lengkapi data tanggal bayar");
      return;
    }
    if (document.getElementById("status_bayar").value === 2) {
      window.alert("Tolong lengkapi data tanggal bayar");
      return;
    }
    if (this.state.detail_transaksi.length === 0) {
      window.alert("Tolong lengkapi data paket");
      return;
    }

    let url = "http://localhost:4040/api/transaksi/"
    let user = JSON.parse(localStorage.getItem("admin"));
    console.log(user)
    let data = {
      id_user: user.id_user,
      id_outlet: this.state.id_outlet,
      id_member: this.state.id_member,
      tgl: this.state.tgl,
      batas_waktu: this.state.batas_waktu,
      tgl_bayar: this.state.tgl_bayar,
      status: this.state.status,
      dibayar: this.state.dibayar,
      detail_transaksi: this.state.detail_transaksi,
    };

    axios
      .post(url, data)
      .then((response) => {
        window.alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card my-4 col-lg-6 col-md-10 col-sm-10">
        <Button className="btn btn-success mt-3 mb-5 mx-4" href="/transaksiAdmin">
          Back to list
        </Button>
        <h3 className="text-black text-center">Form New Transaksi</h3>
          <div className="card-body mx-2">
            Outlet
              <select
                id="outlet"
                className="form-control mb-2"
                value={this.state.id_outlet}
                onChange={(e) => this.setState({ id_outlet: e.target.value })}
              >
                    <option defaultValue={""} hidden>Pilih Outlet</option>
                {this.state.outlets.map((outlet) => (
                    <option value={outlet.id_outlet}>{outlet.lokasi}</option>
                ))}
              </select>
            Member
            <select
              id="member"
              className="form-control mb-2"
              value={this.state.id_member}
              onChange={(e) => this.setState({ id_member: e.target.value })}
            >
                <option defaultValue={""} hidden>Pilih Member</option>
              {this.state.members.map((member) => (
                <option value={member.id_member}>{member.nama}</option>
              ))}
            </select>
            Tanggal Transaksi
            <input
              id="tgl"
              type="date"
              className="form-control mb-2"
              value={this.state.tgl}
              onChange={(e) => this.setState({ tgl: e.target.value })}
            />
            Batas Waktu
            <input
              id="batas_waktu"
              type="date"
              className="form-control mb-2"
              value={this.state.batas_waktu}
              onChange={(e) => this.setState({ batas_waktu: e.target.value })}
            />
            Tanggal Bayar
            <input
              id="tgl_bayar"
              type="date"
              className="form-control mb-2"
              value={this.state.tgl_bayar}
              onChange={(e) => this.setState({ tgl_bayar: e.target.value })}
            />
            Status Bayar
            <select
              id="status_bayar"
              className="form-control mb-2"
              value={this.state.bayar}
              onChange={(e) => this.setState({ dibayar: e.target.value })}
            >
              <option value={2} hidden>
                Pilih status pembayaran
              </option>
              <option value={1}>Sudah Dibayar</option>
              <option value={0}>Belum Dibayar</option>
            </select>
            <div className="row gap-2 mx-1 my-3">
              <button
                className="btn btn-primary"
                onClick={() => this.simpanTransaksi()}
              >
                Simpan Transaksi
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => this.addPaket()}
              >
                Tambah Paket
              </button>
            </div>
            <hr />
            <h5>Detail Transaksi</h5>
            {this.state.detail_transaksi.map((detail) => (
              <div className="row">
                <div className="col-lg-4">
                  <h6 className="text-secondary">Jenis Paket</h6>
                  {detail.jenis}
                </div>
                <div className="col-lg-2">
                  <h6 className="text-secondary">Qty</h6>

                  {detail.qty}
                </div>
                <div className="col-lg-3">
                  <h6 className="text-secondary">Harga paket</h6>
                  Rp {detail.harga}
                </div>
                <div className="col-lg-3">
                  <h6 className="text-secondary">Harga Total</h6>
                  Rp {detail.harga * detail.qty}
                </div>
                <br/>
                <div className="col-lg-12 mt-2">
                  <div className="btn-group d-flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.editPaket()}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.hapusPaket(detail.id_paket)}
                    >
                      Hapus
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            ))}
            {/* Modal Paket */}
            <div className="modal modal-fade fade" id="modal_paket">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="">Pilih Paket</h4>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(ev) => this.tambahPaket(ev)}>
                      Jenis Paket
                      <select
                        className="form-control mb-2"
                        value={this.state.id_paket}
                        onChange={(e) =>
                          this.setState({ id_paket: e.target.value })
                        }
                      >
                        <option defaultValue={""} hidden>
                          Pilih Paket
                        </option>
                        {this.state.pakets.map((paket) => (
                          <option value={paket.id_paket}>
                            {paket.jenis}
                          </option>
                        ))}
                      </select>
                      Jumlah (Qty)
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={this.state.qty}
                        onChange={(e) => this.setState({ qty: e.target.value })}
                      />
                      <button className="btn btn-success" type="submit">
                        Tambah
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
