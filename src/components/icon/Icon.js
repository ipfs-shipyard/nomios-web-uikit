import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.css';

class Icon extends Component {
    constructor(props) {
        super(props);

        if (typeof props.svg === 'string') {
            this.state = {
                contents: props.svg,
            };
        } else {
            this.state = {
                contents: null,
            };
        }
    }

    componentDidMount() {
        const { svg } = this.props;

        if (typeof svg === 'object') {
            svg.then((result) => {
                this.setState({ contents: result.default });
            });
        }
    }

    render() {
        const { svg, className, ...rest } = this.props;
        const { contents } = this.state;
        const finalProps = {
            ...rest,
            contents,
            className: classNames(styles.icon,
                className),
        };

        if (contents != null) {
            return <i { ...finalProps } dangerouslySetInnerHTML={ { __html: contents } } />;
        }

        return null;
    }
}

Icon.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ then: PropTypes.func.isRequired })]).isRequired,
    className: PropTypes.string,
};

export default Icon;
