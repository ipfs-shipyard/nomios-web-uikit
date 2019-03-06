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

export default class IdlePicker extends Component {
    static propTypes = {
        defaultValue: PropTypes.number,
        handlePickerChange: PropTypes.func,
    };

    static defaultProps = {
        defaultValue: 3,
    };

    constructor(props) {
        super(props);

        let { defaultValue } = this.props;

        if (defaultValue > 10 || defaultValue < 1) {
            defaultValue = 3;
        }

        this.state = {
            displayValue: defaultValue,
            pickerValue: defaultValue,
            forcePickerValue: true,
        };

        this.componentRef = React.createRef();
        this.previousHandleWasBeforeChange = false;
    }

    componentDidMount() {
        const picker = this.componentRef.current;
        const handle = picker.querySelector('.rc-slider-handle');
        const track = picker.querySelector('.rc-slider-track');

        this.handleClick = false;
        this.mouseUpOnElement = false;

        const appendClass = () => {
            if (!track.classList.contains('handle-hover')) {
                track.classList.add('handle-hover');
                this.setState(this.state);
            }
        };

        const removeClass = () => {
            if (track.classList.contains('handle-hover') && !this.handleClick) {
                track.classList.remove('handle-hover');
                handle.blur();
                this.setState(this.state);
            }
        };

        const setClick = () => {
            this.handleClick = true;
        };

        const unsetClick = (onElement) => {
            if (onElement) {
                this.mouseUpOnElement = true;
            } else {
                this.handleClick = false;
                !this.mouseUpOnElement && removeClass();
                this.mouseUpOnElement = false;
            }
        };

        const keyboardMove = (event) => {
            const { pickerValue } = this.state;

            switch (event.key) {
            case 'LEFT':
            case 'ArrowLeft':
            case 'DOWN':
            case 'ArrowDown':
                pickerValue > 1 && this.updateValue(pickerValue - 1, pickerValue - 1, true, true);
                break;
            case 'RIGHT':
            case 'ArrowRight':
            case 'UP':
            case 'ArrowUp':
                pickerValue < 10 && this.updateValue(pickerValue + 1, pickerValue + 1, true, true);
                break;
            default:
            }
        };

        handle.addEventListener('mouseenter', appendClass);
        handle.addEventListener('mouseleave', removeClass);
        handle.addEventListener('focusin', appendClass);
        handle.addEventListener('blur', removeClass);

        handle.addEventListener('keydown', keyboardMove);

        handle.addEventListener('mousedown', setClick);
        handle.addEventListener('mouseup', () => unsetClick(true));
        window.addEventListener('mouseup', () => unsetClick(false));
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
        this.updateValue(null, null, false);
    };

    update = (value) => {
        const roundValue = Math.round(value);

        if (roundValue !== this.state.displayValue) {
            if (this.previousHandleWasBeforeChange) {
                this.updateValue(roundValue, roundValue, true);
            } else {
                this.updateValue(null, roundValue, false);
            }
        }
        this.previousHandleWasBeforeChange = false;
    };

    afterChange = () => {
        this.previousHandleWasBeforeChange = false;
        this.updateValue(this.state.displayValue, null, true, true);
    };

    updateValue = (pickerValue, displayValue, forcePickerValue, isAfter) => {
        const newState = {};

        if (pickerValue != null) {
            newState.pickerValue = pickerValue;
        }
        if (displayValue != null) {
            newState.displayValue = displayValue;
        }
        if (forcePickerValue != null) {
            newState.forcePickerValue = forcePickerValue;
        }

        this.setState(newState);

        isAfter && this.props.handlePickerChange && this.props.handlePickerChange(pickerValue);
    };
}
