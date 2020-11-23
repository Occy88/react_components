import React from "react";
import './style.scss'
import classnames from 'classnames'

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.expanded ? this.props.expanded : false,
            reverse: this.props.reverse ? this.props.reverse : false
        };
        //components to be created according to each button must create a text key.
    }

    toggleToolbar() {
        this.setState({expanded: !this.state.expanded});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // call onToggle after state is set and re-rendered.
        if (prevState.expanded !== this.state.expanded) {
            this.props.onToggle(1000);
        }
    }

    render() {
        let listing = <div key='list' className={classnames({
            'Listing': true,
            'hide': !this.state.expanded,
            'reverse': this.state.reverse
        })}>
            {this.state.expanded ?
                    this.props.component : null
            }
        </div>
        let toggle = <div key={'togg'} className={'Toggle'} onClick={this.toggleToolbar.bind(this)
        }>
            {this.state.expanded ? (this.state.reverse ? '>' : '<') : this.state.reverse ? '<' : '>'}
        </div>
        let comb = !this.state.reverse ? [listing, toggle] : [toggle, listing]
        return (

                <div className='Toolbar'>
                    {comb}
                </div>
        );
    }
}
