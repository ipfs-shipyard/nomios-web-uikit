import React, { Component } from 'react';
import { default as RcSlider } from 'rc-slider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Display from './display/Display';

import styles from './Slider.css';
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

export default class Slider extends Component {
    static propTypes = {
        defaultValue: PropTypes.number,
        handleSliderChange: PropTypes.func,
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
            sliderValue: defaultValue,
            forceSliderValue: true,
        };

        this.componentRef = React.createRef();
        this.previousHandleWasBeforeChange = false;
    }

    componentDidMount() {
        const slider = this.componentRef.current;
        const handle = slider.querySelector('.rc-slider-handle');
        const track = slider.querySelector('.rc-slider-track');

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
            const { sliderValue } = this.state;

            switch (event.key) {
            case 'LEFT':
            case 'ArrowLeft':
            case 'DOWN':
            case 'ArrowDown':
                sliderValue > 1 && this.updateValue(sliderValue - 1, sliderValue - 1, true, true);
                break;
            case 'RIGHT':
            case 'ArrowRight':
            case 'UP':
            case 'ArrowUp':
                sliderValue < 10 && this.updateValue(sliderValue + 1, sliderValue + 1, true, true);
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
        const { sliderValue, displayValue, forceSliderValue } = this.state;

        const sliderProps = {
            min: 1,
            max: 10,
            step: 0.01,
            marks,
            onChange: this.update,
            onAfterChange: this.afterChange,
            onBeforeChange: this.beforeChange,
        };
        const finalClassName = classNames(
            styles['slider-container']
        );

        if (forceSliderValue === true) {
            sliderProps.value = sliderValue;
            sliderProps.className = classNames(styles['rc-slider-main'], styles['slider-component']);
        } else {
            sliderProps.className = classNames(styles['is-focused'], styles['slider-component']);
        }

        return (
            <div className={ finalClassName } ref={ this.componentRef }>
                <Display currentValue={ displayValue } />
                <RcSlider { ...sliderProps } />
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

    updateValue = (sliderValue, displayValue, forceSliderValue, isAfter) => {
        const newState = {};

        if (sliderValue != null) {
            newState.sliderValue = sliderValue;
        }
        if (displayValue != null) {
            newState.displayValue = displayValue;
        }
        if (forceSliderValue != null) {
            newState.forceSliderValue = forceSliderValue;
        }

        this.setState(newState);

        isAfter && this.props.handleSliderChange && this.props.handleSliderChange(sliderValue);
    };
}
