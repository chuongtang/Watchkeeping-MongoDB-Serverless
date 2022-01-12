
import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import './GridBody.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import GenHourCol from './GenHourCol.js';
import cellsGenerator from "./cellsGenerator.js";
// import exportPdf from "./ExportPDF.js";



const GridBody = ({ user }) => {

    const [products, setProducts] = useState([]);
    const [selectedCells, setSelectedCells] = useState(null);
    const hourFields = ["00", ""]
    const [crews, setCrews] = useState([]);
    const [crew, setCrew] = useState({});
    const toast = useRef(null);
    const date = new Date();
    const [dataMonth, setDataMonth] = useState(Date.now());

    const [remarks, setRemarks] = useState({});
    const [comment, setComment] = useState('');
    const [restTime24SelectedCells, setRestTime24SelectedCells] = useState({})
    const [selectedCellsObj, setSelectedCellsObj] = useState({})

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



    const onCellUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: `Item Unselected In Product`, detail: `${toCapitalize(event.field)}: ${event.value}`, life: 3000 });
    }

    const toCapitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const cellClass = (selectState) => {
        return !selectState ? 'SelectedStyle' : ''
    }

    const toBeDeleted = (e) => {

        setSelectedCells(e.value)
        console.table('CELLS Selected', e.value)

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
        color: '#6366F1',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const onItemChange = (e) => {
        setCrew(e.value);
    }

    return (
        <div className="datatable-selection">
            <Toast ref={toast} />

            <header className="p-d-flex p-jc-center" style={{ color: "#6366f1" }}>
                <h1 className="p-mx-4"> Seafarers work hour records for the month of </h1>
                <section className="reportMonth">
                    <Calendar id="monthpicker" value={dataMonth} onChange={(e) => renderGrid(e.value)} view="month" dateFormat="MM-yy" yearNavigator yearRange="2020:2030" placeholder=". . ." /></section>
            </header>
            {/* <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" /> */}
            <div className="card">
                <div className="p-d-flex p-flex-column p-my-3 ">
                    <div className="p-d-flex p-flex-column p-flex-md-row p-mx-auto ">
                        <div className="p-mb-2 ">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-shield"></i>
                                </span>
                                <InputText placeholder="Vessel Name" />
                            </div>
                        </div>
                        <div className="p-mb-2 p-mx-2">
                            <div className="p-inputgroup">
                                <InputText placeholder="Vessel Flag" />
                            </div>
                        </div>
                        <div className="p-mb-2">
                            <div className="p-inputgroup">
                                <InputText placeholder="IMO number" />
                            </div>
                        </div>
                    </div>
                    <div className="p-d-flex p-flex-column p-flex-md-row p-mx-auto">
                        <div className="p-mb-2">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <Dropdown value={crew} options={crews} filter filterBy="Fullname" optionLabel="Fullname" onChange={onItemChange} placeholder="Seafarer Name" />
                            </div>
                        </div>
                        <div className="p-mb-2 p-mx-2">
                            <div className="p-inputgroup">
                                <InputText value={crew.Rank} disabled placeholder="Position / Rank" />
                            </div>
                        </div>
                        <div className="p-mb-2">
                            <div className="p-inputgroup">
                                <InputText value={crew.Watchkeeper} disabled placeholder="Watchkeeping Duty" />
                            </div>
                        </div>
                    </div>
                </div>

                <DataTable value={products} selectionMode="multiple" cellSelection dragSelection metaKeySelection={false} selection={selectedCells} onSelectionChange={e => toBeDeleted(e)} dataKey="id" showGridlines responsiveLayout="scroll" size="small" cellClassName={cellClass}>

                    <Column field="date" style={dateStyle} header="Date ⇩ "></Column>

                    {HourRows.map((item, index) => (<Column field={item} key={index} style={cellsStyle} header={item}></Column>))}
                    {/* <Column style={restTimetStyle} field="restHr" header="Total Rest time in 24-hr" editor={remarkEditor} onCellEditComplete={onCellEditComplete}></Column> */}
                    <Column style={restTimetStyle} field="restHr" header="Total Rest time in 24-hr" body={(data, props) =>
                        <div>
                            {!isNaN(24 - restTime24SelectedCells[props.rowIndex]) ? (24 - restTime24SelectedCells[props.rowIndex]) : ""}
                            {/* {JSON.stringify(restTime24SelectedCells) === '{}'? "" : (24 - restTime24SelectedCells[props.rowIndex])} */}
                        </div>
                    }></Column>

                    <Column style={restTimetStyle} field="restHr-7day" header="Total Rest time in 7-day" editor={remarkEditor} onCellEditComplete={onCellEditComplete}></Column>

                    <Column style={commentStyle} field="comment" header="Comment/Remark" editor={remarkEditor} onCellEditComplete={onCellEditComplete}></Column>
                </DataTable>
            </div>

        </div>
    );
}
export default GridBody;