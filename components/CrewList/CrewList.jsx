import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import dotenv from 'dotenv';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import AddCrewForm from './AddCrewForm';
import { Sidebar } from 'primereact/sidebar';

// dotenv/config();
import * as Realm from "realm-web";
import AddNewCrew from './AddNewCrew';


const CrewList = () => {

  const REALM_APP_ID = import.meta.env.VITE_REALM_APP_ID;
  const REALM_APP_APIKEY = import.meta.env.VITE_REALM_APP_APIKEY;

  const [crews, setCrews] = useState([]);
  const [crew, setCrew] = useState([]);
  const [crewDialog, setCrewDialog] = useState(false);
  const [selectedCrews, setSelectedCrews] = useState(null);
  const [addNewCrew, setAddNewCrew] = useState(false);

  const columns = [
    { field: 'Fullname', header: 'Full Name' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Watchkeeper', header: 'Watchkeeper' },
    { field: 'Nationality', header: 'Nationality' }
  ];

  const editcrew = (crew) => {
    setCrew({ ...crew });
    setCrewDialog(true);
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
    // setCrew(newCrewDetail);
    // setSubmitted(false);
    console.log("openNew is clicked")
    setAddNewCrew(true);
    console.log("CREWDIALOG IS", crewDialog);
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
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew()} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={()=> confirmDeleteSelected} disabled={!selectedCrews || !selectedCrews.length} />
      </React.Fragment>
    )
  }

  const confirmDeleteSelected = () => {
    alert("Paid subcription is required for this advance feature")
  }



  const hideDialog = () => {
    // setSubmitted(false);
    setCrewDialog(false);
  };

  let newCrewDetail = {

    Fullname: '',
    Rank: '',
    Watchkeeper: '',
    Nationality: ''
  };

  const crewDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      {/* <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={alert("OK was clicked")} /> */}
    </React.Fragment>
  );



  useEffect(async () => {

    const app = new Realm.App({ id: REALM_APP_ID });

    // // this will give user anonymous access.
    // const credentials = Realm.Credentials.anonymous();

    const credentials = Realm.Credentials.apiKey(REALM_APP_APIKEY);
    

    try {
      const user = await app.logIn(credentials);
      // assert(user.id === app.currentUser.id);
      console.log("userIN Mongodb", user)
      const crewList = await user.functions.FetchCrewList();
      setCrews(crewList);
      console.log("HereISCrewList", crewList[0]);
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
    <div>
      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        {/* <Sidebar visible={addCrewSidebar} onHide={() => setAddCrewSidebar(false)}>
          <h3>Left Sidebar</h3>
          <AddCrewForm />
        </Sidebar> */}
        <Dialog visible={addNewCrew} style={{ width: '450px' }} header="Add new crew member" modal className="p-fluid" footer={crewDialogFooter} onHide={hideDialog}>
          <AddNewCrew />
          {/* <AddCrewForm /> */}
        </Dialog>
        <DataTable value={crews} responsiveLayout="scroll" showGridlines scrollable scrollHeight="70vh" selection={selectedCrews} onSelectionChange={(e) => setSelectedCrews(e.value)}>
          <Column selectionMode="single" style={{ "maxWidth": "4rem" }} exportable={false}></Column>
          {dynamicColumns}
          <Column body={actionBodyTemplate} exportable={false} style={{ 'maxWidth': '6rem' }}></Column>
        </DataTable>



      </div>
    </div>
  )
};
export default CrewList
