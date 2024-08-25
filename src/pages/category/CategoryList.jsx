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
import {
  useDeleteCategoryMutation,
  useGetCategoryListQuery,
} from "../../services/category_api";
import { toast } from "react-toastify";

export default function CategoryList() {
  const { data: details, isLoading, error } = useGetCategoryListQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err.data?.msg || "An error occurred");
    }
  };

  if (isLoading) {
    return <>Loading..</>;
  }

  if (error) {
    return <>Category fetching error</>;
  }

  //   console.log("details ", details);

  return (
    <div className="manage-category">
      <Link to="/category/add-new">
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
          {details?.categories.length > 0 ? (
            <>
              {details.categories.map((data, ind) => (
                <tr key={ind}>
                  <td>{data.name}</td>

                  <td>
                    <Link to={`/category/update/${data.id}`}>
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
                      onClick={() => handleDeleteCategory(data.id)}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p>Nothing to show.</p>
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
