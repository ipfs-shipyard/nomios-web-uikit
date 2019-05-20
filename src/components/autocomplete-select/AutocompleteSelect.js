import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import styles from './AutocompleteSelect.css';

const hideMenuWithNoOptions = () => 'No options available';

class AutocompleteSelect extends Component {
    render() {
        const { className, ...rest } = this.props;

        return (
            <Select
                { ...rest }
                onChange={ this.handleSelectChange }
                value={ this.getValueFromOptions() }
                className={ classNames(styles.container, className) }
                classNamePrefix="autocomplete" />
        );
    }

    getValueFromOptions() {
        return this.props.options.find((option) => option.value === this.props.value);
    }

    handleSelectChange = (option) => this.props.onChange(option.value);
}

AutocompleteSelect.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    noOptionsMessage: PropTypes.func,
    className: PropTypes.string,
};

AutocompleteSelect.defaultProps = {
    noOptionsMessage: hideMenuWithNoOptions,
};

export default AutocompleteSelect;
