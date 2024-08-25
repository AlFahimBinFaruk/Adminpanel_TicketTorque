import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="mt-3 vh-100">
            <h5 className="text-center">Plaza</h5>

            <div className="custom-sidebar-menus ms-3 mt-5">
                <Link to="/"><h6>Dashboard</h6></Link>
                <Link to="/user-list"><h6>Manage User </h6></Link>
                <Link to="/category-list"><h6>Manage Category</h6></Link>
                <Link to="/vehicle-list"><h6>Manage Vehicle</h6></Link>
                <Link to="/location-list"><h6>Manage Location</h6></Link>
                <Link to="/ticket-list"><h6>Manage Ticket</h6></Link>
                <Link to="/order-list"><h6>Manage Order</h6></Link>
            </div>
        </div>
    )
}