import PropTypes from 'prop-types';

const FlowModalStep = (props) => props.children;

FlowModalStep.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default FlowModalStep;
