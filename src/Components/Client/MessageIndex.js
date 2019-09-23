import React, {useState, useEffect} from 'react';
import MessageTable from './MessageTable';
import MessageNew from './MessageNew';

const MessageIndex = (props) => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = () => {
        fetch('https://ekh-nutritioncoachingwebpage.herokuapp.com/message', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(data => {setMessages(data); console.log(data)})
    }

    useEffect(() => {
        fetchMessages();
    }, [])
        
    return(
        <div>
            <MessageTable messages={messages} />
            <MessageNew token={props.token} fetchMessages={fetchMessages}/>

        </div>
    )
};

export default MessageIndex;