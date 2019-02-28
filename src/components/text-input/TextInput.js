import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FeedbackMessage from '../feedback-message';
import StrengthIndicator from './strength-indicator';
import { EyeIcon, EyeOffIcon } from '../icon';
import styles from './TextInput.css';

export default class TextInput extends Component {
    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.oneOf(['text', 'password']),
        helperText: PropTypes.string,
        successLine: PropTypes.bool,
        feedback: PropTypes.shape({
            message: PropTypes.string.isRequired,
            type: PropTypes.string,
            className: PropTypes.string,
        }),
        strengthIndicator: PropTypes.shape({
            range: PropTypes.object,
            strength: PropTypes.number,
            numberOfLevels: PropTypes.number,
        }),
        onChange: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        type: 'text',
    };

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
        const { placeholder, type, successLine, strengthIndicator } = this.props;

        // Return input with no strength indication
        if (!strengthIndicator) {
            return (
                <input type={ type }
                    placeholder={ placeholder }
                    onChange={ this.handleChange }
                    className={ successLine && styles.success } />
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
                <input type={ showPassword ? 'text' : 'password' } placeholder={ placeholder } onChange={ this.handleChange } />
                <StrengthIndicator
                    className={ styles.strengthIndicator }
                    range={ strengthIndicator.range }
                    strength={ strengthIndicator.strength }
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
                className={ finalClassNames }>
                { feedback.message }
            </FeedbackMessage>
        );
    };

    handleToggleShowPassword = () => this.setState(({ showPassword }) => ({
        showPassword: !showPassword,
    }));

    handleChange = (event) => this.props.onChange && this.props.onChange(event);

    handleStrengthColorChange = (color) => this.setState({ feedbackMessageColor: color });
}
