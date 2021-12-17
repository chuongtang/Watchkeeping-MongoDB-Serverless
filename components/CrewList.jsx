import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import dotenv from 'dotenv';
dotenv.config();
import * as Realm from "realm-web";


const CrewList = () => {
  const REALM_APP_ID = import.meta.env.VITE_REALM_APP_ID;

  const [crewList, setCrewList] = useState([]);
  const columns = [
    { field: 'fullname', header: 'Full Name' },
    { field: 'rank', header: 'Rank' },
    { field: 'watchkepeer', header: 'Watchkeeper' },
    { field: 'nationality', header: 'Nationality' }
  ];

  useEffect(async () => {
    
    const app = new Realm.App({ id: REALM_APP_ID });

    // this will give user anonymous access.
    const credentials = Realm.Credentials.anonymous();

    try {
      const user = await app.logIn(credentials);
      const crews = await user.functions.FetchCrewList();
      setCrewList(crews);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
    <div className="card">
        <DataTable value={crewList} responsiveLayout="scroll">
            {dynamicColumns}
        </DataTable>
    </div>
</div>
  )
};
export default CrewList
