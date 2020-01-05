import React, {Component} from 'react';
import Cookies from "js-cookie";
import jwtdecode from 'jwt-decode'

const GetUser = () => {
    const token = Cookies.get('token');
    const user = token ? jwtdecode(token) : {user: '', roles: 'guest'}
    return user ;
}

/**
 * Checking role its valid
 * @param {object}
 * {
 *   role: string,
 *   allowedRoles: array,
 * }
 * @return {boolean} 
 */
const isValidRole = ({role, allowedRoles}) => allowedRoles.includes(role);

 const Authorization = allowedRoles => wrappedComponent => class withAuth extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: GetUser(), // state user assign value from GetUser function
        }
    }        
    
    render(){
        const {roles} = this.state.user;
        return isValidRole({roles, allowedRoles: allowedRoles}) ?
            <wrappedComponent/>:
            <h1> Hai! kamu tidak boleh masuk dihalaman ini, rasakan chidorii ini - regards {allowedRoles.join(', ')}</h1>
    }
}


/**
 * define administrator role
 * use: Admin(<Component/>)
 */
export const All = Authorization(['admin', 'manager', 'customer']);

/**
 * define user role
 * use: User(<Component/>)
 */
export const Guest = Authorization(['guest','user']);

export default {
    All,
    Guest,
}