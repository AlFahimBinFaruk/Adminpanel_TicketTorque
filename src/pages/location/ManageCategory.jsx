import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

export default function ManageLocation() {
    return (
        <div className="manage-location">
            <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                
                        <th scope='col'>Actions</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>Chattogram</td>
                        
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