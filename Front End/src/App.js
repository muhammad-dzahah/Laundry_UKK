import './App.css';
import React from "react"
//import react router dom
import {Route, Switch} from "react-router-dom"
//importp pages
import LoginAdmin from './pages/loginAdmin';
import HomeAdmin from './pages/admin/homeAdmin';
import LoginKasir from './pages/loginKasir';
import HomeKasir from './pages/kasir/homeKasir';
import LoginOwner from './pages/loginOwner';
import HomeOwner from './pages/owner/homeOwner';
import MemberAdmin from './pages/admin/memberAdmin';
import UserAdmin from './pages/admin/userAdmin';
import OutletAdmin from './pages/admin/outletAdmin';
import PaketAdmin from './pages/admin/paketAdmin';
import TransaksiAdmin from './pages/admin/transaksiAdmin';
import MemberKasir from './pages/kasir/memberKasir';
import PaketKasir from './pages/kasir/paketKasir';
import TransaksiKasir from './pages/kasir/transaksiKasir';
import MemberOwner from './pages/owner/memberOwner';
import UserOwner from './pages/owner/userOwner';
import PaketOwner from './pages/owner/paketOwner';
import OutletOwner from './pages/owner/outletOwner';
import TransaksiOwner from './pages/owner/transaksiOwner';
import LaporanAdmin from './pages/admin/laporanAdmin';
import NewTransaksiAdmin from './pages/admin/newTransaksiAdmin';
import LaporanKasir from './pages/kasir/laporanKasir';
import NewTransaksiKasir from './pages/kasir/newTransaksiKasir';

class App extends React.Component{
  render(){
    return (
      <Switch>
        {/* admin */}
        <Route exact path="/"     component={LoginAdmin} />
        <Route path="/homeAdmin" component={HomeAdmin} />
        <Route path="/memberAdmin" component={MemberAdmin} />
        <Route path="/userAdmin" component={UserAdmin} />
        <Route path="/outletAdmin" component={OutletAdmin} />
        <Route path="/paketAdmin" component={PaketAdmin} />
        <Route path="/transaksiAdmin" component={TransaksiAdmin} />
        <Route path="/newTransaksiAdmin" component={NewTransaksiAdmin} />
        <Route path="/laporanAdmin" component={LaporanAdmin} />
        {/* kasir */}
        <Route path="/loginKasir" component={LoginKasir} />
        <Route path="/homeKasir" component={HomeKasir} />
        <Route path="/memberKasir" component={MemberKasir} />
        <Route path="/paketKasir" component={PaketKasir} />
        <Route path="/transaksiKasir" component={TransaksiKasir} />
        <Route path="/newTransaksiKasir" component={NewTransaksiKasir} />
        <Route path="/laporanKasir" component={LaporanKasir} />
        {/* owner */}
        <Route path="/loginOwner" component={LoginOwner} />
        <Route path="/homeOwner" component={HomeOwner} />
        <Route path="/memberOwner" component={MemberOwner} />
        <Route path="/userOwner" component={UserOwner} />
        <Route path="/outletOwner" component={OutletOwner} />
        <Route path="/paketOwner" component={PaketOwner} />
        <Route path="/transaksiOwner" component={TransaksiOwner} />
      </Switch>  
    );
  }
}

export default App;