import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pick } from 'lodash';
import FeedbackMessage from '../feedback-message';
import StrengthIndicator from './strength-indicator';
import { EyeIcon, EyeOffIcon } from '../icon';
import styles from './TextInput.css';

const LEVELS_NAME = ['poor', 'weak', 'fair', 'strong'];
const INPUT_PROPS = ['id', 'name', 'value', 'defaultValue', 'placeholder', 'autoComplete', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onChange', 'onInput', 'onFocus', 'onBlur', 'onCut', 'onCopy', 'onPaste'];

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

    renderInput() {
        const { type, lineType, lineStrength } = this.props;

        const inputProps = pick(this.props, INPUT_PROPS);
        const currentLevel = lineStrength >= 0 && lineStrength <= 1 ? this.computeLevel() : undefined;

        // Return input with no strength indication
        if (lineType === 'normal') {
            return (
                <input type={ type }
                    className={ styles[currentLevel] }
                    { ...inputProps } />
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
                    { ...inputProps } />
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
    }

    renderHelperContainer() {
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
    }

    renderHelperText() {
        return this.props.helperText && <span className={ styles.helperText }>{ this.props.helperText }</span>;
    }

    renderFeedbackMessage() {
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
    }

    computeLevel() {
        const { lineStrength } = this.props;
        const normalizedStrengthValue = Math.ceil(LEVELS_NAME.length * lineStrength);

        return normalizedStrengthValue > 0 ? LEVELS_NAME[normalizedStrengthValue - 1] : LEVELS_NAME[0];
    }

    handleToggleShowPassword = () => this.setState(({ showPassword }) => ({
        showPassword: !showPassword,
    }));

    handleStrengthColorChange = (color) => this.setState({ feedbackMessageColor: color });
}

TextInput.propTypes = {
    label: PropTypes.string,
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
