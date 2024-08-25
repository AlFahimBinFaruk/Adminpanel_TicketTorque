import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { MDBInput, MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import { useCreateNewVehicleMutation } from '../../services/vehicle_api';

// Define validation schema using Yup
const validationSchema = Yup.object({
    vehicle: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Vehicle name is required'),
});

export default function CreateVehicle() {
    const [createNewVehicle] = useCreateNewVehicleMutation();

    const initialValues = {
        vehicle: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { vehicle } = values;
            await createNewVehicle({ name: vehicle }).unwrap();

            toast.success('Vehicle created successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="create-vehicle w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create Vehicle</h6>
            <MDBCol>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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
    );
}
