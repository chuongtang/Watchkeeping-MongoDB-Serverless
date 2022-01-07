
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

const AddNewCrew = ({user, appUser}) => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({});
  const wkOptions = ["YES", "No"]
  const toast = useRef(null);

  useEffect(() => {
    setCountries(CountryNames);
  }, []);

  const addNewCrewToMongo = async (crewObj) => {
    const addedCrew = await user.functions.Addcrew(crewObj);
    
    
  };

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
    const bdayString = data.birthdate;
  
    const crewDetail = {
      "fullname" : data.fullname,
      "email" : data.email,
      "rank" : data.rank,
      "watchkeeper": data.watchkeeping,
      "birthday" : bdayString.toISOString().slice(0, 10),
      "nationality": data.nationality,
      "createdBy": appUser.email
    }
    
    addNewCrewToMongo(crewDetail);
    showSuccess(data.fullname);
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
                    <Dropdown id="watchkeeping" {...input} options={wkOptions} optionLabel="" />
                    <label htmlFor="watchkeeping" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Watchkeeping Duty? *</label>
                  </span>
                  {getFormErrorMessage(meta)}
                </div>
              )} />
              <br/>
              <Field name="birthdate" render={({ input }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Calendar id="string" {...input} monthNavigator yearNavigator yearRange="1940:2000" dateFormat="yy-mm-dd" mask="9999-99-99" showIcon />
                    <label htmlFor="birthdate">Birthday</label>
                  </span>
                </div>
              )} /><br />
              <Field name="nationality" render={({ input }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Dropdown id="nationality" {...input} options={countries} optionLabel="" />
                    <label htmlFor="nationality">Nationality</label>
                  </span>
                </div>
              )} />

              <Button icon="pi pi-user-plus" type="submit" label="Add to list" className="p-mt-2 p-button-raised p-button-warning " />
            </form>
          )} />
        </div>
      </div>
    </div>
  );
}
export default AddNewCrew;