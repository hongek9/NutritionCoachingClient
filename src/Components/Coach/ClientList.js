import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  }));

const ClientIndex = (props) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [clientList, setClientList] = useState([]);
    const [clientNutrition, setClientNutrition] = useState([]);

    const fetchClients = () => {
        fetch('http://localhost:3000/client', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'appplication/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(data => {setClientList(data); console.log(data)})
    };

    useEffect(() => {
        fetchClients();
    }, []);


    return(
        <div>
            <h1>Select the client you want to view:</h1>
            <List component="nav" aria-label="main mailbox folders"></List>
            {
                clientList.map((client,index) => {
                    return(
                        <div>

                        <ListItem
                        button
                        selected={selectedIndex === client.id}
                        onClick={event => {props.setSelectedClient(true); props.setClient(client) }}
                        key={index}
                        >
                            <ListItemText primary={`${client.firstName} ${client.lastName}`} />
                        </ListItem>
                        <Divider />
                        
                        </div>
                    )
                })
            }
            <List />
        </div>
    )
}

export default ClientIndex;