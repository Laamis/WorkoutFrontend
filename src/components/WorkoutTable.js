import React, { useEffect, useState, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import moment from 'moment'

function WorkoutTable() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then(data => {
        setWorkouts(data)
        console.log(data[0].id)
      })
  };
  const columns = [
    {
      headerName: "Date",
      field: "date",
      cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");},
      sortable: true,
      filter: true,
    },
    {
      headerName: "Duration",
      field: "duration",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Customer",
      field: "customer.firstname",
      sortable: true,
      filter: true,
      width: 150
    },
    {
        headerName: "",
        field: "customer.lastname",
        sortable: true,
        filter: true,
        width: 150
      },
  ];
  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "90%", margin: "auto" }}
      >
        <AgGridReact columnDefs={columns} rowData={workouts} suppressCellSelection="true"></AgGridReact>
      </div>
    </div>
  );
}
export default WorkoutTable;
