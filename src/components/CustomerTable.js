import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useState, useEffect, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import { Button } from "@material-ui/core";
import EditCustomer from "./EditCustomer";
import AddWorkout from "./AddWorkout";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const gridRef = useRef();

 const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link[0].href, {
        method: "DELETE",
      })
        .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
        .catch((err) => console.error(err));
    }
  };

  const editCustomer = (link, customer) => {

    console.log(customer)
    fetch(link[0].href, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
      .catch((err) => console.error(err));
  };

  const addWorkout = (workout) => {
    console.log(workout)
      fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type" : "application/json"},
      body: JSON.stringify(workout)
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .catch((err) => console.error(err))  
  }

  const columns = [
    {
      headerName: "First Name",
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Street Address",
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Post Code",
      field: "postcode",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
    },
    {
      headerName: "E-Mail",
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Phone Number",
      field: "phone",
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      field: "links",
      cellRendererFramework: (params) => (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => deleteCustomer(params.value)}
        >
          Delete
        </Button>
      ),
    },
    {
      headerName: "",
      field: "links",
      cellRendererFramework: (params) => (
        <EditCustomer
          editCustomer={editCustomer}
          params={params}
        ></EditCustomer>
      ),
    },
    {
      headerName: "",
      field: "links.href",
      cellRendererFramework: (params) => (
        <AddWorkout
          addWorkout={addWorkout}
          params={params}
          
        ></AddWorkout>
      ),
    }
  ];

  return (
    <div>
      <AddCustomer addCustomer={addCustomer}></AddCustomer>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "90%", margin: "auto" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={customers}
          ref={gridRef}
          onGridReady={(params) => {
            gridRef.current = params.api;
            params.api.sizeColumnsToFit()
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}
export default CustomerTable;
