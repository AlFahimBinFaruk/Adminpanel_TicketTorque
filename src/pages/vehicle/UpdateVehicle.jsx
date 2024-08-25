import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { MDBInput, MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import { useUpdateVehicleMutation, useGetVehicleDetailsQuery } from '../../services/vehicle_api';
import { useParams } from 'react-router-dom';

// Define validation schema using Yup
const validationSchema = Yup.object({
    vehicle: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Vehicle name is required'),
});

export default function UpdateVehicle() {

    const params = useParams();
    const vehicle_id = params.vehicle_id;


    const { data: details, isLoading, error } = useGetVehicleDetailsQuery(vehicle_id);
    const [UpdateVehicle] = useUpdateVehicleMutation();


    const initialValues = {
        vehicle: details?.name || "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { vehicle } = values;
            await UpdateVehicle({ id:vehicle_id,name: vehicle }).unwrap();

            toast.success('Vehicle updated successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || 'An error occurred');
        }
    };



    if (isLoading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>Vehicle fetching error</>;
    }


    return (
        <div className="create-update-vehicle w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create vehicle</h6>
            <MDBCol>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    name="vehicle"
                                    as={MDBInput}
                                    type="text"
                                    label="Enter vehicle"
                                    className="form-control"
                                />
                                <ErrorMessage name="vehicle" component="div" className="text-danger mt-1" />
                            </div>
                            <MDBBtn type="submit" block size="sm">
                                Create
                            </MDBBtn>
                        </Form>
                    )}
                </Formik>
            </MDBCol>
        </div>
    )
}