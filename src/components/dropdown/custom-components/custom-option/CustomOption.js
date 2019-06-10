import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash';
import styles from './CustomOption.css';

const CustomOption = ({ innerProps, isSelected, isDisabled, isFocused, data, selectProps }) => {
    const optionClassName = classNames(styles.option, { [styles.focused]: isFocused }, selectProps.optionClassName);
    const optionProps = { isSelected, isDisabled, isFocused, defaultClassName: optionClassName, data: omit(data, 'render') };

    if (data.render || selectProps.renderOption) {
        return (
            <div { ...innerProps }>
                { data.render ? data.render(optionProps) : selectProps.renderOption(optionProps) }
            </div>
        );
    }

    return <div { ...innerProps } className={ optionClassName }>{ data.label }</div>;
};

CustomOption.propTypes = {
    selectProps: PropTypes.object.isRequired,
    innerProps: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};

export default CustomOption;
