import { MDBBtn, MDBInput, MDBTextArea, MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function CreateUpdateTicket() {
    return (
        <div className="create-update-ticket w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create ticket</h6>
            <form>
                <MDBInput className='mb-4' type='name' id='form3Example3' label='Name' size='sm' />
                
                <div className="mb-3">
                    <p className="mb-0 small">Select Vehicle</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">Train</option>
                        <option value="Bus">Bus</option>
                    </select>
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Select Category</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">AC</option>
                        <option value="Bus">Non AC</option>
                    </select>
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Select Date</p>
                    <MDBInput className='mb-4' type='date' id='form3Example4'  size='sm' />
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Select Departure time</p>
                    <MDBInput className='mb-4' type='datetime-local' id='form3Example4'  size='sm' />
                </div>

                


                <div className="mb-3">
                    <p className="mb-0 small">Starting Point</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">Dhaka</option>
                        <option value="Bus">Chattogram</option>
                    </select>
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Ending Point</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">Dhaka</option>
                        <option value="Bus">Chattogram</option>
                    </select>
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Boarding Point</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">Dhaka</option>
                        <option value="Bus">Chattogram</option>
                    </select>
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Dropping Point</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">Dhaka</option>
                        <option value="Bus">Chattogram</option>
                    </select>
                </div>


                <MDBInput className='mb-4' type='number' id='form3Example4' label='Price' size='sm' />

                <MDBInput className='mb-4' type='number' id='form3Example4' label='Qty' size='sm' />



                <MDBBtn type='submit' className='mb-4' block size='sm'>
                    Add ticket
                </MDBBtn>


            </form>
        </div>
    )
}