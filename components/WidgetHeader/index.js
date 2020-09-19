import React from "react";
import "./style.scss"

export default class WidgetHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'WidgetHeader'}>
                {this.props.children}
            </div>
        );
    }
}