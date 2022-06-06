import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import api from '../services/api';

interface PresentationFields {
  presentation: string;
  details: string;
  room?: number,
  speakerName: string;
  speakerCompany: string;
  speakerEmail: string;
  speakerBio: string;
}

interface FieldErrors {
  presentation?: string;
  details?: string;
  room?: string,
  speakerName?: string;
  speakerCompany?: string;
  speakerEmail?: string;
  speakerBio?: string;
}

function PresentationForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isValid, setValid] = useState(true);

  const initialValues: PresentationFields = {
    presentation: '',
    details: '',
    speakerName: '',
    speakerCompany: '',
    speakerEmail: '',
    speakerBio: '',
  }

  function validateForm(values: PresentationFields) {
    const errors: FieldErrors = {};
    if (!values.presentation)
      errors.presentation = 'Required';

    if (!values.details)
      errors.details = 'Required';

    if (!values.room)
      errors.room = 'Required';

    if (!values.speakerName)
      errors.speakerName = 'Required';

    if (!values.speakerCompany)
      errors.speakerCompany = 'Required';

    if (!values.speakerEmail)
      errors.speakerEmail = 'Required';

    if (!values.speakerEmail) {
      errors.speakerEmail = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.speakerEmail)) {
      errors.speakerEmail = 'Invalid email address';
    }

    if (!values.speakerBio)
      errors.speakerBio = 'Required';

    setValid(Object.keys(errors).length == 0);
    return errors;
  }

  function handleSubmit(values: PresentationFields) {
    setSubmitting(true);

    const content = {
      presentation: values.presentation,
      details: values.details,
      room: values.room,
      speaker: {
        name: values.speakerName,
        company: values.speakerCompany,
        email: values.speakerEmail,
        bio: values.speakerBio
      }
    };
    api.post("/presentations", content).then(() => {
      alert(JSON.stringify("Success", null, 2));
    }).catch((err) => {
      if (err.response.data.status && err.response.data.message)
        alert(JSON.stringify(err.response.data.message, null, 2));
      else
        alert(JSON.stringify("Oops! Something went wrong!", null, 2));
    }).finally(() => setSubmitting(false));
  }

  return (
    <div className='w-full max-w-lg'>
      <h1 className='text-2xl p-4'>Create Presentation</h1>
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
                <label className='block text-gray-700 text-sm font-bold mb-2'>Presentation:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  name="presentation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.presentation}
                />
                <span className='text-red-500 text-xs italic'>{errors.presentation && touched.presentation && errors.presentation}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Details:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  name="details"
                  component="textarea"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.details}
                />
                <span className='text-red-500 text-xs italic'>{errors.details && touched.details && errors.details}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Room:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="number"
                  name="room"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.room}
                />
                <span className='text-red-500 text-xs italic'>{errors.room && touched.room && errors.room}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Speaker:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  name="speakerName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.speakerName}
                />
                <span className='text-red-500 text-xs italic'>{errors.speakerName && touched.speakerName && errors.speakerName}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Company:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  name="speakerCompany"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.speakerCompany}
                />
                <span className='text-red-500 text-xs italic'>{errors.speakerCompany && touched.speakerCompany && errors.speakerCompany}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="email"
                  name="speakerEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.speakerEmail}
                />
                <span className='text-red-500 text-xs italic'>{errors.speakerEmail && touched.speakerEmail && errors.speakerEmail}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Bio:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text"
                  component="textarea"
                  name="speakerBio"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.speakerBio}
                />
                <span className='text-red-500 text-xs italic'>{errors.speakerBio && touched.speakerBio && errors.speakerBio}</span>
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

export default PresentationForm;
