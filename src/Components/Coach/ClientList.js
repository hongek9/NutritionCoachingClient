import React, {useState, useEffect} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider"


const ClientIndex = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [clientList, setClientList] = useState([]);;

    const fetchClients = () => {
        fetch('https://ekh-nutritioncoachingwebpage.herokuapp.com/client', {
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
            {/* <h1>{`${clientList[0].firstName}`}</h1> */}
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