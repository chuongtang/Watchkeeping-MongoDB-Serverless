
import React, { useEffect, useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import './CrewForm.css';
import CountryNames from "./CountryNames";

const AddNewCrew = () => {
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const wkOptions = [{'opt':'YES'}, {'opt':'No'}]
  const toast = useRef(null);

  // useEffect(() => {
  //     countryservice.getCountries().then(data => setCountries(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCountries(CountryNames);
  }, []);

  const validate = (data) => {
    let errors = {};

    if (!data.fullname) {
      errors.fullname = 'Fullname is required.';
    }

    if (!data.email) {
      errors.email = 'Email is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }

    if (!data.rank) {
      errors.rank = 'Please enter position';
    }
    if (!data.watchkeeping) {
      errors.watchkeeping = 'Please select YES or No';
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

    showSuccess(data.fullname);
    console.log("form data detail", data);
    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (
    <div className="form">

      <Toast ref={toast} />

      <div className="p-d-flex p-jc-center">
        <div className="card">

          <Form onSubmit={onSubmit} initialValues={{ fullname: '', email: '', rank: '', birthdate: null, nationality: null }} validate={validate} render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">
              <Field name="fullname" render={({ input, meta }) => (
                <div className="p-field ">
                  <span className="p-float-label">
                    <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="fullname" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Fullname*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <br />
              <Field name="email" render={({ input, meta }) => (
                <div className="p-field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} /><br />
              <Field name="rank" render={({ input, meta }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <InputText id="rank" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label htmlFor="rank" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Rank/Position*</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} /><br />
              <Field name="watchkeeping" render={({ input, meta }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Dropdown id="watchkeeping" {...input} options={wkOptions} optionLabel="opt" />
                    <label htmlFor="watchkeeping" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Watchkeeping Duty? *</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <br/>
              <Field name="birthdate" render={({ input }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                    <label htmlFor="birthdate">Birthday</label>
                  </span>
                </div>
              )} /><br />
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

              <Button icon="pi pi-user-plus" type="submit" label="Add to list" className="p-mt-2 p-button-raised p-button-warning " />
            </form>
          )} />
        </div>
      </div>
    </div>
  );
}
export default AddNewCrew;