import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
  }));

const MessageNew = (props) => {
    const classes = useStyles();
    const [overview, setOverview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://ekh-nutritioncoachingwebpage.herokuapp.com/message', {
            method: 'POST',
            body: JSON.stringify({message: {overview: overview}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(logData => {
            console.log(logData);
            setOverview('');
            props.fetchMessages();
        })
    }

    
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-static"
                label="New Message"
                fullWidth
                multiline
                rows="4"
                onChange={e => setOverview(e.target.value)}
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
            <label htmlFor="contained-button-file">
                <Button onClick={e => handleSubmit(e)} variant="contained" component="span" className={classes.button}>
                Send Message
                </Button>
            </label>
            <br />
            <br />
        </form>
    )
}

export default MessageNew
