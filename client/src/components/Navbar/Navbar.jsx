import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, showLoader } from '../../redux/actions/actions';
import { searchFiles, getFiles } from '../../actions/file';
import Logo from '../../assets/img/logo.svg';
import './navbar.scss';

export const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.files.currentDir);
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const dispatch = useDispatch();

    function searchHandler(e) {
        setSearchName(e.target.value);
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout);
        }

        dispatch(showLoader());
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir));
        }
    }

    return (
        <div className='navbar'>
            <div className="container">
                <img className='navbar__logo' src={Logo} alt='navbar-logo' />
                <div className="navbar__header">MERN CLOUD</div>
                {isAuth && <input className='navbar__search input' onChange={(e) => searchHandler(e)} type='text' placeholder='Enter file name' />}
                {!isAuth && <div className="navbar__btn navbar__login"><NavLink to='/login'>Log in</NavLink></div>}
                {!isAuth && <div className="navbar__btn navbar__registration"><NavLink to='/registration'>Sign in</NavLink></div>}
                {isAuth && <div className="navbar__btn navbar__login" onClick={() => dispatch(logout())}><a href='/'>Log out</a></div>}
            </div>
        </div>
    )
}
