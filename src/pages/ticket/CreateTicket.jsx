import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { useCreateNewTicketMutation } from "../../services/ticket_api";
import { useGetCategoryListQuery } from "../../services/category_api";
import { useGetLocationListQuery } from "../../services/location_api";
import { useGetVehicleListQuery } from "../../services/vehicle_api";
import { toast } from 'react-toastify';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    vehicle_id: Yup.string().required('Vehicle is required'),
    category_id: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    qty: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
    arrival_date: Yup.date().required('Arrival date is required').typeError('Invalid date format'),
    departure_date: Yup.date().required('Departure date is required').typeError('Invalid date format'),
    boarding_point_name: Yup.string().required('Boarding point is required'),
    dropping_point_name: Yup.string().required('Dropping point is required'),
    from_location_id: Yup.string().required('From location is required'),
    to_location_id: Yup.string().required('To location is required'),
});

export default function CreateTicket() {
    const [createNewTicket] = useCreateNewTicketMutation();
    const { data: categoryData } = useGetCategoryListQuery();
    const { data: locationData } = useGetLocationListQuery();
    const { data: vehicleData } = useGetVehicleListQuery();

    const initialValues = {
        name: '',
        vehicle_id: '',
        category_id: '',
        price: '',
        qty: '',
        arrival_date: '',
        departure_date: '',
        boarding_point_name: '',
        dropping_point_name: '',
        from_location_id: '',
        to_location_id: '',
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        
        try {
            
            await createNewTicket(values).unwrap();
            resetForm();
            toast.success("New ticket added.");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add ticket");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="create-ticket w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create Ticket</h6>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            name="name"
                            as={MDBInput}
                            type="text"
                            id="formName"
                            label="Name"
                            size="sm"
                            className="mb-4"
                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />

                        <div className="mb-3">
                            <p className="mb-0 small">Select Vehicle</p>
                            <Field as="select" name="vehicle_id" className="form-control form-sm">
                                <option value="">Select Vehicle</option>
                                {vehicleData?.vehicles.map(vehicle => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="vehicle_id" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Select Category</p>
                            <Field as="select" name="category_id" className="form-control form-sm">
                                <option value="">Select Category</option>
                                {categoryData?.categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category_id" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Select Arrival Date</p>
                            <Field
                                name="arrival_date"
                                as={MDBInput}
                                type="date"
                                id="formArrivalDate"
                                size="sm"
                                className="mb-4"
                            />
                            <ErrorMessage name="arrival_date" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Select Departure Time</p>
                            <Field
                                name="departure_date"
                                as={MDBInput}
                                type="datetime-local"
                                id="formDepartureDate"
                                size="sm"
                                className="mb-4"
                            />
                            <ErrorMessage name="departure_date" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Starting Point</p>
                            <Field as="select" name="from_location_id" className="form-control form-sm">
                                <option value="">Select Starting Point</option>
                                {locationData?.locations.map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="from_location_id" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Ending Point</p>
                            <Field as="select" name="to_location_id" className="form-control form-sm">
                                <option value="">Select Ending Point</option>
                                {locationData?.locations.map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="to_location_id" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Boarding Point</p>
                            <Field
                                name="boarding_point_name"
                                as={MDBTextArea}
                                id="formBoardingPoint"
                                label="Boarding Point"
                                rows="3"
                                className="mb-4"
                            />
                            <ErrorMessage name="boarding_point_name" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Dropping Point</p>
                            <Field
                                name="dropping_point_name"
                                as={MDBTextArea}
                                id="formDroppingPoint"
                                label="Dropping Point"
                                rows="3"
                                className="mb-4"
                            />
                            <ErrorMessage name="dropping_point_name" component="div" className="text-danger" />
                        </div>

                        <Field
                            name="price"
                            as={MDBInput}
                            type="number"
                            id="formPrice"
                            label="Price"
                            size="sm"
                            className="mb-4"
                        />
                        <ErrorMessage name="price" component="div" className="text-danger" />

                        <Field
                            name="qty"
                            as={MDBInput}
                            type="number"
                            id="formQty"
                            label="Qty"
                            size="sm"
                            className="mb-4"
                        />
                        <ErrorMessage name="qty" component="div" className="text-danger" />

                        <MDBBtn type="submit" className="mb-4" block size="sm" disabled={isSubmitting}>
                            Add Ticket
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
