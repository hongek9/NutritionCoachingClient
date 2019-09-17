import React, {useState} from 'react';
import ClientLogin from './ClientLogin';
import ClientSignUp from './ClientSignUp'
import CoachLogin from './CoachSignIn';


const Auth = (props) => {
    const [login, setLogin] = useState(true);
    // const [coachLogin, setCoachLogin] = useState(false);

    return(
        <div>
          {
              (props.coach) ? <CoachLogin updateToken={props.updateToken} coach={props.coach} setCoach={props.setCoach} /> 
              : (login) ? <ClientLogin updateToken={props.updateToken} login={login} setLogin={setLogin} coach={props.coach} setCoach={props.setCoach} /> 
              : <ClientSignUp updateToken={props.updateToken} login={login} setLogin={setLogin} />
          }

        </div>
    )
}

export default Auth;