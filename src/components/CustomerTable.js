import { AgGridReact } from 'ag-grid-react/lib/agGridReact'
import React, { useState, useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

function CustomerTable(){
    const [customers, setCustomers] = useState([])
   
    useEffect(() => {
        getCustomers()
    },[])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((data) => setCustomers(data.content))
        .then(console.log(customers))
        .catch((err) => console.error(err))

    }

    const columns = [
        { headerName: 'First Name', field: "firstname", sortable: true, filter: true },
        { headerName: 'Last Name', field: "lastname", sortable: true, filter: true },
        { headerName: 'Street Address', field: "streetaddress", sortable: true, filter: true },
        { headerName: 'Post Code', field: "postcode", sortable: true, filter: true },
        { headerName: 'City', field: "city", sortable: true, filter: true },
        { headerName: 'E-Mail', field: "email", sortable: true, filter: true },
        { headerName: 'Phone Number', field: "phone", sortable: true, filter: true }
    ]


    return(
        <div>
            <div className="ag-theme-material" style={{height:'700px', width:'90%', margin: 'auto'}}>
                <AgGridReact
                columnDefs = {columns}
                rowData = {customers}
                
            
                >

                </AgGridReact>
            </div>
        </div>
    )
}
export default CustomerTable