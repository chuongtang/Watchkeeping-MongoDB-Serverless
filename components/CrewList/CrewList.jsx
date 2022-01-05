import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';

import AddNewCrew from './AddNewCrew';


const CrewList = ({user, appUser}) => {

  const [crews, setCrews] = useState([]);
  const [crew, setCrew] = useState([]);
  const [crewDialog, setCrewDialog] = useState(false);
  const [selectedCrew, setselectedCrew] = useState(null);
  const [addNewCrew, setAddNewCrew] = useState(false);
  const toast = useRef(null);

  const columns = [
    { field: 'Fullname', header: 'Full Name' },
    { field: 'Email', header: 'Email' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Watchkeeper', header: 'Watchkeeper' },
    { field: 'Birthday', header: 'Birthday' },
    { field: 'Nationality', header: 'Nationality' }
  ];

  const editcrew = (crew) => {
    console.log("HEREERRE",crew)
    // setCrew({ ...crew });
    // setCrewDialog(true);
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editcrew(rowData)} />
        {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletecrew(rowData)} /> */}
      </React.Fragment>
    );
  }

  const openNew = () => {
    setAddNewCrew(true);
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

  const confirmDeleteSelected = (crew) => {

    toast.current.show({severity:'warn', summary: `Delete:   ${crew.Fullname}?`, detail:'Please contact web admin for this advance feature', life: 10000});
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew()} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={()=> confirmDeleteSelected(selectedCrew)} disabled={!selectedCrew} />
      </React.Fragment>
    )
  }

  const hideDialog = () => {
    setAddNewCrew(false);
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
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  const dynamicColumns = columns.map((col, i) => {
    return <Column
      key={col.field}
      field={col.field}
      header={col.header}
      sortable />;
  });
 

  return (
    <div className="p-p-1">
       <Toast ref={toast} />
      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <Dialog visible={addNewCrew} style={{ width: '450px' }} header="👮 Add new crew member" modal className="p-fluid" footer={crewDialogFooter} onHide={hideDialog}>
          <AddNewCrew user={user} appUser={appUser} />
        </Dialog>
        <DataTable value={crews} responsiveLayout="scroll" showGridlines scrollable scrollHeight="70vh"  selection={selectedCrew} onSelectionChange={(e) => setselectedCrew(e.value)} >
          <Column selectionMode="single" style={{ "maxWidth": "4rem" }} exportable={false}></Column>
          {dynamicColumns}
          <Column body={actionBodyTemplate} exportable={false} style={{ 'maxWidth': '6rem' }}></Column>
        </DataTable>
      </div>
    </div>
  )
};
export default CrewList
