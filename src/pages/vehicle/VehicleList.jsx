import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useDeleteVehicleMutation, useGetVehicleListQuery } from '../../services/vehicle_api';
import { toast } from 'react-toastify';

export default function VehicleList() {
    const { data: details, isLoading, error } = useGetVehicleListQuery();
    const [deleteVehicle] = useDeleteVehicleMutation();

    const handleDeleteVehicle = async (id) => {
        try {
            await deleteVehicle(id).unwrap();
            toast.success("Vehicle deleted successfully.");
            
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || "An error occurred");
        }
    };

    if (isLoading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>Vehicle fetching error</>;
    }



    // console.log("details ", details);


    return (
        <div className="manage-vehicle">
            <Link to="/vehicle/add-new">
                <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            </Link>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>

                        <th scope='col'>Actions</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {details?.vehicles.length > 0 ? <>
                        {details.vehicles.map((data, ind) => (
                            <tr key={ind}>
                                <td>{data.name}</td>

                                <td>
                                    <Link to={`/vehicle/update/${data.id}`}>
                                        <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                    </Link>
                                    <MDBIcon far icon="trash-alt" role="button" color="danger" onClick={() => handleDeleteVehicle(data.id)} />
                                </td>
                            </tr>
                        ))}
                    </> : <p>No data to show..</p>}



                </MDBTableBody>
            </MDBTable>
        </div>
    );
}