import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { useGetAllOrderListQuery } from '../../services/order_api';
import { Link } from 'react-router-dom';

export default function OrderList() {
    const { data: details, isLoading, error } = useGetAllOrderListQuery();

    if (isLoading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>Category fetching error</>;
    }

    console.log("details ", details);
    return (
        <div className="order-list">
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Payment status</th>

                        <th scope='col'>Actions</th>


                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {details?.results.length > 0 ? <>

                        {details.results.map((data, ind) => (
                            <tr key={ind}>
                                <td>
                                    <Link to={`/manage-order/${data.id}`}>{data.id}</Link>
                                </td>
                                <td>{data.payment_status}</td>
                                <td>
                                    <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                    <MDBIcon far icon="trash-alt" role="button" color="danger" />
                                </td>
                            </tr>
                        ))}
                    </> : <p>No data to show.</p>}



                </MDBTableBody>
            </MDBTable>
        </div>
    );
}