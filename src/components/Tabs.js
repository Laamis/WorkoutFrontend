import React from 'react'
import CustomerTable from './CustomerTable'
import WorkoutTable from './WorkoutTable'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabApp(){
const [value, setValue] = React.useState("one")
const handleChange = (event, value) => {
    setValue(value)
}
    return(
        <div>
        <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="one" label="Customers"/>
                    <Tab value="two" label="Workouts"/>
                </Tabs>
            </AppBar>
            {value === 'one' && <CustomerTable></CustomerTable>}
            {value === 'two' && <WorkoutTable></WorkoutTable>}
        </div>
    )
}
export default TabApp