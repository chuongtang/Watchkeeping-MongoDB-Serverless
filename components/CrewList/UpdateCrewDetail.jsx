import React, { useEffect, useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
// import { Password } from 'primereact/password';
// import { Checkbox } from 'primereact/checkbox';
// import { Dialog } from 'primereact/dialog';
// import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './CrewForm.css';
import CountryNames from "./CountryNames";
import { async } from 'regenerator-runtime';

const UpdateCrewDetail = ({ user, appUser, crew, parentState }) => {
  const [countries, setCountries] = useState([]);
  // const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const wkOptions = ["YES", "No"]
  // const [hasNewDetail, setHasNewDetail] = useState('No Change found from your input');
  // const [oldDetail, setOldDetail] = useState({crew});
  const toast = useRef(null);

  useEffect(() => {
    setCountries(CountryNames);
    // console.log("Old crew detail", oldDetail)
    
  }, []);

  const updateCrewDetail = async (newDetail) => {
    const updatedCrew = await user.functions.FindOneAndUpdate(newDetail);
    console.log("UPDATED AS =>", updatedCrew);

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


    return errors;
  };


  const showSuccess = (displayMsg) => {
    toast.current.show({ severity: 'success', summary: 'Updated', detail: displayMsg, life: 3000 });
  }
  const showNochange = () => {
    toast.current.show({ severity: 'warn', summary: 'No new update', detail: 'Nothing has changed from your input', life: 4000 });
  }

  const onSubmit = async(data, form) => {
    if (data.email === crew.Email && data.rank === crew.Rank && data.nationality === crew.Nationality) {
      return showNochange();
    } else {
      
      setFormData(data);
      
      const newCrewDetail = {
        "fullname": data.fullname,
        "email": data.email,
        "rank": data.rank,
        "watchkeeper": data.watchkeeping,
        "birthday": data.birthdate,
        "nationality": data.nationality,
        "lastUpdatedBy": appUser.email
      }
      console.log("CREW detail $$$$$", newCrewDetail);
      
      // CALL Realm function to update CREW detail
      // await updateCrewDetail(newCrewDetail);

      // NEED TO HIFE FORM AFTER POPUP MSG
      console.log("form detail", form)
      // form.blur();
      showSuccess(`New detail for ${data.fullname}`);
      setTimeout(()=>{parentState(false)}, 3000);
    }
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

          <Form onSubmit={onSubmit} initialValues={{ fullname: `${crew.Fullname}`, email: `${crew.Email}`, watchkeeping: `${crew.Watchkeeper}`, rank: `${crew.Rank}`, birthdate: `${crew.Birthday}`, nationality: `${crew.Nationality}` }} validate={validate} render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="p-fluid">
              <Field name="fullname" render={() => (
                <div className="p-field ">
                  <span className="p-input-icon-right">
                    <i className="pi pi-lock" />
                    <InputText value={crew.Fullname} disabled />
                  </span>
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
              <br />
              <Field name="birthdate" render={() => (
                <div className="p-field">
                  <label htmlFor="birthdate">Date-of-birth</label>
                  <span className="p-input-icon-right">

                    <i className="pi pi-lock" />
                    <InputText value={crew.Birthday} disabled />
                  </span>
                </div>
              )} /><br />
              <Field name="nationality" render={({ input }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <Dropdown id="nationality" placeholder={crew.Nationality} {...input} options={countries} optionLabel="" />
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

              <Button icon="pi pi-user-plus" type="submit" label="Update crew details" className="p-mt-2 p-button-raised p-button-warning " />
            </form>
          )} />
        </div>
      </div>
    </div>
  );
};
export default UpdateCrewDetail
