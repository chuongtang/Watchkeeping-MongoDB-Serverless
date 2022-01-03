
import React, { useEffect, useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './CrewForm.css';
import CountryNames from "./CountryNames";

const AddNewCrew = () => {
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [textMsg, setTextMsg] = useState('...')
  const toast = useRef(null);

  // useEffect(() => {
  //     countryservice.getCountries().then(data => setCountries(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCountries(CountryNames);
  }, []);

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = 'Fullname is required.';
    }

    if (!data.email) {
      errors.email = 'Email is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }

    if (!data.rank) {
      errors.rank = 'Rank is required.';
    }

    // if (!data.accept) {
    //   errors.accept = 'You need to agree to the terms and conditions.';
    // }

    return errors;
  };


  const showSuccess = (displayMsg) => {
    
    toast.current.show({ severity: 'success', summary: 'Successfully added', detail: displayMsg, life: 3000 });
  }

  const onSubmit = (data, form) => {
    setFormData(data);
    // setShowMessage(true);
    // setTextMsg(`${data.fullname} detail has been added`);
    showSuccess(data.name);
    console.log("form data detail", data);
    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

  return (
    <div className="form">

      <Toast ref={toast} />
      {/* <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog> */}
      {/* <Messages ref={successMsg} /> */}
      <div className="p-d-flex p-jc-center">
        <div className="card">
          {/* <h5 className="p-text-center">Register</h5> */}
          <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', rank: '', date: null, nationality: null }} validate={validate} render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">
              <Field name="name" render={({ input, meta }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Fullname*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <Field name="email" render={({ input, meta }) => (
                <div className="p-field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <Field name="rank" render={({ input, meta }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <InputText id="rank" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="rank" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Rank/Position*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />

              <Field name="date" render={({ input }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                    <label htmlFor="date">Birthday</label>
                  </span>
                </div>
              )} />
              <Field name="nationality" render={({ input }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Dropdown id="nationality" {...input} options={countries} optionLabel="name" />
                    <label htmlFor="nationality">Nationality</label>
                  </span>
                </div>
              )} />
              {/* <Field name="accept" type="checkbox" render={({ input, meta }) => (
                <div className="p-field-checkbox">
                  <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                  <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                </div>
              )} /> */}

              <Button type="submit" label="Submit" className="p-mt-2" />
            </form>
          )} />
        </div>
      </div>
    </div>
  );
}
export default AddNewCrew;