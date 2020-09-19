import React from "react";

export default class TableHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <thead>
                {this.props.children}
            </thead>
        );
    }
}