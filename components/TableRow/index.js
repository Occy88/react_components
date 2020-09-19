import React from "react";

export default class TableRow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
          <tr>
              {this.props.children}
          </tr>
        );
    }
}