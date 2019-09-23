import React, {useState, useEffect} from 'react'
import MacroTable from '../Client/MacroTable'
import ClientNewMacros from './ClientNewMacros'

const ClientMacros = (props) => {
    const [clientMacros, setClientMacros] = useState([]);

    const fetchClientMacros = (id) => {
        fetch(`https://ekh-nutritioncoachingwebpage.herokuapp.com/macros/${id}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(data => {setClientMacros(data); console.log(data)})
        }

        useEffect(() => {
            fetchClientMacros(props.clientID);
        },[])


    return (
        <div>
            <MacroTable macros={clientMacros} />
            <br />
            <ClientNewMacros clientID={props.clientID} token={props.token} fetchClientMacros={fetchClientMacros} macros={clientMacros} />
            
        </div>
    )
}

export default ClientMacros
