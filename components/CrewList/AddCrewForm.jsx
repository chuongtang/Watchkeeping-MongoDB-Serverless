
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox'
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';

import './CrewForm.css';
import CountryNames from "./CountryNames";

const AddCrewForm = () => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    
    const wkOptions = ['YES', 'NO'];
    const [watchkeeper, setWatchkeeper] = useState('NO')

    useEffect(() => {
        setCountries(CountryNames);
    }, []); 

    const formik = useFormik({
        initialValues: {
            fullname: '',
            rank: '',
            watchkeeper: '',
            country: null,
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.fullname) {
                errors.fullname = 'Fullname is required.';
            }

            if (!data.rank) {
                errors.rank = 'Rank is required.';
            }
            if (!data.watchkeeper) {
                errors.watchkeeper = 'Watchkeeping Duty is required.';
            }

            if (!data.accept) {
                errors.accept = 'You need to agree to the terms and conditions.';
            }

            return errors;
        },
        onSubmit: (e, data) => {
            e.preventDefault();
            setFormData(data);
            setShowMessage(true);
            console.log("submitted form...onto url...with data as", formData);

            // formik.resetForm();
        }
    });

    const isFormFieldValid = (fullname) => !!(formik.touched[fullname] && formik.errors[fullname]);
    const getFormErrorMessage = (fullname) => {
        return isFormFieldValid(fullname) && <small className="p-error">{formik.errors[fullname]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    
 

    return (
        <div className="form-demo">
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3" visible ={showMessage}>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h4 className="p-text-center">Add a new seafarer to database</h4>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="fullname" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('fullname') })} />
                                <label htmlFor="fullname" className={classNames({ 'p-error': isFormFieldValid('name') })}>Fullname*</label>
                            </span>
                            {getFormErrorMessage('fullname')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="rank" name="rank" value={formik.values.rank} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('rank') })} />
                                <label htmlFor="rank" className={classNames({ 'p-error': isFormFieldValid('rank') })}>Rank / Position*</label>
                            </span>
                            {getFormErrorMessage('rank')}
                        </div>
                        <div className="p-field">
                        <h5>Watchkeeping Duty?</h5>
                        <SelectButton value={watchkeeper} options={wkOptions} onChange={(e) => setWatchkeeper(e.value)
                        } />
                        <br/>
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Dropdown id="country" name="country" value={formik.values.country} onChange={formik.handleChange} options={countries} optionLabel="name" />
                                <label htmlFor="country">Nationality*</label>
                            </span>
                        </div>
                        <div className="p-field-checkbox">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                        </div>

                        <Button type="submit" label="Submit" className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddCrewForm;