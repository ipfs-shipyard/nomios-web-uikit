import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pick, omit } from 'lodash';
import styles from './Radio.css';

const INPUT_PROPS = ['id', 'name', 'autofocus', 'checked', 'defaultChecked', 'defaultValue', 'disabled', 'form', 'required', 'type', 'value', 'onChange'];

const Input = (props) => <input type="radio" { ...props } />;

const Radio = ({ label, className, ...rest }) => {
    const rootProps = omit(rest, INPUT_PROPS);
    const inputProps = pick(rest, INPUT_PROPS);

    const finalClasses = classNames(styles.inputContainer, className);

    if (!label) {
        return (
            <div { ...rootProps } className={ finalClasses }>
                <Input { ...inputProps } />
            </div>
        );
    }

    return (
        <div { ...rootProps } className={ finalClasses }>
            <label>
                <Input { ...inputProps } />
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
