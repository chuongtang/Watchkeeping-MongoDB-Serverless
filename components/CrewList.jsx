import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import dotenv from 'dotenv';
import { Button } from 'primereact/button';

// dotenv/config();
import * as Realm from "realm-web";


const CrewList = () => {
  
  const REALM_APP_ID = import.meta.env.VITE_REALM_APP_ID;
 
  const [crews, setCrews] = useState([]);
  const [crew, setCrew] = useState([]);
  const [crewDialog, setCrewDialog] = useState(false);

  const columns = [
    { field: 'Fullname', header: 'Full Name' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Watchkeeper', header: 'Watchkeeper' },
    { field: 'Nationality', header: 'Nationality' }
  ];

  const editcrew = (crew) => {
    setCrew({...crew});
    setCrewDialog(true);
}

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editcrew(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletecrew(rowData)} />
        </React.Fragment>
    );
}

  useEffect(async () => {

    const app = new Realm.App({ id: REALM_APP_ID });

    // this will give user anonymous access.
    const credentials = Realm.Credentials.anonymous();

    try {
      const user = await app.logIn(credentials);
      const crewList = await user.functions.FetchCrewList();
      setCrews(crewList);
      console.log("HereISCrewList",crewList[0]);
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
        <DataTable value={crews} responsiveLayout="scroll" showGridlines scrollable scrollHeight="400px">
          {dynamicColumns}
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>

      </div>
    </div>
  )
};
export default CrewList
