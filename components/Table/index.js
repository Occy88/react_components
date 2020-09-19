import React from "react";

export default class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table className="table">
                {this.props.children}
            </table>
        );
    }
}