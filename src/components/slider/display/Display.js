import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Display.css';

export default class Display extends Component {
    static propTypes = {
        currentValue: PropTypes.number.isRequired,
    };

    render() {
        const { currentValue } = this.props;
        const displayWrapper = classNames(styles['display-wrapper']);
        const counterWrapper = classNames(styles['counter-wrapper']);
        const digitsDisplay = classNames(styles['digits-display']);
        const ten = classNames(styles.ten, styles['digit-wrapper']);
        const one = classNames(styles.one, styles['digit-wrapper']);
        const minText = classNames(styles.minutes);

        const tenDigit = Math.floor(currentValue / 10);
        const tens = [0, 1];
        const ones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        return (
            <div className={ displayWrapper }>
                <div className={ counterWrapper }>
                    <div className={ digitsDisplay }>
                        <div className={ ten } style={ { transform: `translateY(${-9 * (tenDigit)}rem)` } }>
                            {tens.map((elem) => <div key={ elem } >{ elem }</div>)}
                        </div>
                    </div>
                    <div className={ digitsDisplay }>
                        <div className={ one } style={ { transform: `translateY(${-9 * (currentValue - 1)}rem)` } }>
                            {ones.map((elem) => <div key={ elem } >{ elem }</div>)}
                        </div>
                    </div>
                    <h3 className={ minText }>
                        min
                    </h3>
                </div>
            </div>
        );
    }

    handleTransitionEnd = () => {
        const { currentValue } = this.props;

        this.setState({ latestValue: currentValue });
    };
}
