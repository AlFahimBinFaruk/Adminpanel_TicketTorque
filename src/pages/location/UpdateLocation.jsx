import { MDBInput, MDBBtn,MDBCol } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import {
    useGetLocationDetailsQuery,
    useUpdateLocationMutation,
} from "../../services/location_api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

const validationSchema = Yup.object({
    location: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Location name is required"),
});

export default function UpdateLocation() {
    const params = useParams();
    const location_id = params.location_id;

    const {
        data: details,
        isLoading,
        error,
    } = useGetLocationDetailsQuery(location_id);

    const [updateLocation] = useUpdateLocationMutation();

    const initialValues = {
        location: details?.name || "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { location } = values;
            await updateLocation({ id: location_id, name: location }).unwrap();

            toast.success("Location updated successfully");
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || "An error occurred");
        }
    };

    if (isLoading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>Category fetching error</>;
    }

    return (
        <div className="update-location w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Update location</h6>
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
                                    name="location"
                                    as={MDBInput}
                                    type="text"
                                    label="Enter location"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="location"
                                    component="div"
                                    className="text-danger mt-1"
                                />
                            </div>
                            <MDBBtn type="submit" block size="sm">
                                Update
                            </MDBBtn>
                        </Form>
                    )}
                </Formik>
            </MDBCol>
        </div>
    );
}
