import { MDBBtn, MDBCard, MDBInput, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, useUpdateOrderMutation } from "../../services/order_api";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import formatDateTimeLocal from "../../helpers/formatDateTimeLocal";

// Validation schema with Yup
const validationSchema = Yup.object({
    order_status: Yup.string()
        .required('Order Status is required'),
    payment_status: Yup.string()
        .required('Payment Status is required'),
});

export default function ManageOrder() {
    const params = useParams();
    const order_id = params.order_id;

    const { data: details, isLoading, error } = useGetOrderDetailsQuery(order_id);
    const [updateOrder] = useUpdateOrderMutation();

    const handleSubmit = async (values, { resetForm }) => {
        const { order_status, payment_status } = values;
        try {
            await updateOrder({ order_id, order_status, payment_status }).unwrap();

            resetForm();
            toast.success("Order details updated successfully");
        } catch (err) {
            console.error('Update error:', err);
            toast.error("Failed to update order details.");
        }
    };

    if (isLoading) {
        return <>Loading..</>
    }

    if (error) {
        return <>Order fetching error</>
    }

    const data = details.ticket;

    return (
        <div className="orderDetails w-50  m-auto my-5">
            <MDBCard className="mb-4">
                <MDBCardBody>
                    <MDBCardTitle className='text-primary'>{data.name}</MDBCardTitle>
                    <MDBCardText className="mb-5">
                        <p>{data.category.name}</p>
                        <p className='mb-0'>
                            <small>
                                <b>Boarding point</b>: {data.boarding_point_name}
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Ending point</b>: {data.dropping_point_name}
                            </small>
                        </p>
                        <p className='mb-0'>
                            <small>
                                <b>Arrival Time</b>: {data.arrival_date}
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Departure Time</b>: {formatDateTimeLocal(data.departure_date)}
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Purchased seats</b>: {details.qty}
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Single Seat Price</b>: {data.price} Tk
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Order status</b>: {details.order_status}
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Payment status</b>: {details.payment_status}
                            </small>
                        </p>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>

            <Formik
                initialValues={{ order_status: details.order_status || '', payment_status: details.payment_status || '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {() => (
                    <Form>
                        <h6>Update Order Details</h6>
                        <div className="mb-3">
                            <Field
                                name="order_status"
                                as={MDBInput}
                                type="text"
                                label="Order Status"
                                size="sm"
                                className="mb-3"
                            />
                            <ErrorMessage name="order_status" component="div" className="text-danger mb-3" />
                        </div>
                        <div className="mb-3">
                            <Field
                                name="payment_status"
                                as={MDBInput}
                                type="text"
                                label="Payment Status"
                                size="sm"
                                className="mb-3"
                            />
                            <ErrorMessage name="payment_status" component="div" className="text-danger mb-3" />
                        </div>
                        <MDBBtn type="submit" size="sm" block>Update Order</MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
