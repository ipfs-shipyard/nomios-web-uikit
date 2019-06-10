import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import Select from 'react-select';
import {
    CustomControl,
    CustomInput,
    CustomOption,
    CustomMenu,
    CustomMenuList,
    CustomValueContainer,
    NullComponent,
    DefaultTrigger,
} from './custom-components';

class Dropdown extends Component {
    render() {
        return (
            <Select
                { ...this.props }
                onChange={ this.handleChange }
                components={ {
                    Control: CustomControl,
                    Input: CustomInput,
                    Option: CustomOption,
                    Menu: CustomMenu,
                    MenuList: CustomMenuList,
                    ValueContainer: CustomValueContainer,
                    IndicatorsContainer: NullComponent,
                    Placeholder: NullComponent,
                    SingleValue: NullComponent,
                } } />
        );
    }

    handleChange = (data) => this.props.onChange && this.props.onChange(omit(data, 'render'));
}

Dropdown.propTypes = {
    arrowPlacement: PropTypes.oneOf(['left', 'center', 'right', 'none']),
    menuListClassName: PropTypes.string,
    controlClassName: PropTypes.string,
    triggerClassName: PropTypes.string,
    optionClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    renderTrigger: PropTypes.func,
    placeholder: PropTypes.string,
    renderOption: PropTypes.func,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    placeholder: 'Select from the list',
    renderTrigger: DefaultTrigger,
    arrowPlacement: 'none',
};

export default Dropdown;
