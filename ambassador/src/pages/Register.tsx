import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post('register', {
      first_name: formFields.firstName,
      last_name: formFields.lastName,
      email: formFields.email,
      password: formFields.password,
      password_confirm: formFields.passwordConfirm,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <main className='form-signin'>
      <form onSubmit={submit}>
        <h1 className='h3 mb-3 fw-normal'>Please register</h1>

        <div className='form-floating'>
          <input
            className='form-control'
            placeholder='First Name'
            onChange={(e) =>
              setFormFields({ ...formFields, firstName: e.target.value })
            }
          />
          <label>First Name</label>
        </div>

        <div className='form-floating'>
          <input
            className='form-control'
            placeholder='Last Name'
            onChange={(e) =>
              setFormFields({ ...formFields, lastName: e.target.value })
            }
          />
          <label>Last Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            placeholder='name@example.com'
            onChange={(e) =>
              setFormFields({ ...formFields, email: e.target.value })
            }
          />
          <label>Email address</label>
        </div>

        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            onChange={(e) =>
              setFormFields({ ...formFields, password: e.target.value })
            }
          />
          <label>Password</label>
        </div>

        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            placeholder='Confirm Password'
            onChange={(e) =>
              setFormFields({
                ...formFields,
                passwordConfirm: e.target.value,
              })
            }
          />
          <label>Confirm Password</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
