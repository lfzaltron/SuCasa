import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

interface AttendeeFields {
  name: string;
  company: string;
  email: string;
}

interface FieldErrors {
  name?: string;
  company?: string;
  email?: string;
}

function AttendeeForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isValid, setValid] = useState(true);

  const initialValues: AttendeeFields = {
    name: '',
    company: '',
    email: '',
  }

  function validateForm(values: AttendeeFields) {
    const errors: FieldErrors = {};
    if (!values.name)
      errors.name = 'Required';

    if (!values.company)
      errors.company = 'Required';

    if (!values.email)
      errors.email = 'Required';

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    setValid(Object.keys(errors).length == 0);
    return errors;
  }

  function handleSubmit(values: AttendeeFields, { resetForm }: FormikHelpers<AttendeeFields>) {
    setSubmitting(true);

    api.post("/attendees", values).then(() => {
      toast.success('Success!');
      resetForm();
    }).catch((err) => {
      if (err.response.data.status && err.response.data.message)
        toast.error(err.response.data.message);
      else
        toast.error("Oops! Something went wrong!");
    }).finally(() => setSubmitting(false));
  }

  return (
    <div className='w-full max-w-lg'>
      <h1 className='text-2xl p-4'>Create attendee</h1>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className='w-full max-w-lg'>
            <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <span className='text-red-500 text-xs italic'>{errors.name && touched.name && errors.name}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Company:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  name="company"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                />
                <span className='text-red-500 text-xs italic'>{errors.company && touched.company && errors.company}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className='text-red-500 text-xs italic'>{errors.email && touched.email && errors.email}</span>
              </div>
              <div className='flex items-center justify-between'>
                <button type="submit" disabled={isSubmitting || !isValid} className="bg-button-500 hover:bg-button-700 disabled:bg-button-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all">
                  Save
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div >
  )
}

export default AttendeeForm;
