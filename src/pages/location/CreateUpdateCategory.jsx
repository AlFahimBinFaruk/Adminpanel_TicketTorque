import { MDBInput,MDBBtn } from "mdb-react-ui-kit";


//to add,update location
export default function CreateUpdateLocation() {
    return (
        <div className="create-update-location w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create location</h6>
            <form>
                <MDBInput type="text" label="Enter location" className="mb-3" />

                <MDBBtn block>Update</MDBBtn>

            </form>
        </div>
    )
}