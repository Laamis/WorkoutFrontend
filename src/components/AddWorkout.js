import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
function AddWorkout(props) {
  const [workout, setWorkout] = React.useState({
    date: "",
    duration: "",
    activity: "",
  });

  const inputChanged = (event) => {
    setWorkout({ ...workout, [event.target.name]: event.target.value });
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const newWorkout = {
      ...workout, date: new Date(workout.date),
      customer: props.params.data.links[1].href,
    };
    console.log(props);
    props.addWorkout(newWorkout);
    handleClose();
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Workout
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">New Workout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={workout.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={workout.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={workout.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {" "}
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {" "}
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddWorkout;
