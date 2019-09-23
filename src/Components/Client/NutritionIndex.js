import React, {useState, useEffect} from 'react';
import NutritionTable from './NutritionTable';
import NutritionEntry from './NutritionEntry';
import MessageIndex from './MessageIndex';
import MacroIndex from './MacroIndex';

const NutritionIndex = (props) => {
    const [nutrition, setNutrition] = useState([]);

    const fetchNutrition = () => {
        fetch('https://ekh-nutritioncoachingwebpage.herokuapp.com/nutrition/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application.json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        .then(logData => {setNutrition(logData); console.log(logData)})
    }

    useEffect(() => {
        fetchNutrition();
    }, [])

    return(
        <div>
            <h1>Welcome! Please log your nutrition.</h1>
            <h3>Assigned Macros:</h3>
            <MacroIndex token={props.token}/>
            <br />
            <br />
            <h3>Nutrition Log:</h3>
            <NutritionTable nutrition={nutrition} fetchNutrition={fetchNutrition} token={props.token} />
            <h3>Enter new data:</h3>
            <NutritionEntry fetchNutrition={fetchNutrition} token={props.token} />
            <h3>Messages:</h3>
            <MessageIndex token={props.token} />
        </div>
    )
}

export default NutritionIndex;