import React from "react";
import "./style.scss"

export default class WidgetBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'WidgetBody'}>
                {this.props.children}
            </div>
        );
    }
}