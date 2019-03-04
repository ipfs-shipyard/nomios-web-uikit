import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './StrengthIndicator.css';

const MAX_ANIMATION_DURATION = 0.4; // In seconds
const LEVELS_ARRAY = ['poor', 'weak', 'fair', 'strong'];

export default class StrengthIndicator extends PureComponent {
    static propTypes = {
        range: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number,
        }).isRequired,
        strength: PropTypes.number.isRequired,
        numberOfLevels: PropTypes.number,
        onColorChange: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        numberOfLevels: 4,
    };

    constructor(props) {
        super(props);

        this.levelArray = new Array(props.numberOfLevels).fill(0);
        this.lastFilledElement = 0;
        this.currentLevel = undefined;
        this.innerElementRef = React.createRef();
    }

    componentDidMount() {
        this.handlePossibleColorChange();
    }

    componentDidUpdate() {
        this.lastFilledElement = this.normalizedStrength;
        this.handlePossibleColorChange();
    }

    render() {
        const { className } = this.props;

        return (
            <div className={ classNames(styles.indicatorContainer, className) } >
                { this.renderLevelElements() }
            </div>
        );
    }

    renderLevelElements = () => {
        this.normalizedStrength = this.normalizeStrength(this.props.numberOfLevels);
        const directionUp = this.lastFilledElement < this.normalizedStrength;
        const animationDuration = this.calculateAnimationDuration();

        this.currentLevel = this.computeCurrentLevel();
        const innerElementClasses = classNames(
            styles.innerElement,
            styles[this.currentLevel],
        );

        return this.levelArray
        .map((_, i) => {
            const multiplier = this.calculateMultiplier(i, directionUp);
            const transitionDelay = multiplier * animationDuration;
            const innerElementStyle = {
                transitionDelay: `${transitionDelay}s`,
                transitionDuration: `${animationDuration}s`,
            };

            return (
                <div className={ classNames(i < this.normalizedStrength && styles.filled) } key={ i }>
                    <div ref={ i === 0 && this.innerElementRef } style={ innerElementStyle } className={ innerElementClasses } />
                </div>
            );
        });
    };

    normalizeStrength = (numberOfLevels) => {
        const { range, strength } = this.props;

        return Math.round(numberOfLevels * (strength - range.min) / (range.max - range.min));
    };

    calculateMultiplier = (index, directionUp) => {
        if (!directionUp) {
            return (this.lastFilledElement - 1) - index;
        }

        if (index - this.lastFilledElement < 1) {
            return 0;
        }

        return index - this.lastFilledElement;
    };

    calculateAnimationDuration = () => {
        const numberOfLevelsToAnimate = this.normalizedStrength - this.lastFilledElement;

        return numberOfLevelsToAnimate !== 0 ? Math.abs(MAX_ANIMATION_DURATION / numberOfLevelsToAnimate) : 0;
    };

    computeCurrentLevel = () => {
        const normalizedStrengthLevel = this.normalizeStrength(LEVELS_ARRAY.length);
        const computedLevel = normalizedStrengthLevel > 0 ? LEVELS_ARRAY[normalizedStrengthLevel - 1] : LEVELS_ARRAY[0];

        this.hasColorChanged = computedLevel !== this.currentLevel;

        return computedLevel;
    };

    handlePossibleColorChange = () => {
        if (this.hasColorChanged) {
            const firstInnerElement = findDOMNode(this.innerElementRef.current);
            const backgroundColor = window.getComputedStyle(firstInnerElement).getPropertyValue('background-color');

            this.props.onColorChange(backgroundColor);
        }
    };
}
