import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RemoveIcon } from '../icon';
import styles from './BoxedStar.css';

class BoxedStar extends Component {
    render() {
        const { children, onRemove, className, contentClassName, removeClassName } = this.props;

        return (
            <div className={ classNames(styles.container, className) }>
                { onRemove &&
                    <RemoveIcon
                        className={ classNames(styles.remove, removeClassName) }
                        onClick={ this.handleRemove } />
                }
                <div className={ classNames(styles.content, contentClassName) }>
                    { children }
                </div>
            </div>
        );
    }

    handleRemove = (event) => this.props.onRemove(event, this.props.id);
}

BoxedStar.propTypes = {
    children: PropTypes.node,
    onRemove: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    removeClassName: PropTypes.string,
};

export default BoxedStar;
