import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash';
import styles from './CustomOption.css';

const CustomOption = ({ innerProps, isSelected, isDisabled, isFocused, data, selectProps }) => {
    const optionClassName = classNames(styles.option, { [styles.focused]: isFocused }, selectProps.optionClassName);
    const optionProps = { isSelected, isDisabled, isFocused, defaultClassName: optionClassName, data: omit(data, 'render') };

    return (
        <div { ...innerProps } className={ data.render ? undefined : optionClassName }>
            { data.render ? data.render(optionProps) : data.label }
        </div>
    );
};

CustomOption.propTypes = {
    selectProps: PropTypes.object,
    innerProps: PropTypes.object,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    children: PropTypes.node,
    data: PropTypes.object,
};

export default CustomOption;
