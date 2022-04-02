import React from "react";

export default class NavbarOwner extends React.Component{
    Logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("owner")
        window.location="/"
    }
    render(){
        return (
        <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-lg">
                {/* Navbar brand */}
                <div className="navbar-brand" href="/home">
                    <strong>Laun-Dry</strong>
                </div>
                {/* tombol dropdown responsive */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* navbar items */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/homeOwner">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/memberOwner">Member</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/userOwner">User</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/outletOwner">Outlet</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/paketOwner">Paket</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/transaksiOwner">Trasnsaksi</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => this.Logout()}>Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        )
    }
}

