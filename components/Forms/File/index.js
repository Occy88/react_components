import React from 'react';
import './style.scss'
import languages from "./lang.js"


/**
 *  takes a list of any html items
 *  and places them into a nice dropdown
 *  on selection, the item is returned?
 */
class File extends React.Component {
    /**
     * @param props.read_only {boolean}
     * @param props.name {string}
     * @param props.data {string}
     * @param props.onChange {function}
     */
    constructor(props) {
        super(props);
    }

    render() {
        let lang = languages[document.documentElement.lang];

        let field = <input
            type={'file'}
            onChange={(event) => this.props.onChange(event.target.value)}
            placeholder={this.props.placeholder ? this.props.placeholder : lang.placeholder}
            value={this.props.data}
            readOnly={this.props.read_only}
        />
        let name = <div className={'name'}>
            {this.props.name}
        </div>
        return (
            <div className={'File'}>
                {this.props.read_only ? field:[name,field]}

            </div>)
    }
}

export default File