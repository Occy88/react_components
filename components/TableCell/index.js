import React from "react";

export default class TableCell extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <td style={this.props.style ? this.props.style : {textAlign:"center"}}>
                {this.props.children}
            </td>
        );
    }
}