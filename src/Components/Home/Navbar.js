import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    backgroundColor: "#7f78d2",
    color: "white"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    color: "#7f78d2",
    fontWeight: "bold"
  },
  input: {
    display: 'none',
  },
  background: {
    backgroundColor: "#7f78d2"
  }
}));

const Sitebar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.background}>
            <Typography variant="h6" className={classes.title}>Nutrition Coaching</Typography>
            <Button variant="contained" onClick={props.clearToken} color="primary" className={classes.button}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Sitebar;
