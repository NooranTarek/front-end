import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { userLogin } from '../../axios/user.axios';
import { forgetPassword } from '../../axios/user.axios';

import './login.css';

function Login() {
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
      email: Yup.string().required('Email is required').email('Invalid email format'),
      password: Yup.string().min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await userLogin(values)
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: 'Logged In successfully !!',
              timer: 2000,
            });
            navigate('/sources');
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
  const handleForgetPassword = async () => {
    if (!formik.values.email) {
      Swal.fire({
        icon: 'error',
        text: 'Please enter your email address first.',
      });
      return;
    }
    setLoading(true);
    try {
        await forgetPassword(formik.values.email)
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: 'Check code sent to your email.',
            });
            navigate('/reset-password');

          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              text: err.response.data.message,
            });
          });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }}
  return (
    <section id='sec' className=" h-100 ">
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
                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                          disabled={isLoading}
                        >
                          Login
                        </button>
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          className="btn btn-link text-warning"
                          onClick={handleForgetPassword}
                          disabled={isLoading}
                        >
                          Forget password
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

export default Login;
