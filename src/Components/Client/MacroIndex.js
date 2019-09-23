import React, {useState, useEffect} from 'react';
import MacroTable from './MacroTable';

const MacroIndex = (props) => {
    const [macros, setMacros] = useState([]);

    const fetchMacros = () => {
        fetch('https://ekh-nutritioncoachingwebpage.herokuapp.com/macros', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(data => {setMacros(data); console.log(data)})
    }

    useEffect(() => {
        fetchMacros();
    }, [])
        
    return(
        <div>
            <MacroTable macros={macros} />
        </div>
    )
};

export default MacroIndex;