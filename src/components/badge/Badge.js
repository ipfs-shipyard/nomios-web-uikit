import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Badge.css';

export default class Badge extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.function,
        hideOverflow: PropTypes.bool,
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        hideOverflow: true,
    };

    render() {
        const { selected, disabled, hideOverflow, children, onClick, ...rest } = this.props;
        const finalClassName = classNames(
            styles.badge,
            selected && styles.selected,
            hideOverflow && styles['hide-overflow']
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
