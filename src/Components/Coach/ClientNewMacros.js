import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      flexBasis: 200,
    },
    button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
  }))

const ClientNewMacros = (props) => {
    const classes = useStyles()

    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);

    console.log(props.macros)
    
    const handleSubmit = (e,id) => {
        e.preventDefault();
        fetch(`https://ekh-nutritioncoachingwebpage.herokuapp.com/macros/${id}`, {
            method: 'POST',
            body: JSON.stringify({macros: {protein: protein, carbs: carbs, fat: fat}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(logData => {
            console.log(logData);
            setProtein(0);
            setCarbs(0);
            setFat(0);
            props.fetchClientMacros(props.clientID);
        })
    }

    const handleSubmitUpdate = (e,id) => {
        e.preventDefault();
        fetch(`http://localhost:3000/macros/${id}`, {
            method: 'PUT',
            body: JSON.stringify({macros: {protein: protein, carbs: carbs, fat: fat}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(logData => {
            console.log(logData);
            setProtein(0);
            setCarbs(0);
            setFat(0);
            props.fetchClientMacros(props.clientID);
        })
    }

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-adornment-weight"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Protein"
                value={protein}
                onChange={e => setProtein(e.target.value)}
                // helperText="Protein"
                InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
            />
            <TextField
                id="outlined-adornment-weight"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Carbs"
                value={carbs}
                onChange={e => setCarbs(e.target.value)}
                // helperText="Carbs"
                InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
            />
            <TextField
                id="outlined-adornment-weight"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Fat"
                value={fat}
                onChange={e => setFat(e.target.value)}
                // helperText="Fat"
                InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
            />
            {   
                (props.macros.length > 0) ? 
                <label htmlFor="contained-button-file">
                <Button onClick={e => handleSubmitUpdate(e, props.clientID)} variant="contained" component="span" className={classes.button}>
                Update Macros
                </Button>
                </label>
                : <label htmlFor="contained-button-file">
                <Button onClick={e => handleSubmit(e,props.clientID)} variant="contained" component="span" className={classes.button}>
                Set Initial Macros
                </Button>
                </label>
            }
        </div>
    )
}

export default ClientNewMacros
