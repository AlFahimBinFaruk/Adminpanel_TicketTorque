import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

export default function ManageTicket() {
    return (
        <div className="manage-ticket">
            <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Vehicle</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Departure Time</th>
                        <th scope='col'>Starting Point</th>
                        <th scope='col'>Boarding Point</th>
                        <th scope='col'>Ending Point</th>
                        <th scope='col'>Droping Point</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Qty</th>

                        <th scope='col'>Actions</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>Saint martin Hyndai</td>
                        <td>Bus</td>
                        <td>Non Ac</td>
                        <td>03 june,2023, 12:00 pm</td>
                        <td>04 june,2023, 12:00 pm</td>
                        <td>Chattogram</td>
                        <td>Dumpara Bus station</td>
                        <td>Dhaka</td>
                        <td>Dhaka Bus station</td>
                        <td>343 Tk</td>
                        <td>33</td>
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