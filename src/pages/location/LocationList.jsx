import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDeleteLocationMutation, useGetLocationListQuery } from "../../services/location_api";
import { toast } from "react-toastify";

export default function LocationList() {
  const { data: details, isLoading, error } = useGetLocationListQuery();

  const [deleteLocation] = useDeleteLocationMutation();


  const handleDeleteLocation = async (id) => {
    try {
      await deleteLocation(id).unwrap();
      toast.success("Location deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err.data?.msg || "An error occurred");
    }
  };

  if (isLoading) {
    return <>Loading..</>;
  }

  if (error) {
    return <>Location fetching error</>;
  }



  // console.log("details ", details);
  return (
    <div className="manage-location">
      <Link to="/location/add-new">
        <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
      </Link>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>

            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {details?.locations.length > 0 ? (
            <>
              {details?.locations.map((data, ind) => (
                <tr key={ind}>
                  <td>{data.name}</td>

                  <td>
                    <Link to={`/location/update/${data.id}`}>
                      <MDBIcon
                        far
                        icon="edit"
                        role="button"
                        className="me-2"
                        color="warning"
                      />
                    </Link>
                    <MDBIcon
                      far
                      icon="trash-alt"
                      role="button"
                      color="danger"
                      onClick={()=>handleDeleteLocation(data.id)}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p>No data to show.</p>
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
