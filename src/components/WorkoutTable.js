import React, { useEffect, useState, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import moment from "moment";
import { Button } from "@material-ui/core";

function WorkoutTable() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

  const gridRef = React.useRef();
  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        console.log(data[0].id);
      });
  };

  const deleteWorkout = (link) => {
    if(window.confirm("Are you sure?")){
      fetch(link, {
        method: "DELETE",
      })
      .then((_) => gridRef.current.refreshCells({ rowNodes: getTrainings()}))
      .catch((err) => console.error(err))
    }
  }

  const columns = [
    {
      headerName: "Date",
      field: "date",
      cellRenderer: (data) => {
        return moment(data.value).format("MM/DD/YYYY HH:mm");
      },
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
      width: 150,
    },
    {
      headerName: "",
      field: "customer.lastname",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "",
      field: "links",
      cellRendererFramework: (params) => (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() =>deleteWorkout("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}
        >
          Delete
        </Button>
      ),
    }
  ];
  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "90%", margin: "auto" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={workouts}
          suppressCellSelection="true"
          onGridReady={(params) => {
            gridRef.current = params.api;
            params.api.sizeColumnsToFit();
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}
export default WorkoutTable;
