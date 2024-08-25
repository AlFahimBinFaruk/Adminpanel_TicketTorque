import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { MDBInput, MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import { useCreateNewLocationMutation } from '../../services/location_api';

// Define validation schema using Yup
const validationSchema = Yup.object({
    location: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Location name is required'),
});

export default function CreateLocation() {
    const [createNewLocation] = useCreateNewLocationMutation();

    const initialValues = {
        location: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { location } = values;
            await createNewLocation({ name: location }).unwrap();

            toast.success('Location created successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="create-location w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create Location</h6>
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
                                    name="location"
                                    as={MDBInput}
                                    type="text"
                                    label="Enter location"
                                    className="form-control"
                                />
                                <ErrorMessage name="location" component="div" className="text-danger mt-1" />
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
