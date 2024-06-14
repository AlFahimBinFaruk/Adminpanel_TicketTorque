import { MDBInput,MDBBtn } from "mdb-react-ui-kit";


//to add,update category
export default function CreateUpdateCategory() {
    return (
        <div className="create-update-category w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create Category</h6>
            <form>
                <MDBInput type="text" label="Enter category" className="mb-3" />

                <MDBBtn block>Update</MDBBtn>

            </form>
        </div>
    )
}