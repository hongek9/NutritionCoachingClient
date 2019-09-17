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
  }));


const NutritionEntry = (props) => {
    const classes = useStyles()

    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [weight, setWeight] = useState(0);
    const [comment, setComment] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/nutrition/', {
            method: 'POST',
            body: JSON.stringify({nutrition: {protein: protein, carbs: carbs, fat: fat, weight: weight, comment: comment}}),
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
            setWeight(0);
            props.fetchNutrition();
        })
    }
    return(
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
            <TextField
                id="outlined-adornment-weight"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                // helperText="Carbs"
                InputProps={{
                endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                }}
            />
            <TextField
                id="outlined-adornment-weight"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Comments"
                value={comment}
                onChange={e => setComment(e.target.value)}
                // helperText="Comments"
            />
            <label htmlFor="contained-button-file">
                <Button onClick={e => handleSubmit(e)} variant="contained" component="span" className={classes.button}>
                Submit
                </Button>
            </label>
        </div>
        
    )
};

export default NutritionEntry;