import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';

import styles from './AutocompleteSelect.css';

const hideMenuWithNoOptions = () => 'No options available';

const AutocompleteSelect = ({ className, ...rest }) => (
    <Select
        { ...rest }
        className={ classNames(styles.container, className) }
        classNamePrefix="autocomplete" />
);

AutocompleteSelect.propTypes = {
    noOptionsMessage: PropTypes.func,
    className: PropTypes.string,
};

AutocompleteSelect.defaultProps = {
    noOptionsMessage: hideMenuWithNoOptions,
};

export default AutocompleteSelect;
