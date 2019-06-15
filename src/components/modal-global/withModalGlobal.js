import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import ModalGlobalConsumer from './ModalGlobalConsumer';

const withModalGlobal = (WrappedComponent) => {
    class WithModalGlobal extends PureComponent {
        render() {
            return (
                <ModalGlobalConsumer>
                    { ({ openModal, closeModal }) => (
                        <WrappedComponent
                            { ...this.props }
                            globalModal={ { openModal, closeModal } } />
                    ) }
                </ModalGlobalConsumer>
            );
        }
    }

    WithModalGlobal.contextTypes = {
        globalModal: PropTypes.object,
    };

    return WithModalGlobal;
};

export default withModalGlobal;
