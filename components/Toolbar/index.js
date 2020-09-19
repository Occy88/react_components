import React from "react";
import './style.scss'
import Button from "../Button";
import classnames from 'classnames'

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
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
        return (
                <div className='Toolbar'>

                    <div className={classnames({
                        'Listing': true,
                        'hide': !this.state.expanded
                    })}>
                        {this.state.expanded ?
                                this.props.componentDicts.map((d, index) => {
                                    return <Button key={index} text={d.text}
                                                   onClick={() => this.props.onClick(d)}/>

                                }) : null
                        }
                    </div>
                    <div className={'Toggle'} onClick={this.toggleToolbar.bind(this)
                    }>
                        {this.state.expanded ? '<' : '>'}
                    </div>
                </div>
        );
    }
}
