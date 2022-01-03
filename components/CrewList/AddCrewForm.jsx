import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox'
import { classNames } from 'primereact/utils';
import { SelectButton } from 'primereact/selectbutton';
import { Dialog } from 'primereact/dialog';

import './CrewForm.css';
import CountryNames from "./CountryNames";

const AddCrewForm = () => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const wkOptions = ['YES', 'NO'];
    const [watchkeeper, setWatchkeeper] = useState('NO')

    const defaultValues = {
        Fullname: '',
        Rank: '',
        Watchkeeper: '',
        Nationality: null,
        accept: false
    };

    useEffect(() => {
        setCountries(CountryNames);
    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        setShowMessage(true);
        console.log("here is the data",data);
        reset();
    };
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;


    return (
        <div className="form-demo">
            {/* <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3" visible={showMessage}>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog> */}

            <div className="p-d-flex p-jc-center">
                <div className="card">

                <h5 className="p-text-center">Register</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label">
                                <Controller name="fullname" control={control} rules={{ required: 'Fullname is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.fullname} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="fullname" className={classNames({ 'p-error': errors.Fullname })}>Fullname*</label>
                            </span>
                            {getFormErrorMessage('Fullname')}
                        </div>

                        <div className="p-field">
                            <span className="p-float-label">
                                <Controller name="rank" control={control} rules={{ required: 'rank is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.rank} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="rank" className={classNames({ 'p-error': errors.Rank })}>rank*</label>
                            </span>
                            {getFormErrorMessage('rank')}
                        </div>            
                        
                        <div className="p-field">
                            <h5>Watchkeeping Duty?</h5>
                            <SelectButton value={watchkeeper} options={wkOptions} onChange={(e) => setWatchkeeper(e.value)
                            } />
                            <br />
                        </div>

                        <div className="p-field">
                            <span className="p-float-label">
                                <Controller name="country" control={control} render={({ field }) => (
                                    <Dropdown id={field.nationality} value={field.value} onChange={(e) => field.onChange(e.value)} options={countries} optionLabel="name" />
                                )} />
                                <label htmlFor="country">Nationality</label>
                            </span>
                        </div>
                        <div className="p-field-checkbox">
                            <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>I agree to the terms and conditions*</label>
                        </div>

                        <Button type="submit" label="Submit" className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddCrewForm;