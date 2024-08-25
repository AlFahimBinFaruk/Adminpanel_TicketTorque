import React, { useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useDeleteTicketMutation, useGetTicketListQuery } from '../../services/ticket_api';
import { toast } from 'react-toastify';



export default function TicketList() {
    const [page, setPage] = useState(1);
    const { data: details, isLoading, error } = useGetTicketListQuery({ page });

    const [deleteTicket] = useDeleteTicketMutation();


    const handleDeleteTicket = async (id) => {
        try {
            await deleteTicket(id).unwrap();
            toast.success("Ticket deleted successfully.");
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || "An error occurred");
        }
    };


    if (isLoading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>Ticket fetching error</>;
    }

    const { results, count, next, previous } = details;
    const totalPages = Math.ceil(count / 10); // Assuming 10 items per page



    const handlePageChange = (pageNum) => {
        if (pageNum > 0 && pageNum <= totalPages) {
            setPage(pageNum);
        }
    };

    return (
        <div className="manage-ticket">
            <Link to="/ticket/add-new"><MDBBtn className="ms-auto mb-5">Add New</MDBBtn></Link>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Vehicle</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Arrival Date</th>
                        <th scope='col'>Departure Date</th>
                        <th scope='col'>Starting Point</th>
                        <th scope='col'>Boarding Point</th>
                        <th scope='col'>Ending Point</th>
                        <th scope='col'>Dropping Point</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Qty</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {results.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.name}</td>
                            <td>{ticket.vehicle.name}</td>
                            <td>{ticket.category.name}</td>
                            <td>{new Date(ticket.arrival_date).toLocaleDateString()}</td>
                            <td>{new Date(ticket.departure_date).toLocaleString()}</td>
                            <td>{ticket.from_location.name}</td>
                            <td>{ticket.boarding_point_name}</td>
                            <td>{ticket.to_location.name}</td>
                            <td>{ticket.dropping_point_name}</td>
                            <td>{ticket.price} Tk</td>
                            <td>{ticket.qty}</td>
                            <td>
                                <Link to={`/ticket/update/${ticket.id}`}>
                                    <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                </Link>
                                <MDBIcon far icon="trash-alt" role="button" color="danger" onClick={() => handleDeleteTicket(ticket.id)} />
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
            <div className="pagination">
                <MDBBtn
                    onClick={() => handlePageChange(page - 1)}
                    disabled={!previous}
                    size="sm"
                    className="me-2"
                >
                    Previous
                </MDBBtn>
                <span>Page {page} of {totalPages}</span>
                <MDBBtn
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!next}
                    size="sm"
                    className="ms-2"
                >
                    Next
                </MDBBtn>
            </div>
        </div>
    );
}
