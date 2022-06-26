import React, { useEffect } from 'react';
import { Navbar } from "./Navbar/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Registration } from './Registration/Registration';
import { Authorization } from './Authorization/Authorization';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import { Disk } from './Disk/Disk';
import './app.scss';

export function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <div className="wrap">
                    {!isAuth ?
                        <Routes>
                            <Route path='/registration' element={<Registration />} />
                            <Route path='/login' element={<Authorization />} />
                            <Route path='*' element={<Navigate to='/login' replace />} />
                        </Routes>
                        :
                        <Routes>
                            <Route path='/' element={<Disk />} />
                            <Route path='*' element={<Navigate to='/' replace />} />
                        </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}
