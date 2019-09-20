import React, {useState} from 'react'
import ClientList from './ClientList';
import ClientPage from './ClientPage';

const ClientIndex = (props) => {
    const [selectedClient, setSelectedClient] = useState(false);
    const [client, setClient] = useState(null);

    return (
        <div>
            {
                (selectedClient) ? <ClientPage token={props.token} client={client} setSelectedClient={setSelectedClient} /> 
                : <ClientList token={props.token} selectedClient={selectedClient} setSelectedClient={setSelectedClient} client={client} setClient={setClient} />
            }
        </div>
    )
}

export default ClientIndex
