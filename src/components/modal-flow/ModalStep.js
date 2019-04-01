import { Component } from 'react';
import PropTypes from 'prop-types';

class ModalStep extends Component {
    render() {
        return this.props.children;
    }
}

ModalStep.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default ModalStep;
