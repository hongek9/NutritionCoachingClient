import React, {useState, useRef, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextValidator from 'react-material-ui-form-validator'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        NutritionCoaching
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));




 const ClientSignUp = (props) => {
    const classes = useStyles();
    const [primaryGoal, setPrimaryGoal] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [coaches, setCoaches] = useState([]);
    const [coachID, setCoachID] = useState(0);

    const fetchCoaches = () => {
        fetch('http://localhost:3000/coach/',{
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {setCoaches(data); console.log(data)})
    }


    const toggle = (e) => {
        e.preventDefault();
        (props.login) ? props.setLogin(false) : props.setLogin(true);
    }

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        fetchCoaches();
    }, []);


    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/client/signup", {
            method: "POST",
            body: JSON.stringify({client: 
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                coach: coachID,
                primaryGoal: primaryGoal
            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res=> res.json())
        .then(data => {
            props.updateToken(data.sessionToken);
        })
        .catch(err => console.err({Message: err}))
    }
    
    

  return (
    <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form onSubmit={handleSubmitSignUp} className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="Email"
                onChange={e => setEmail(e.target.value)}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
                {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                /> */}
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Primary Goal
                    </InputLabel>
                    <Select
                    value={primaryGoal}
                    onChange={e => {setPrimaryGoal(e.target.value); console.log(primaryGoal)}}
                    labelWidth={labelWidth}
                    inputProps={{name: 'primaryGoal'}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Weight Loss'}>Weight Loss</MenuItem>
                    <MenuItem value={'Muscle Gain'}>Muscle Gain</MenuItem>
                    <MenuItem value={'Maintenance'}>Maintenance</MenuItem>
                    </Select>
                </FormControl> 
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                      Select Coach
                    </InputLabel>
                    <Select
                    value={coachID}
                    onChange={e => {
                      setCoachID(e.target.value); 
                      console.log(e)
                    }}
                    labelWidth={labelWidth}
                    inputProps={{name: 'coachID'}}
                    >
                      
                    {
                      coaches.map((coach, index) => {
                        return(
                          
                          <MenuItem key={index} value={coach.id}>{coach.firstName} {coach.lastName}</MenuItem>
                          
                          // {id: coach.id, name: `${coach.firstName} ${coach.lastName}`}
                        )
                      })
                    }
                    </Select>
                </FormControl>
            </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Sign Up
            </Button>
            <Grid container justify="flex-end">
            <Grid item>
                <Link href="#" onClick={e => toggle(e)} variant="body2">
                Already have an account? Sign in
                </Link>
            </Grid>
            </Grid>
        </form>
        </div>
        <Box mt={5}>
        <Copyright />
        </Box>
    </Container>

        
    </div>
    
  );
}

export default ClientSignUp;