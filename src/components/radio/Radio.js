import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Radio.css';

const Input = (props) => <input type="radio" { ...props } />;

const Radio = ({ label, className, ...rest }) => {
    const finalClasses = classNames(styles.inputContainer, className);

    if (!label) {
        return (
            <div className={ finalClasses }>
                <Input { ...rest } />
            </div>
        );
    }

    return (
        <div className={ finalClasses }>
            <label>
                <Input { ...rest } />
                <span>{ label }</span>
            </label>
        </div>
    );
};

Radio.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
};

export default Radio;
