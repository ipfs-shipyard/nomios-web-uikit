import PropTypes from 'prop-types';

const ModalStep = (props) => props.children;

ModalStep.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default ModalStep;
