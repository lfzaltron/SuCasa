import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface AddAttendeeToPresentationFields {
  presentationId: number;
  attendeeEmail: string;
}

interface FieldErrors {
  presentationId?: string;
  attendeeEmail?: string;
}

interface Presentation {
  id: number;
  presentation: string;
}


function AddAttendeeToPresentationForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isValid, setValid] = useState(true);
  const [presentations, setPresentations] = useState<Presentation[]>([]);

  useEffect(() => {
    api.get('/presentations').then(response => {
      setPresentations(response.data);
    });
  }, []);

  const initialValues: AddAttendeeToPresentationFields = {
    presentationId: 0,
    attendeeEmail: '',
  }

  function validateForm(values: AddAttendeeToPresentationFields) {
    const errors: FieldErrors = {};
    if (!values.presentationId || values.presentationId == 0)
      errors.presentationId = 'Required';

    if (!values.attendeeEmail)
      errors.attendeeEmail = 'Required';

    if (!values.attendeeEmail) {
      errors.attendeeEmail = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.attendeeEmail)) {
      errors.attendeeEmail = 'Invalid email address';
    }

    setValid(Object.keys(errors).length == 0);
    return errors;
  }

  function handleSubmit(values: AddAttendeeToPresentationFields) {
    setSubmitting(true);

    api.post(`/presentation/${values.presentationId}/attendees`, { email: values.attendeeEmail }).then(() => {
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
      <h1 className='text-2xl p-4'>Add attendee to presentation's list</h1>
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
                  as="select"
                  name="presentationId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.presentationId}
                >
                  <option value={0} key={0}>---</option>
                  {presentations.map(presentation => (
                    <option value={presentation.id} key={presentation.id}>{`${presentation.presentation} - (${presentation.id})`}</option>
                  ))}

                </Field>
                <span className='text-red-500 text-xs italic'>{errors.presentationId && touched.presentationId && errors.presentationId}</span>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Attendee's email:</label>
                <Field
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="email"
                  name="attendeeEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.attendeeEmail}
                />
                <span className='text-red-500 text-xs italic'>{errors.attendeeEmail && touched.attendeeEmail && errors.attendeeEmail}</span>
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

export default AddAttendeeToPresentationForm;
