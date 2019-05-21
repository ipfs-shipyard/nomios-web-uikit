import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';
import Select from 'react-select';
import styles from './AutocompleteSelect.css';

const hideMenuWithNoOptions = () => 'No options available';

class AutocompleteSelect extends Component {
    getValueFromOptions = memoize((options, value) => options.find((option) => option.value === value));

    render() {
        const { className, value, ...rest } = this.props;
        const valueObj = this.getValueFromOptions(this.props.options, value);

        return (
            <Select
                { ...rest }
                value={ valueObj }
                classNamePrefix="autocomplete"
                onChange={ this.handleSelectChange }
                className={ classNames(styles.container, className) } />
        );
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
