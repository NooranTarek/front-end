import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { userRegister } from '../../axios/user.axios';
import './register.css';
function Register() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirm_password: '',
    //   subscriptions: [],
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required').min(3).max(50),
      email: Yup.string().required('Email is required').email('Invalid email format'),
      password: Yup.string().min(8, 'Password must be at least 8 characters'),
      confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match"),
    //   subscriptions: Yup.array().of(Yup.string().required('Subscription is required')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await userRegister(values)
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: 'Registered successfully !!',
              timer: 2000,
            });
            navigate('/login');
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
    <section id='sec' className="h-100 ">
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
                          type="text"
                          id="fullName"
                          className="form-control form-control-lg"
                          placeholder="Full Name"
                          {...formik.getFieldProps('fullName')}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                          <div className="text-danger">{formik.errors.fullName}</div>
                        )}
                        <label className="form-label" htmlFor="fullName">
                          Full Name
                        </label>
                      </div>
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
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">{formik.errors.password}</div>
                        )}
                        <label className="form-label" htmlFor="password">
                        Password
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="confirm_password"
                          className="form-control form-control-lg"
                          placeholder="Confirm Password"
                          {...formik.getFieldProps('confirm_password')}
                        />
                        {formik.touched.confirm_password && formik.errors.confirm_password && (
                          <div className="text-danger">{formik.errors.confirm_password}</div>
                        )}
                        <label className="form-label" htmlFor="confirm_password">
                        Confirm Password
                        </label>
                      </div>
                      {/* <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="subscriptions"
                          className="form-control form-control-lg"
                          placeholder="Subscriptions (comma separated)"
                          {...formik.getFieldProps('subscriptions')}
                        />
                        {formik.touched.subscriptions && formik.errors.subscriptions && (
                          <div className="text-danger">{formik.errors.subscriptions}</div>
                        )}
                        <label className="form-label" htmlFor="subscriptions">
                          Subscriptions
                        </label>
                      </div> */}
                      <div className="d-flex justify-content-end pt-3">
                        <button type="button" className="btn btn-light btn-lg">
                          <Link to="/login">Login</Link>
                        </button>
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                          disabled={isLoading}
                        >
                           Register
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

export default Register;
