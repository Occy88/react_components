import React from "react";
import './style.scss'

export default class LoadingIndicator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.loading ? 'LoadingIndicator' : 'not-loading'}>
                <div className={'wrapper'}>
                    <div className={'loading'}/>
                </div>
            </div>
        );
    }
}