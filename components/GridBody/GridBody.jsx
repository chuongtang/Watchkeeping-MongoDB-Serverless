
import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './GridBody.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import GenHourCol from './GenHourCol.js';
import cellsGenerator from "./cellsGenerator.js";


import Spinner from "../../src/images/Spinner.svg";
import sailor from "../../src/images/sailor.svg";
import ship from "../../src/images/ship.svg";
import html2pdf from "html2pdf.js";



const GridBody = ({ user }) => {

    const [products, setProducts] = useState([]);
    const [selectedCells, setSelectedCells] = useState(null);

    const [crews, setCrews] = useState([]);
    const [crew, setCrew] = useState({});

    const date = new Date();
    const [dataMonth, setDataMonth] = useState(Date.now());
    const [displaySpinner, setDisplaySpinner] = useState(false);

    const [restTime24SelectedCells, setRestTime24SelectedCells] = useState({})



    let HourRows = GenHourCol();

    const renderGrid = (dateObjValue) => {
        setDataMonth(dateObjValue)
        const rptMonth = dateObjValue.getMonth() + 1;
        const rptYear = dateObjValue.getFullYear();
        let Cells = cellsGenerator(rptMonth, rptYear);
        setProducts(Cells);
    }

    useEffect(() => {
        let Cells = cellsGenerator(1, 2022);
        setProducts(Cells);

    }, [])

    useEffect(async () => {

        // Fetch list for drop down component
        try {
            const crewList = await user.functions.FetchCrewList();
            setCrews(crewList);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const cellClass = (selectState) => {
        return !selectState ? 'SelectedStyle' : ''
    }

    const onCellsSelected = (e) => {
        setSelectedCells(e.value)

        // count the ⬇ property of an objects array 
        const countBy = (arr, prop) => arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {});
        setRestTime24SelectedCells(countBy(e.value, 'rowIndex'));
    }

    const remarkEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    // count the ⬇ property of an objects array 
    const countBy = (arr, prop) => arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {});

    // Callback for Edit comment/remark
    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        if (!newValue) {
            event.preventDefault();
            return
        }
        if (newValue.trim().length > 0) {
            rowData[field] = newValue;
        } else {
            event.preventDefault();
        }
    }

    const dateStyle = {
        color: 'white',
        backgroundColor: '#6366F1',
        padding: "0.15rem 2rem",
        textAlign: 'center',
        width: "2rem"
    }

    const restTimetStyle = {
        color: 'white',
        backgroundColor: '#F59E0B',
        padding: "0.15rem",
        textAlign: 'center',
        width: "15rem"
    }

    const cellsStyle = {
        color: '#6dd18e',
        direction: 'rtl',
        width: "1rem",
    }

    const commentStyle = {
        color: '#6dd18e',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    }

    const onItemChange = (e) => {
        setCrew(e.value);
    }

    const exportPdf = () => {
        setDisplaySpinner(true);
        setTimeout(() => {
            setDisplaySpinner(false);
        }, 3000);
        let element = document.getElementById('pdfContent');
        var opt = {
            margin: 0.1,
            filename: 'CrewTimeSheet.pdf',
            image: { type: 'svg', quality: 0.99 },
            jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' }
        };
        html2pdf().set({
            pagebreak: { before: '#copyRight' }
        });
        html2pdf(element, opt);
    };

    return (
        <>
            <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} style={{ float: "right" }} className="p-button-success p-button-raised p-button-text p-mr-6" label="export to PDF" data-pr-tooltip="PDF" />
            <Dialog visible={displaySpinner} style={{ width: '25rem' }} closable={false}>
                <object type="image/svg+xml" data={Spinner} alt="Spinner"></object>
            </Dialog>
            <div className="datatable-selection" id="pdfContent">

                <header className="p-d-flex p-jc-center" style={{ color: "#6366f1" }}>
                    <h1 className="p-mx-3"> Seafarers work hour records </h1>
                </header>

                <div className="card">
                    <div className="p-d-flex p-jc-center p-ai-center">
                        <section className="reportMonth">
                            <Calendar id="monthpicker" value={dataMonth} onChange={(e) => renderGrid(e.value)} view="month" dateFormat="MM-yy" yearNavigator yearRange="2020:2030" placeholder="Select Month ⏷" /></section>
                        <div className="p-d-flex p-flex-column p-my-1 ">
                            <div className="p-d-flex p-flex-column p-flex-md-row p-mx-auto ">
                                <div className="p-mb-2 ">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            {/* <i className="pi pi-shield"></i> */}
                                            <object type="image/svg+xml" data={ship} style={{ maxHeight: "1.25rem" }} alt="Ship Logo"></object>
                                        </span>
                                        <InputText style={{ width: '18rem' }} placeholder="Vessel Name" />
                                    </div>
                                </div>
                                <div className="p-mb-2 p-mx-2">
                                    <div className="p-inputgroup">
                                        <InputText style={{ width: '18rem' }} placeholder="Vessel Flag" />
                                    </div>
                                </div>
                                <div className="p-mb-2">
                                    <div className="p-inputgroup">
                                        <InputText style={{ width: '18rem' }} placeholder="IMO number" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-d-flex p-flex-column p-flex-md-row ">
                                <div className="p-mb-2">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <object type="image/svg+xml" data={sailor} style={{ maxHeight: "1.25rem" }} alt="Sailor Logo"></object>
                                        </span>
                                        <Dropdown value={crew} style={{ width: '18rem' }} options={crews} filter filterBy="Fullname" optionLabel="Fullname" onChange={onItemChange} placeholder="Seafarer Name" />
                                    </div>
                                </div>
                                <div className="p-mb-2 p-mx-2 ">
                                    <div className="p-inputgroup">
                                        <InputText value={crew.Rank} style={{ width: '18rem' }} disabled placeholder="Position / Rank" />
                                    </div>
                                </div>
                                <div className="p-mb-2">
                                    <div className="p-inputgroup">
                                        <InputText value={crew.Watchkeeper} style={{ width: '18rem' }} disabled placeholder="Watchkeeping Duty" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataTable value={products} selectionMode="multiple" cellSelection dragSelection metaKeySelection={false} selection={selectedCells} onSelectionChange={e => onCellsSelected(e)} dataKey="id" showGridlines responsiveLayout="scroll" size="small" cellClassName={cellClass}>

                        <Column field="date" style={dateStyle} header="Date ⇩ "></Column>

                        {HourRows.map((item, index) => (<Column field={item} key={index} style={cellsStyle} header={item}></Column>))}
                        {/* <Column style={restTimetStyle} field="restHr" header="Total Rest time in 24-hr" editor={remarkEditor} onCellEditComplete={onCellEditComplete}></Column> */}
                        <Column style={restTimetStyle} field="restHr" header="Total Rest time in 24-hr" body={(data, props) =>
                            <div>
                                {!isNaN(24 - restTime24SelectedCells[props.rowIndex]) ? (24 - restTime24SelectedCells[props.rowIndex]) : ""}
                                {/* {JSON.stringify(restTime24SelectedCells) === '{}'? "" : (24 - restTime24SelectedCells[props.rowIndex])} */}
                            </div>
                        }></Column>
                        {/* 
                    <Column style={restTimetStyle} field="restHr-7day" header="Total Rest time in 7-day" editor={remarkEditor} onCellEditComplete={onCellEditComplete}></Column> */}

                        <Column style={commentStyle} field="comment"  header="Comment/Remark" editor={remarkEditor} onCellEditComplete={onCellEditComplete}  ></Column>
                    </DataTable>
                </div>
                <h5 className="p-d-flex p-jc-center p-text-italic" id="copyRight">Copyright (c) 2022_  <a href={'http://chuongtang.com'}>CT</a> </h5>
            </div>
        </>
    );
}
export default GridBody;