import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { MDBInput, MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import { useCreateNewCategoryMutation } from '../../services/category_api';

// Define validation schema using Yup
const validationSchema = Yup.object({
    category: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Category name is required'),
});

export default function CreateCategory() {
    const [createNewCategory] = useCreateNewCategoryMutation();

    const initialValues = {
        category: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { category } = values;
            await createNewCategory({ name: category }).unwrap();

            toast.success('Category created successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="create-category w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Create Category</h6>
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
                                    name="category"
                                    as={MDBInput}
                                    type="text"
                                    label="Enter category"
                                    className="form-control"
                                />
                                <ErrorMessage name="category" component="div" className="text-danger mt-1" />
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
