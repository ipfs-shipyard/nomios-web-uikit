import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { ChevronIcon } from '../../../icon';
import classNames from 'classnames';
import styles from './DefaultTrigger.css';

const DefaultTrigger = ({ selectedData, placeholder, menuIsOpen, className }) => {
    const triggerClassName = classNames(styles.trigger, {
        [styles.menuIsOpen]: menuIsOpen,
        [styles.placeholder]: !selectedData,
    }, className);

    let children;

    if (!selectedData) {
        children = placeholder;
    } else if (selectedData.render) {
        const selectedOptionProps = { isSelected: false, isDisabled: false, isFocused: false, data: omit(selectedData, 'render') };

        children = selectedData.render(selectedOptionProps);
    } else {
        children = selectedData.label ? selectedData.label : selectedData.value;
    }

    return (
        <div className={ triggerClassName }>
            { children }
            <ChevronIcon className={ styles.chevron } />
        </div>
    );
};

DefaultTrigger.propTypes = {
    selectedData: PropTypes.object,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    menuIsOpen: PropTypes.bool,
};

export default DefaultTrigger;
