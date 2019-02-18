import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Badge.css';

export default class Badge extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.function,
        children: PropTypes.node.isRequired,
    };

    render() {
        const { selected, disabled, children, onClick, ...rest } = this.props;
        const finalClassName = classNames(
            styles.badge,
            selected && styles.selected
        );

        return (
            <button { ...rest } onClick={ onClick } className={ finalClassName } disabled={ disabled }>
                <div>
                    <span>{ children }</span>
                </div>
            </button>
        );
    }
}
