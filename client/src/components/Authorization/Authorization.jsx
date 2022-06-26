import { React, useState } from 'react';
import { Input } from '../../utils/Input/Input';
import { authorization } from '../../actions/user';
import { useDispatch } from 'react-redux';
import './authorization.scss';

export const Authorization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div className='authorization'>
            <div className="authorization__header">Authorization</div>
            <Input value={email} setValue={setEmail} type='text' placeholder='Enter your email' />
            <Input value={password} setValue={setPassword} type='password' placeholder='Enter your password' />
            <button className="authorization__btn" onClick={() => dispatch(authorization(email, password))}>Log in</button>
        </div>
    )
}
