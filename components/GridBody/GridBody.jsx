
import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import './GridBody.css';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import cellsGenerator from "./cellsGenerator.js";
import anchor from "../../src/images/anchor.svg";


const GridBody = ({user}) => {

    const [products, setProducts] = useState([]);
    const [selectedProduct1, setSelectedProduct1] = useState(null);
    const [selectedProduct2, setSelectedProduct2] = useState(null);
    const [selectedProduct3, setSelectedProduct3] = useState(null);
    const [selectedProduct4, setSelectedProduct4] = useState(null);
    const [selectedProduct5, setSelectedProduct5] = useState(null);
    const [selectedProduct6, setSelectedProduct6] = useState(null);
    const [selectedProducts1, setSelectedProducts1] = useState(null);
    const [selectedProducts2, setSelectedProducts2] = useState(null);
    const [selectedProducts3, setSelectedProducts3] = useState(null);
    const [selectedProducts4, setSelectedProducts4] = useState(null);
    const [selectedProducts5, setSelectedProducts5] = useState(null);
    const [selectedProducts6, setSelectedProducts6] = useState(null);
    const [selectedProducts7, setSelectedProducts7] = useState(null);
    const [selectedProducts8, setSelectedProducts8] = useState(null);
    const [selectedProducts9, setSelectedProducts9] = useState(null);
    const [date10, setDate10] = useState(null);
    const [vesselName, setVesselName] = useState('');
    const [crews, setCrews] = useState([]);
    const [crew, setCrew] = useState({});
    const toast = useRef(null);

    useEffect(async () => {
        let Cells = cellsGenerator(2, 2022);
        console.log("UseEffect Fired");
        setProducts(Cells);
        // Fetch list for drop down component
        try {
            console.log('userMongoDB in GRidBody UseEffect', user);
            
            const crewList = await user.functions.FetchCrewList();
            setCrews(crewList);
            console.log('list for OPtions', crews.Fullname)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.data.name}`, life: 3000 });
    }

    const onRowUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.data.name}`, life: 3000 });
    }

    const onCellSelect = (event) => {
        toast.current.show({ severity: 'info', summary: `Item Selected In Product`, detail: `${toCapitalize(event.field)}: ${event.value}`, life: 3000 });
    }

    const onCellUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: `Item Unselected In Product`, detail: `${toCapitalize(event.field)}: ${event.value}`, life: 3000 });
    }

    const toCapitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const days = [...Array(7).keys()];
    console.log(days)
    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

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
        color: '#F59E0B',
        direction: 'rtl',
        width: "1rem",

    }

    const commentStyle = {
        color: '#6366F1',

    }

    const onItemChange = (e) => {
        setCrew(e.value);
    }
    
    return (
        <div className="datatable-selection">
            <Toast ref={toast} />


            <header className="p-d-flex p-jc-center" style={{ color: "#6366f1" }}>
                <h1 className="p-mx-4"> Seafarers work hour records for the month of </h1>
                <Calendar id="monthpicker" className="monthpicker" value={date10} onChange={(e) => setDate10(e.value)} view="month" dateFormat="MM-yy" yearNavigator yearRange="2020:2030" />
            </header>
            <div className="card">
                <div className="p-d-flex p-flex-column p-my-3 ">
                    <div className="p-d-flex p-flex-column p-flex-md-row p-mx-auto ">
                        <div className="p-mb-2 ">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-shield"></i>
                                </span>
                                {/* <object type="image/svg+xml" data={anchor} className="smIcon" alt="Anchor Image"></object> */}
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
                                <Dropdown value={crew} options={crews} filter showClear filterBy="Fullname" optionLabel="Fullname" onChange={onItemChange} placeholder="Seafarer Name"/>
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

                <DataTable value={products} selectionMode="multiple" cellSelection dragSelection selection={selectedProducts6} onSelectionChange={e => setSelectedProducts6(e.value)} dataKey="id" showGridlines responsiveLayout="scroll" size="small"  >

                    <Column field="date" style={dateStyle} header="Date ⇩ "></Column>
                    <Column field="00" style={cellsStyle} header="00"></Column>
                    <Column field="01" style={cellsStyle} header="01"></Column>
                    <Column field="02" style={cellsStyle} header="02"></Column>
                    <Column field="03" style={cellsStyle} header="03"></Column>
                    <Column field="04" style={cellsStyle} header="04"></Column>
                    <Column field="05" style={cellsStyle} header="05"></Column>
                    <Column field="06" style={cellsStyle} header="06"></Column>
                    <Column field="07" style={cellsStyle} header="07"></Column>
                    <Column field="08" style={cellsStyle} header="08"></Column>
                    <Column field="09" style={cellsStyle} header="09"></Column>
                    <Column field="10" style={cellsStyle} header="10"></Column>
                    <Column field="11" style={cellsStyle} header="11"></Column>
                    <Column field="12" style={cellsStyle} header="12"></Column>
                    <Column field="13" style={cellsStyle} header="13"></Column>
                    <Column field="14" style={cellsStyle} header="14"></Column>
                    <Column field="15" style={cellsStyle} header="15"></Column>
                    <Column field="16" style={cellsStyle} header="16"></Column>
                    <Column field="17" style={cellsStyle} header="17"></Column>
                    <Column field="18" style={cellsStyle} header="18"></Column>
                    <Column field="19" style={cellsStyle} header="19"></Column>
                    <Column field="20" style={cellsStyle} header="20"></Column>
                    <Column field="21" style={cellsStyle} header="21"></Column>
                    <Column field="22" style={cellsStyle} header="22"></Column>
                    <Column field="23" style={cellsStyle} header="23"></Column>
                    <Column field="24" style={cellsStyle} header="24"></Column>
                    <Column style={restTimetStyle} field="restHr" header="Total Rest time in 24-hr"></Column>
                    <Column style={restTimetStyle} field="restHr-7day" header="Total Rest time in 7-day"></Column>
                    <Column style={commentStyle} field="comment" header="Comment/Remark"></Column>
                </DataTable>
            </div>

        </div>
    );
}
export default GridBody;