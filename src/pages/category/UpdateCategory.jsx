import { MDBInput, MDBBtn, MDBCol } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "../../services/category_api";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  category: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Category name is required"),
});

export default function UpdateCategory() {
  const params = useParams();
  const category_id = params.category_id;
  const {
    data: details,
    isLoading,
    error,
  } = useGetCategoryDetailsQuery(category_id);

  const [updateCategory] = useUpdateCategoryMutation();

  const initialValues = {
    category: details?.name || "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { category } = values;
      await updateCategory({ id: category_id, name: category }).unwrap();

      toast.success("Category updated successfully");
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
    <div className="update-category w-50 m-auto mt-5">
      <h6 className="text-center mb-4">Update Category</h6>
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
                  name="category"
                  as={MDBInput}
                  type="text"
                  label="Enter category"
                  className="form-control"
                />
                <ErrorMessage
                  name="category"
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
