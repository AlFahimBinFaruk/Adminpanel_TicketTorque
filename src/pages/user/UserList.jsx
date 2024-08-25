import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { useGetUserListQuery } from "../../services/user_api";

export default function UserList() {
    const [page, setPage] = useState(1);
    const { data: details, isLoading, error } = useGetUserListQuery({ page });

    if (isLoading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>User fetching error.</>;
    }

    const { results, count, next, previous } = details;
    const totalPages = Math.ceil(count / 10); // Assuming 10 items per page

    const handlePageChange = (pageNum) => {
        setPage(pageNum);
    };

    return (
        <div className="manage-user">
            {/* <MDBBtn className="ms-auto mb-5">Add New</MDBBtn> */}
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>First name</th>
                        <th scope='col'>Last name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {results.map(user => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                <MDBIcon far icon="trash-alt" role="button" color="danger" />
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
