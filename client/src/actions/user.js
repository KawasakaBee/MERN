import axios from 'axios';
import { createUser } from '../redux/actions/actions';

export const registration = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {email, password});
        alert(response.data.message);
    } catch (e) {
        alert(e.response.data);
    }
}

export const authorization = (email, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {email, password});
        await dispatch(createUser(response.data.user));
        localStorage.setItem('token', response.data.token);
    } catch (e) {
        alert(e.response.data);
    }
}

export const auth = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/api/auth/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        await dispatch(createUser(response.data.user));
        localStorage.setItem('token', response.data.token);
    } catch (e) {
        localStorage.removeItem('token');
    }
}

