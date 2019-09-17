import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }));

const NutritionTable = (props) => {
    const classes = useStyles();

    return(
        <div>
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
                    {props.nutrition.map((entry, index) => (
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
        </div>
    )
};

export default NutritionTable;