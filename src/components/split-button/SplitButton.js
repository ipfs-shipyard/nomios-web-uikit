import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoizeOne from 'memoize-one';
import Dropdown from '../dropdown';
import { ActionsIcon } from '../icon';
import styles from './SplitButton.css';

const getOptionsAndMainAction = memoizeOne((actions, mainActionIdProp) => actions.reduce((acc, action) => {
    const mainActionId = mainActionIdProp ? mainActionIdProp : actions[0].id;

    if (action.id === mainActionId) {
        acc.mainAction = action;
    } else {
        acc.options.push({ value: action.id, ...action });
    }

    return acc;
}, { options: [] }));

class SplitButton extends Component {
    static getDerivedStateFromProps(props) {
        return {
            ...getOptionsAndMainAction(props.actions, props.mainActionId),
        };
    }

    state = {
        mainAction: undefined,
        options: undefined,
        menuIsOpen: false,
    };

    render() {
        const { menuIsOpen, options } = this.state;
        const { variant, actions, mainActionId, onActionClick, ...rest } = this.props;

        return (
            <Dropdown
                menuIsOpen={ menuIsOpen }
                menuClassName={ styles.menu }
                options={ options }
                onBlur={ this.handleDropdownBlur }
                renderOption={ this.customOption }
                renderTrigger={ this.customTrigger }
                onChange={ this.handleDropdownChange }
                { ...rest } />
        );
    }

    customTrigger = () => {
        const { variant } = this.props;
        const { menuIsOpen, mainAction } = this.state;

        const triggerButtonClasses = classNames(
            styles.button,
            styles[variant],
            styles.triggerButton,
            menuIsOpen && styles.menuIsOpen,
        );

        return (
            <div className={ styles.container }>
                <button
                    disabled={ mainAction.disabled }
                    className={ classNames(styles.button, styles[variant]) }
                    onClick={ this.handleMainActionClick }>
                    { mainAction.icon }
                    { mainAction.text && <span>{ mainAction.text }</span> }
                </button>
                <button
                    className={ triggerButtonClasses }
                    onClick={ this.handleToggleMenu }>
                    <ActionsIcon />
                </button>
            </div>
        );
    };

    customOption = ({ data }) => {
        const { variant } = this.props;

        return (
            <button className={ classNames(styles.button, styles[variant]) } disabled={ data.disabled }>
                { data.icon }
                { data.text && <span>{ data.text }</span> }
            </button>
        );
    };

    resetMenuState() {
        this.setState({ menuIsOpen: false });
    }

    handleActionClick({ id, onClick }) {
        const { onActionClick } = this.props;

        if (onClick) {
            onClick(id);
        } else {
            onActionClick && onActionClick(id);
        }
    }

    handleToggleMenu = () => {
        this.setState(({ menuIsOpen }) => ({ menuIsOpen: !menuIsOpen }));
    };

    handleDropdownBlur = () => {
        this.resetMenuState();
    };

    handleDropdownChange = (action) => {
        this.handleActionClick(action);
        this.resetMenuState();
    };

    handleMainActionClick = () => {
        this.handleActionClick(this.state.mainAction);
    };
}

SplitButton.propTypes = {
    variant: PropTypes.oneOf(['primary', 'negative']),
    actions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        icon: PropTypes.element,
        onClick: PropTypes.func,
        text: PropTypes.string,
    })).isRequired,
    mainActionId: PropTypes.string,
    onActionClick: PropTypes.func,
};

SplitButton.defaultProps = {
    variant: 'primary',
};

export default SplitButton;
