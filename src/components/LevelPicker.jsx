import React from "react";
import PropTypes from "prop-types";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default class LevelPicker extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentLevel: this.props.level
        };
    }

    getMaxLevel() {
        return 15;
    }

    getLevelString() {
        return "+" + this.state.currentLevel;
    }

    onValueChanged(value) {
        this.setState({currentLevel: value});

        if (this.props.onValueChanged) {
            this.props.onValueChanged(value);
        }
    }

    render() {
        return <div className="level-picker only-desktop">
            <Slider
                min={0}
                max={this.getMaxLevel()}
                defaultValue={this.state.currentLevel}
                onChange={this.onValueChanged.bind(this)} />
            <span className="level">{this.getLevelString()}</span>
        </div>;
    }
}

LevelPicker.propTypes = {
    level: PropTypes.number,
    onValueChanged: PropTypes.func
};