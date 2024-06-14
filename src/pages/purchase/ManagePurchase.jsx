import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

export default function ManagePurchase() {
    return (
        <div className="manage-purchase">
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Qty</th>
                        <th scope='col'>Total</th>
                        <th scope='col'>Tran Id</th>
                        <th scope='col'>Payment status</th>

                        <th scope='col'>Actions</th>
                       

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>dd33d3ds</td>
                        <td>33</td>
                        <td>343 Tk</td>
                        <td>dd33d3ffffds</td>
                        <td>Pending</td>
                        <td>
                            <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                            <MDBIcon far icon="trash-alt" role="button" color="danger" />
                        </td>
                    </tr>



                </MDBTableBody>
            </MDBTable>
        </div>
    );
}