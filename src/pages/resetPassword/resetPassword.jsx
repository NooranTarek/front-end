import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { resetPassword } from '../../axios/user.axios';

function ResetPassword() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      new_password: '',
      code:''
    //   subscriptions: [],
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email format'),
      new_password: Yup.string().min(8, 'Password must be at least 8 characters'),
      code: Yup.string().required('Code is required')

    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await resetPassword(values)
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: 'Code checked and password changed successfully !!',
              timer: 2000,
            });
            navigate('/register');
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              text: err.response.data.message,
              timer: 2000,
            });
          });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{
                      borderTopLeftRadius: '.25rem',
                      borderBottomLeftRadius: '.25rem',
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">User registration form</h3>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">{formik.errors.email}</div>
                        )}
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="code"
                          id="code"
                          className="form-control form-control-lg"
                          placeholder="Code"
                          {...formik.getFieldProps('code')}
                        />
                        {formik.touched.code && formik.errors.code && (
                          <div className="text-danger">{formik.errors.code}</div>
                        )}
                        <label className="form-label" htmlFor="code">
                          Code
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="New Password"
                          {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">{formik.errors.password}</div>
                        )}
                        <label className="form-label" htmlFor="password">
                          New Password
                        </label>
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                          disabled={isLoading}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
