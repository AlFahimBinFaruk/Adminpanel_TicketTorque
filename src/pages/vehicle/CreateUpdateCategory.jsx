import { MDBInput,MDBBtn } from "mdb-react-ui-kit";


//to add,update vehicle
export default function CreateUpdateVehicle() {
    return (
        <div className="create-update-vehicle w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create vehicle</h6>
            <form>
                <MDBInput type="text" label="Enter vehicle" className="mb-3" />

                <MDBBtn block>Update</MDBBtn>

            </form>
        </div>
    )
}