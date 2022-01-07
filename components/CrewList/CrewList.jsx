import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { classNames } from 'primereact/utils';
// import { Tooltip } from 'primereact/tooltip';
import './CrewForm.css';
import UpdateCrewDetail from "./UpdateCrewDetail"
import AddNewCrew from './AddNewCrew';

const CrewList = ({ user, appUser }) => {

  const [crews, setCrews] = useState([]);
  const [crew, setCrew] = useState([]);
  const [crewDialog, setCrewDialog] = useState(false);
  const [selectedCrew, setselectedCrew] = useState(null);
  const [addNewCrew, setAddNewCrew] = useState(false);
  // const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const columns = [
    { field: 'Fullname', header: 'Full Name' },
    { field: 'Email', header: 'Email' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Watchkeeper', header: 'Watchkeeper' },
    { field: 'Birthday', header: 'Birthday' },
    { field: 'Nationality', header: 'Nationality' },
    { field: 'CreatedBy', header: 'Created-by' }
  ];

  const editCrew = (crew) => {
    setCrew({ ...crew });
    setCrewDialog(true);
  }

  const openNew = () => {
    setAddNewCrew(true);
  }
  const hideDialog = () => {
    setAddNewCrew(false);
    setCrewDialog(false);
  };
  
  const setStateFromUpdateCrew =(UpdState)=>{
    setCrewDialog(UpdState);
  }
  
  const confirmDeleteSelected = (crew) => {

    toast.current.show({ severity: 'warn', summary: `Delete:   ${crew.Fullname}?`, detail: 'Please contact web admin for this advance feature', life: 10000 });
  };

  const crewDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      {/* <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={alert("OK was clicked")} /> */}
    </React.Fragment>
  );

  useEffect(async () => {

    try {
      const crewList = await user.functions.FetchCrewList();
      setCrews(crewList);
      // alert('user for mongoDB realm',user);
      console.log('userMongoDB in CrewList UseEffect', user);

    } catch (error) {
      console.error(error);
    }
  }, [crewDialog, addNewCrew]);

  const dynamicColumns = columns.map((col, i) => {
    return <Column
      key={col.field}
      field={col.field}
      header={col.header}
      sortable />;
  });

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _crew = { ...crew };
    _crew[`${name}`] = val;

    setCrew(_crew);
  }

  const leftToolbarTemplate = () => {
    return (
      <div className="p-d-flex">
        <h3 className="p-mr-2">
          Manage Crew list
        </h3>
      </div>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-raised  p-button-success p-button-text p-mr-3" onClick={() => openNew()} tooltip="Add a new crew member" tooltipOptions={{ className: 'indigo-tooltip', position: 'bottom' }} />
        <Button label="Edit" icon="pi pi-user-edit" className="p-button-warning p-button-raised p-button-text p-mr-3" onClick={() => editCrew(selectedCrew)} disabled={!selectedCrew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-button-raised p-button-text p-mr-3" onClick={() => confirmDeleteSelected(selectedCrew)} disabled={!selectedCrew} />
      </React.Fragment>
    )
  }



  return (
    <div className="p-p-1">
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="p-mb-1" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <Dialog visible={addNewCrew} style={{ width: '450px' }} header="👮 Add new crew member" modal className="p-fluid" footer={crewDialogFooter} onHide={hideDialog}>
          <AddNewCrew user={user} appUser={appUser} />
        </Dialog>
        <DataTable value={crews} responsiveLayout="scroll" resizableColumns columnResizeMode="fit" showGridlines scrollable scrollHeight="70vh" selection={selectedCrew} onSelectionChange={(e) => setselectedCrew(e.value)} >
          <Column selectionMode="single" style={{ "maxWidth": "4rem" }} exportable={false}></Column>
          {dynamicColumns}
          {/* <Column body={actionBodyTemplate} exportable={false} style={{ 'maxWidth': '6rem' }}></Column> */}
        </DataTable>
      </div>

      {/* Update Crew detail form */}
      <Dialog visible={crewDialog} style={{ width: '450px' }} header="Update Crew Details" modal className="p-fluid" footer={crewDialogFooter} onHide={hideDialog}>
        <UpdateCrewDetail user={user} appUser={appUser} crew={crew} parentState={setStateFromUpdateCrew}/>
      </Dialog>
    </div>
  )
};
export default CrewList
