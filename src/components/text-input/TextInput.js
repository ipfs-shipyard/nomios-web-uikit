import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FeedbackMessage from '../feedback-message';
import StrengthIndicator from './strength-indicator';
import { EyeIcon, EyeOffIcon } from '../icon';
import styles from './TextInput.css';

const LEVELS_NAME = ['poor', 'weak', 'fair', 'strong'];

class TextInput extends Component {
    state = {
        showPassword: false,
        feedbackMessageColor: undefined,
    };

    render() {
        const { label, className } = this.props;
        const finalClassNames = classNames(styles.wrapper, className);

        return (
            <div className={ finalClassNames }>
                { label && <label className={ styles.label }>{ label }</label> }
                { this.renderInput() }
                { this.renderHelperContainer() }
            </div>
        );
    }

    renderInput = () => {
        const { placeholder, type, lineType, lineStrength } = this.props;

        // Input handler props
        // eslint-disable-next-line react/prop-types
        const { onKeyDown, onKeyUp, onKeyPress, onChange, onInput, onFocus, onBlur } = this.props;

        const currentLevel = (typeof lineStrength !== 'undefined' && lineStrength >= 0 && lineStrength <= 1) && this.computeLevel();

        // Return input with no strength indication
        if (lineType === 'normal') {
            return (
                <input type={ type }
                    placeholder={ placeholder }
                    className={ styles[currentLevel] }
                    onKeyDown={ onKeyDown }
                    onKeyUp={ onKeyUp }
                    onKeyPress={ onKeyPress }
                    onChange={ onChange }
                    onInput={ onInput }
                    onFocus={ onFocus }
                    onBlur={ onBlur } />
            );
        }

        const { showPassword } = this.state;
        const eyeOffClasses = classNames(styles.eyeIcon, {
            [styles.hidden]: !showPassword,
            [styles.eyeOff]: showPassword,
        });

        // Return input with strength indication
        return (
            <div className={ styles.inputWrapper }>
                <input type={ showPassword ? 'text' : 'password' }
                    placeholder={ placeholder }
                    onKeyDown={ onKeyDown }
                    onKeyUp={ onKeyUp }
                    onKeyPress={ onKeyPress }
                    onChange={ onChange }
                    onInput={ onInput }
                    onFocus={ onFocus }
                    onBlur={ onBlur } />
                <StrengthIndicator
                    className={ styles.strengthIndicator }
                    levelName={ currentLevel }
                    strength={ lineStrength }
                    onColorChange={ this.handleStrengthColorChange } />
                <EyeIcon
                    className={ classNames(styles.eyeIcon, showPassword && styles.hidden) }
                    onClick={ this.handleToggleShowPassword } />
                <EyeOffIcon
                    className={ eyeOffClasses }
                    onClick={ this.handleToggleShowPassword } />
            </div>
        );
    };

    renderHelperContainer = () => {
        const { helperText, feedback } = this.props;

        if (!helperText && !feedback) {
            return;
        }

        return (
            <div className={ styles.helperContainer }>
                { this.renderHelperText() }
                { this.renderFeedbackMessage() }
            </div>
        );
    };

    renderHelperText = () => this.props.helperText && <span className={ styles.helperText }>{ this.props.helperText }</span>;

    renderFeedbackMessage = () => {
        const { feedback } = this.props;
        const finalClassNames = classNames(styles.feedbackMessage, feedback && feedback.className);

        return feedback && (
            <FeedbackMessage
                textColor={ this.state.feedbackMessageColor }
                type={ feedback.type }
                iconPosition="right"
                tooltip={ feedback.tooltip }
                className={ finalClassNames }>
                { feedback.message }
            </FeedbackMessage>
        );
    };

    computeLevel = () => {
        const { lineStrength } = this.props;
        const normalizedStrengthValue = Math.ceil(LEVELS_NAME.length * lineStrength);

        return normalizedStrengthValue > 0 ? LEVELS_NAME[normalizedStrengthValue - 1] : LEVELS_NAME[0];
    };

    handleToggleShowPassword = () => this.setState(({ showPassword }) => ({
        showPassword: !showPassword,
    }));

    handleStrengthColorChange = (color) => this.setState({ feedbackMessageColor: color });
}

TextInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    helperText: PropTypes.string,
    lineType: PropTypes.oneOf(['normal', 'dashed']),
    lineStrength: PropTypes.number,
    feedback: PropTypes.shape({
        message: PropTypes.string.isRequired,
        type: PropTypes.string,
        tooltip: PropTypes.node,
        className: PropTypes.string,
    }),
    className: PropTypes.string,
};

TextInput.defaultProps = {
    lineType: 'normal',
    type: 'text',
};

export default TextInput;
