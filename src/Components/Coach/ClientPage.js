import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import ClientMessages from './ClientMessages';

const columns = [
    { id: 'Messages', label: 'Messages', minWidth: 200 },
  ];

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    root: {
        width: '100%',
    },
    tableWrapper: {
        maxHeight: 407,
        overflow: 'auto',
    },
  }));

const ClientPage = (props) => {
    const classes = useStyles();

    const [clientNutrition, setClientNutrition] = useState([]);
    const [clientMessage, setClientMessage] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const fetchClientNutrition = (id) => {
        fetch(`http://localhost:3000/nutrition/${id}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(data => {setClientNutrition(data); console.log(data)})

        props.setSelectedClient(true)
    }

    const fetchClientMessages = (id) => {
        fetch(`http://localhost:3000/message/${id}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(data => {setClientMessage(data); console.log(data)})
    }

    useEffect(() => {
        fetchClientNutrition(props.client.id);
        fetchClientMessages(props.client.id);
    },[])

    return(
        <div>
            <h1>Displaying Data for {props.client.firstName} {props.client.lastName}</h1>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Protein&nbsp;(g)</TableCell>
                        <TableCell>Carbs&nbsp;(g)</TableCell>
                        <TableCell>Fat&nbsp;(g)</TableCell>
                        <TableCell>Calories</TableCell>
                        <TableCell>Weight&nbsp;(lbs)</TableCell>
                        <TableCell>Comments</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {clientNutrition.map((entry, index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">Day {index + 1}</TableCell>
                        <TableCell>{entry.protein}</TableCell>
                        <TableCell>{entry.carbs}</TableCell>
                        <TableCell>{entry.fat}</TableCell>
                        <TableCell>{entry.protein*4 + entry.carbs*4 + entry.fat*9}</TableCell>
                        <TableCell>{entry.weight}</TableCell>
                        <TableCell>{entry.comment}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
            <h1>Messages:</h1>
            <ClientMessages token={props.token} clientID={props.client.id} />

        </div>  
    )
}

export default ClientPage
