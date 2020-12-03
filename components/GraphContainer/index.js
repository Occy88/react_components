import React from 'react';
import './style.scss'
import languages from "./lang.js"


/**
 *  takes a list of any html items
 *  and places them into a nice dropdown
 *  on selection, the item is returned?
 */
class GraphContainer extends React.Component {
    /**
     * Props should set the variables for the list ( objects should be a string and an id)
     * Props should send api_url (url to get objects from)
     * @param props : object_list, handleSelect (function)
     */
    constructor(props) {
        super(props);
        //by default hide on scroll, user can decide not to


    }

    /**
     * Render the list witall_datah an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {

        return (
                <div className={'GraphContainer'} style={this.props.style}>
                    {this.props.children}
                </div>
        )
    }
}

export default GraphContainer