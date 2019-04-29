import React, { Component } from 'react';
import { default as RcSlider } from 'rc-slider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Display from './display/Display';
import styles from './IdlePicker.css';
import 'rc-slider/assets/index.css';

const marks = {
    1: '01',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '10',
};

class IdlePicker extends Component {
    componentRef = React.createRef();
    previousHandleWasBeforeChange = false;
    handleClick = false;
    mouseUpOnElement = false;
    picker = undefined;
    handle = undefined;
    track = undefined;

    constructor(props) {
        super(props);

        const value = Math.max(Math.min(this.props.defaultValue, 10), 1);

        this.state = {
            displayValue: value,
            pickerValue: value,
            forcePickerValue: true,
        };
    }

    componentDidMount() {
        this.picker = this.componentRef.current;
        this.handle = this.picker.querySelector('.rc-slider-handle');
        this.track = this.picker.querySelector('.rc-slider-track');

        this.handle.addEventListener('mouseenter', this.handleHandleMouseEnter);
        this.handle.addEventListener('mouseleave', this.handleHandleMouseLeave);
        this.handle.addEventListener('focusin', this.handleHandleFocus);
        this.handle.addEventListener('blur', this.handleHandleBlur);

        this.handle.addEventListener('keydown', this.handleHandleKeyDown);

        this.handle.addEventListener('mousedown', this.handleHandleMouseDown);
        this.handle.addEventListener('mouseup', this.handleHandleMouseUp);
        window.addEventListener('mouseup', this.handleDocumentMouseUp);
    }

    render() {
        const { pickerValue, displayValue, forcePickerValue } = this.state;
        const pickerProps = {
            min: 1,
            max: 10,
            step: 0.01,
            marks,
            onChange: this.update,
            onAfterChange: this.afterChange,
            onBeforeChange: this.beforeChange,
        };
        const finalClassName = classNames(
            styles['picker-container']
        );

        if (forcePickerValue === true) {
            pickerProps.value = pickerValue;
            pickerProps.className = classNames(styles['rc-slider-main'], styles['slider-component']);
        } else {
            pickerProps.className = classNames(styles['is-focused'], styles['slider-component']);
        }

        return (
            <div className={ finalClassName } ref={ this.componentRef }>
                <Display currentValue={ displayValue } />
                <RcSlider { ...pickerProps } />
            </div>
        );
    }

    beforeChange = () => {
        this.previousHandleWasBeforeChange = true;
        this.setState({ forcePickerValue: false });
    };

    update = (value) => {
        const roundValue = Math.round(value);

        if (roundValue !== this.state.displayValue) {
            if (this.previousHandleWasBeforeChange) {
                this.setState({ pickerValue: roundValue, displayValue: roundValue, forcePickerValue: true });
            } else {
                this.setState({ displayValue: roundValue });
            }
        }
        this.previousHandleWasBeforeChange = false;
    };

    afterChange = (value) => {
        this.previousHandleWasBeforeChange = false;
        const roundedValue = Math.round(value);

        this.setState({ pickerValue: roundedValue, displayValue: roundedValue, forcePickerValue: true });
        this.props.onChange && this.props.onChange(roundedValue);
    };

    appendClassToTrack = () => {
        if (!this.track.classList.contains('handle-hover')) {
            this.track.classList.add('handle-hover');
            this.setState(this.state);
        }
    };

    removeClassFromTrack = () => {
        if (this.track.classList.contains('handle-hover') && !this.handleClick) {
            this.track.classList.remove('handle-hover');

            this.handle.blur();
        }
    };

    unsetHandleClick = (onElement) => {
        if (onElement) {
            this.mouseUpOnElement = true;
        } else {
            this.handleClick = false;
            !this.mouseUpOnElement && this.removeClassFromTrack();
            this.mouseUpOnElement = false;
        }
    };

    handleHandleMouseEnter = () => {
        this.appendClassToTrack();
    };

    handleHandleMouseLeave = () => {
        this.removeClassFromTrack();
    };

    handleHandleFocus = () => {
        this.appendClassToTrack();
    };

    handleHandleBlur = () => {
        this.removeClassFromTrack();
    };

    handleHandleKeyDown = (event) => {
        const { pickerValue } = this.state;

        switch (event.key) {
        case 'LEFT':
        case 'ArrowLeft':
        case 'DOWN':
        case 'ArrowDown':
            pickerValue > 1 && this.setState({ pickerValue: pickerValue - 1, displayValue: pickerValue - 1, forcePickerValue: true });
            this.props.onChange && this.props.onChange(pickerValue - 1);
            break;
        case 'RIGHT':
        case 'ArrowRight':
        case 'UP':
        case 'ArrowUp':
            pickerValue < 10 && this.setState({ pickerValue: pickerValue + 1, displayValue: pickerValue + 1, forcePickerValue: true });
            this.props.onChange && this.props.onChange(pickerValue + 1);
            break;
        default:
        }
    };

    handleHandleMouseDown = () => {
        this.handleClick = true;
    };

    handleHandleMouseUp = () => {
        this.unsetHandleClick(true);
    };

    handleDocumentMouseUp = () => {
        this.unsetHandleClick(false);
    };
}

IdlePicker.propTypes = {
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
};

IdlePicker.defaultProps = {
    defaultValue: 3,
};

export default IdlePicker;
