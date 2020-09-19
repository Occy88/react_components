import React from 'react'

export default class RGBStyling extends React.Component {

    /**
     * @param value
     * @param valueMin
     * @param valueMax
     * @param rgbFrom
     * @param rgbTo
     * @return {string}
     */
    static getRGBTransition(value, valueMin, valueMax, rgbFrom, rgbTo) {
        let range = valueMax - valueMin;
        let percentage = (value - valueMin) / range;
        let r = rgbFrom[0] + (rgbTo[0] - rgbFrom[0]) * percentage;
        let g = rgbFrom[1] + (rgbTo[1] - rgbFrom[1]) * percentage;
        let b = rgbFrom[2] + (rgbTo[2] - rgbFrom[2]) * percentage;
        return 'RGB(' + r + ',' + g + ',' + b + ')';
    }

    /**
     * some docs
     * @param value
     * @param valueMin
     * @param valueMid
     * @param valueMax
     * @param rgbFrom
     * @param rgbMid
     * @param rgbTo
     */
    static getRGBTransitionThroughColour(value, valueMin, valueMid, valueMax, rgbFrom, rgbMid, rgbTo) {
        return value < valueMid ? RGBStyling.getRGBTransition(value, valueMin, valueMid, rgbFrom, rgbMid) : RGBStyling.getRGBTransition(value, valueMid, valueMax, rgbMid, rgbTo)

    }

}