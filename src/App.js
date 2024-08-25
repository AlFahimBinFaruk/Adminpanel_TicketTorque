import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import CategoryList from "./pages/category/CategoryList";
import UpdateCategory from "./pages/category/UpdateCategory";
import CreateCategory from "./pages/category/CreateCategory";
import LocationList from "./pages/location/LocationList";
import CreateLocation from "./pages/location/CreateLocation";
import UpdateLocation from "./pages/location/UpdateLocation";
import VehicleList from "./pages/vehicle/VehicleList";
import CreateVehicle from "./pages/vehicle/CreateVehicle";
import UpdateVehicle from "./pages/vehicle/UpdateVehicle";
import { useGetMyProfileQuery } from "./services/user_api";
import Login from "./pages/Login";


import UserList from "./pages/user/UserList";
import TicketList from "./pages/ticket/TicketList";
import CreateTicket from "./pages/ticket/CreateTicket";
import UpdateTicket from "./pages/ticket/UpdateTicket";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderList from "./pages/order/OrderList";
import ManageOrder from "./pages/order/ManageOrder";

function App() {
  const { data: details, isLoading, error } = useGetMyProfileQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        {details && details.email ? (
          <div className="admin-panel">
            <div className="custom-sidebar">
              <Sidebar />
            </div>
            <div className="main-content">
              <nav className="custom-navbar">
                <Navbar />
              </nav>
              <div className="custom-content">
                <Routes>
                  {/* user */}
                  <Route path="/user-list" element={<UserList />} />

                  {/* category */}
                  <Route path="/category-list" element={<CategoryList />} />
                  <Route
                    path="/category/add-new"
                    element={<CreateCategory />}
                  />
                  <Route
                    path="/category/update/:category_id"
                    element={<UpdateCategory />}
                  />

                  {/* location */}
                  <Route path="/location-list" element={<LocationList />} />
                  <Route
                    path="/location/add-new"
                    element={<CreateLocation />}
                  />
                  <Route
                    path="/location/update/:location_id"
                    element={<UpdateLocation />}
                  />

                  {/* vehicle */}
                  <Route path="/vehicle-list" element={<VehicleList />} />
                  <Route path="/vehicle/add-new" element={<CreateVehicle />} />
                  <Route
                    path="/vehicle/update/:vehicle_id"
                    element={<UpdateVehicle />}
                  />

                  {/* ticket */}
                  <Route path="/ticket-list" element={<TicketList/>}/>
                  <Route path="/ticket/add-new" element={<CreateTicket/>}/>
                  <Route path="/ticket/update/:ticket_id" element={<UpdateTicket/>}/>

                  {/* order */}
                  <Route path="/order-list" element={<OrderList/>}/>
                  <Route path="/manage-order/:order_id" element={<ManageOrder/>}/>

                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
