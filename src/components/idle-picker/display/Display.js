import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Display.css';

const Display = ({ currentValue }) => {
    const ten = classNames(styles.ten, styles['digit-wrapper']);
    const one = classNames(styles.one, styles['digit-wrapper']);

    const tenDigit = Math.floor(currentValue / 10);
    const tens = [0, 1];
    const ones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className={ styles['display-wrapper'] }>
            <div className={ styles['counter-wrapper'] }>
                <div className={ styles['digits-display'] }>
                    <div className={ ten } style={ { transform: `translateY(${-9 * (tenDigit)}rem)` } }>
                        {tens.map((elem) => <div key={ elem } >{ elem }</div>)}
                    </div>
                </div>
                <div className={ styles['digits-display'] }>
                    <div className={ one } style={ { transform: `translateY(${-9 * (currentValue - 1)}rem)` } }>
                        {ones.map((elem) => <div key={ elem } >{ elem }</div>)}
                    </div>
                </div>
                <h3 className={ styles.minutes }>
                    min
                </h3>
            </div>
        </div>
    );
};

Display.propTypes = {
    currentValue: PropTypes.number.isRequired,
};

export default Display;
