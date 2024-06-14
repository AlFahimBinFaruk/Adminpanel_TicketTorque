import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';

export default function UpdatePurchase() {

    return (
        <div className="w-50 m-auto my-5">
            <h4 className='text-primary'>Saintmartin Hyundai (Robi Express)</h4>
            <div className="mb-5">
                <p>28, Sleeper Premium AC, AC</p>
                <p className='mb-0'>
                    <small>
                        <b>Starting point</b>: Chittagong
                    </small>
                </p>
                <p className='mb-0'>
                    <small>
                        <b>Boarding point</b>: Dumpara bus station.
                    </small>
                </p>
                <p className='mb-0'>
                    <small>
                        <b>Dropping point</b>: Dumpara bus station.
                    </small>
                </p>
                <p>
                    <small>
                        <b>Ending point</b>: Dhaka
                    </small>
                </p>
                <p className='mb-0'>
                    <small>
                        <b>Arrival Time</b>: 12:15 AM
                    </small>
                </p>
                <p>
                    <small>
                        <b>Departure Time</b>: 02:15 AM
                    </small>
                </p>
                <p>
                    <small>
                        <b>Seats Booked</b>: 88
                    </small>
                </p>

                <p>
                    <small>
                        <b>Total</b>: 2344 Tk
                    </small>
                </p>
                <p>
                    <small>
                        <b>Transaction id</b>: 4234jljldfdodd3
                    </small>
                </p>

            </div>




            <div className="form">

                <div className="mb-3">
                    <p className="mb-0 small">Payment Staus</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="Train">Pending</option>
                        <option value="Bus">Confirmed</option>
                    </select>
                </div>

                <MDBBtn block size="sm" color="warning">Update</MDBBtn>
            </div>




        </div>
    )
}