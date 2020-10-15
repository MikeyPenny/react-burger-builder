import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo height="80%" />
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;
