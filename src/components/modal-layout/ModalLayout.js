import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LogoIcon } from '../icon';
import styles from './ModalLayout.css';

class ModalLayout extends Component {
    state = {
        stepIndex: 0,
    };

    render() {
        const { variant } = this.props;
        const finalWrapperClasses = classNames(styles.panelWrapper, styles[variant]);

        return (
            <div className={ finalWrapperClasses }>
                <div className={ styles.leftPanel } onClick={ this.handleLeftPanelClick }><LogoIcon /></div>
                { this.renderRightPanel() }
            </div>
        );
    }

    renderRightPanel = () => (
        <div className={ styles.rightPanel }>
            { this.renderSteps() }
        </div>
    );

    renderSteps = () => {
        const { children } = this.props;
        const { stepIndex } = this.state;
        const transform = stepIndex > 0 && `translateY(calc(-${100 * stepIndex}% - ${2 * stepIndex}rem))`;

        if (!Array.isArray(children)) {
            return <div className={ classNames(styles.rightContent, styles.activeStep) }>{ children }</div>;
        }

        return children.map((child, index) => {
            const step = typeof child.type === 'function' ? React.cloneElement(child, { requestNextStep: this.handleNextStep }) : child;
            const finalClassNames = classNames(
                styles.rightContent,
                styles.arrayElement,
                this.state.stepIndex === index && styles.activeStep
            );

            return (
                <div key={ index }
                    style={ { transform } }
                    className={ finalClassNames }>
                    { step }
                </div>
            );
        });
    };

    handleNextStep = () => {
        const { stepIndex } = this.state;
        const totalSteps = this.props.children.length;

        if (stepIndex + 1 > totalSteps - 1) {
            return;
        }

        this.setState({ stepIndex: stepIndex + 1 });
    };
}

ModalLayout.propTypes = {
    variant: PropTypes.oneOf(['half-panel', 'half-panel-bordered', 'wide-panel']),
    children: PropTypes.node.isRequired,

};

ModalLayout.defaultProps = {
    variant: 'half-panel',
};

export default ModalLayout;
