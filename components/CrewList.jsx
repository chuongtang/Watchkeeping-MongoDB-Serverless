import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import dotenv from 'dotenv';

// dotenv/config();
import * as Realm from "realm-web";


const CrewList = () => {
  // const REALM_APP_ID = "shiptime_backend-zjsnd";
  const REALM_APP_ID = import.meta.env.VITE_REALM_APP_ID;
  console.log(REALM_APP_ID);
  console.log("dotHERE", dotenv.config)
  const [crews, setCrews] = useState([]);
  const columns = [
    { field: 'Fullname', header: 'Full Name' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Watchkeeper', header: 'Watchkeeper' },
    { field: 'Nationality', header: 'Nationality' }
  ];

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

  const booleanChecker = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return ((rowData[item.field]) ? "Accepted" : "Unaccepted");
    } else {
      return rowData[item.field];
    }
  };

  const dynamicColumns = columns.map((col, i) => {
    return <Column 
        key={col.field} 
        field={col.field} 
        header={col.header}
        body={booleanChecker} />;
  });

  return (
    <div>
      <div className="card">
        <DataTable value={crews} responsiveLayout="scroll">
          {dynamicColumns}
        </DataTable>

      </div>
    </div>
  )
};
export default CrewList
