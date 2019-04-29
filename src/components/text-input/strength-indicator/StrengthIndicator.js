import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './StrengthIndicator.css';

const MAX_ANIMATION_DURATION = 0.4; // In seconds

class StrengthIndicator extends PureComponent {
    lastFilledElement = 0;
    currentLevelName = undefined;
    innerElementRef = React.createRef();

    constructor(props) {
        super(props);

        this.levelArray = new Array(props.numberOfLevels).fill(0);
    }

    componentDidMount() {
        this.maybeReportColorChange();
    }

    componentDidUpdate() {
        this.lastFilledElement = this.normalizedStrength;
        this.maybeReportColorChange();
    }

    render() {
        const { className } = this.props;

        return (
            <div className={ classNames(styles.indicatorContainer, className) } >
                { this.renderLevelElements() }
            </div>
        );
    }

    renderLevelElements() {
        this.normalizedStrength = this.normalizeStrength(this.props.numberOfLevels);
        this.hasColorChanged = this.props.levelName !== this.currentLevelName;
        this.currentLevelName = this.props.levelName;

        const directionUp = this.lastFilledElement < this.normalizedStrength;
        const animationDuration = this.calculateAnimationDuration();
        const innerElementClasses = classNames(
            styles.innerElement,
            styles[this.currentLevelName],
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
                    <div ref={ i === 0 ? this.innerElementRef : null } style={ innerElementStyle } className={ innerElementClasses } />
                </div>
            );
        });
    }

    normalizeStrength(numberOfLevels) {
        const { strength } = this.props;

        return Math.ceil(numberOfLevels * strength);
    }

    calculateMultiplier(index, directionUp) {
        if (!directionUp) {
            return (this.lastFilledElement - 1) - index;
        }

        if (index - this.lastFilledElement < 1) {
            return 0;
        }

        return index - this.lastFilledElement;
    }

    calculateAnimationDuration() {
        const numberOfLevelsToAnimate = this.normalizedStrength - this.lastFilledElement;

        return numberOfLevelsToAnimate !== 0 ? Math.abs(MAX_ANIMATION_DURATION / numberOfLevelsToAnimate) : 0;
    }

    maybeReportColorChange() {
        if (this.hasColorChanged) {
            const firstInnerElement = findDOMNode(this.innerElementRef.current);
            const backgroundColor = window.getComputedStyle(firstInnerElement).getPropertyValue('background-color');

            this.props.onColorChange(backgroundColor);
        }
    }
}

StrengthIndicator.propTypes = {
    strength: PropTypes.number.isRequired,
    levelName: PropTypes.string,
    numberOfLevels: PropTypes.number,
    onColorChange: PropTypes.func,
    className: PropTypes.string,
};

StrengthIndicator.defaultProps = {
    numberOfLevels: 4,
};

export default StrengthIndicator;
