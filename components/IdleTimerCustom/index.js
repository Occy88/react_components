import React from "react";
import './style.scss'

export default class IdleTimerCustom extends React.Component {
    /**
     * @param props.resetFunction {()=>callWhenUserActive}
     * @param props.onIdle {function}
     * @param props.timeout {number}
     * @param props.throttle {number}
     */
    constructor(props) {
        super(props)
        console.log(this.props.node)
        this.state = {
            timer: 0,
            reset: true
        }

    }

    componentDidMount() {
        this.props.resetFunction(this.userReset.bind(this))
        this.startTimer()
    }

    startTimer() {
        this.setState({
            interval: setInterval(this.addToTimer.bind(this), this.props.throttle),
            timer: 0,
            reset: true
        })
    }

    stopTimer() {
        clearInterval(this.state.interval)
    }

    userReset() {
        if (!this.state.reset) {
            this.startTimer()
        } else {
            this.setState({
                timer: 0,
            })
        }

    }

    addToTimer() {
        console.log(this.state.timer, this.state.timeout)
        let total = this.state.timer + this.props.throttle
        if (total > this.props.timeout && this.state.reset) {
            console.log('calling IDLe')
            this.props.onIdle();
            this.setState({
                timer: total,
                reset: false
            })
            this.stopTimer()
        } else {
            this.setState({
                timer: total
            })
        }


    }

    update() {
        this.state.timer = 0
    }

    render() {
        return (<div/>)
    }
}