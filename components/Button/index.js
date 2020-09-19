import React from 'react';
import './style.scss'
import languages from "./lang.js"
import Image from "react-bootstrap/Image";

let lang = languages[document.documentElement.lang];

/**
 *  takes a list of any html items
 *  and places them into a nice dropdown
 *  on selection, the item is returned?
 */
class Button extends React.Component {
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
        if (this.props.image) {
            return (
                <div onClick={this.props.onClick} className={'Button'} style={this.props.style}>
                    <Image src={this.props.image} fluid={true} />
                </div>
            );
        } else {
            return (
                <div onClick={this.props.onClick} className={'Button'} style={this.props.style}>
                    {this.props.text ? this.props.text : this.props.children}
                </div>
            );
        }
    }
}

export default Button