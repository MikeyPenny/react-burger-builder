import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';

export default class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <Burger />
                <div>Build Controls</div>
            </Aux>
        );
    }
}
