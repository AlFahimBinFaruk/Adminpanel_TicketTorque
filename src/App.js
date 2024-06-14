import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ManageCategory from './pages/category/ManageCategory';
import CreateUpdateCategory from './pages/category/CreateUpdateCategory';
import ManageVehicle from './pages/vehicle/ManageCategory';
import ManageLocation from './pages/location/ManageCategory';
import ManageUser from './pages/user/ManageUser';
import CreateUpdateUser from './pages/user/CreateUpdateUser';
import ManageTicket from './pages/ticket/ManageTicket';
import CreateUpdateTicket from './pages/ticket/CreateUpdateTicket';
import ManagePurchase from './pages/purchase/ManagePurchase';
import UpdatePurchase from './pages/purchase/UpdatePurchase';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      
      <div className="admin-panel">

        <div className="custom-sidebar">
          <Sidebar/>
        </div>
        <div className="main-content">
          <nav className="custom-navbar">
            <Navbar/>
          </nav>
          <div className="custom-content">

            {/* <ManageCategory/> */}
            {/* <CreateUpdateCategory/> */}

            {/* <ManageVehicle/> */}

            {/* <ManageLocation/> */}

            {/* <ManageUser/> */}
            {/* <CreateUpdateUser/> */}

            <ManageTicket/>
            {/* <CreateUpdateTicket/> */}

            {/* <ManagePurchase/> */}

            {/* <UpdatePurchase/> */}
            
          </div>
        </div>
      </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
