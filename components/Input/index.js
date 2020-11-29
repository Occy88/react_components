import React from 'react';
import './style.scss'
import languages from "./lang.js"
import {isBoolean} from "underscore";

let lang = languages[document.documentElement.lang];

/**
 *  takes a list of any html items
 *  and places them into a nice dropdown
 *  on selection, the item is returned?
 */
class Input extends React.Component {
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
     * temp fix, check if it's 'true''false'
     * @param value
     */
    onChange(value) {
        this.props.onChange(value)
    }

    /**
     * Render the list witall_datah an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {
        let input = <input
                type={this.props.type === null || this.props.type === undefined ? 'text' : this.props.type}
                onChange={(event) => this.props.onChange(event.target.value)}
                placeholder={this.props.placeholder ? this.props.placeholder : lang.placeholder}
                value={this.props.value}
        />
        let inputBool = <input
                type={this.props.type === null || this.props.type === undefined ? 'checkbox' : this.props.type}
                checked={this.props.value}
                onChange={(event) => this.onChange(event.target.checked)}
                placeholder={this.props.placeholder ? this.props.placeholder : lang.placeholder}
                value={this.props.name}
        />
        return (
                <div className={'Input'}>
                    <div className={'name'}>
                        {this.props.name}
                    </div>
                    {isBoolean(this.props.value) ?
                            inputBool :
                            input}

                </div>)

    }
}

export default Input