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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                  <Route path="/manage-vehicle" element={<VehicleList />} />
                  <Route path="/vehicle/add-new" element={<CreateVehicle />} />
                  <Route
                    path="/vehicle/update/:location_id"
                    element={<UpdateVehicle />}
                  />
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
