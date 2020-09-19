import React from 'react';
import './style.scss'
import dropdown from '../../img/dropdown_default.png'
import dropup from '../../img/dropup_default.png'
import languages from "./lang.js"
import {withRouter} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import OutsideAlerter from "../OutsiteAlerter";

let lang = languages[document.documentElement.lang];

/**
 *  takes a list of any html items
 *  and places them into a nice dropdown
 *  on selection, the item is returned?
 */
class Dropdown extends React.Component {
    /**
     * Props should set the variables for the list ( objects should be a string and an id)
     * Props should send api_url (url to get objects from)
     * @param props : object_list, handleSelect (function)
     */
    constructor(props) {
        super(props);
        //by default hide on scroll, user can decide not to
        this.state = {
            lock: false,
            //must explicitely state if it is equal to false as undefined or null needs to equate true (default)
            hide_on_scroll: props.hide_on_scroll === false ? false : true,
            hide_on_mouse_leave: props.hide_on_mouse_leave === false ? false : true,
            item_list: props.item_list,
            button_fill: props.button_fill ? props.button_fill :
                <img style={{height: '50px'}} src={STATIC_URL + dropdown}/>,
            button_fill_active: props.button_fill_active ? props.button_fill_active :
                <img style={{height: '50px'}} src={STATIC_URL + dropup}/>,
            active: false
        };
        this.setActive = this.setActive.bind(this);
        this.setInActive = this.setInActive.bind(this);

        this.handleScroll = this.handleScroll.bind(this);
        this.container = React.createRef();
    }


    componentWillMount() {
        //close all dropdowns on route change
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState({
                active: false
            })
        });
        window.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount() {
        this.unlisten();
        window.removeEventListener('scroll', this.handleScroll);

    }

    handleScroll(event) {
        if (this.state.active && this.state.hide_on_scroll) {
            this.setState({
                active: false
            });
        }

    }


    toggleDropdown() {
        this.setState({
            active: !this.state.active
        })
    }

    UNSAFE_componentWillReceiveProps(props) {
        if ('item_list' in props) {
            this.setState({
                item_list: props.item_list,
                class_name: 'dropdown-menu'
            })
        }
    }

    setActive() {
        //unlock as well
        // this.unlock();

        if (!this.state.active) {
            this.setState({
                active: true
            })
        }
    }

    setInActive(e) {
        if (this.container.current.contains(e.target) && e.target.className !== 'dropdown-menu-show' && e.target.className !== 'dropdown-item' && e.target.className !== 'dropdown-button' && e.target.className !== 'Dropdown') return;
        if (this.state.active) {
            this.setState({
                active: false
            })
        }
    }

    /**
     * for some reason still triggers with inside clicks, sof for now decision handled by is Active
     * @param e
     */

    handleClickOutside(e) {
        if (!this.state.hide_on_mouse_leave) return;
        this.setInActive(e);
        // }
    }

    /**
     * Render the list witall_datah an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {
        return (
            <div ref={this.container}// onMouseOut={(e) => this.mouseOut(e)}
                 onMouseLeave={this.state.hide_on_mouse_leave ? (e) => this.setInActive(e) : null}
                 className={'Dropdown'}
                 onMouseEnter={!isMobile ? () => this.setActive() : null}>
                <div
                    onClick={this.toggleDropdown.bind(this)}
                    className={'dropdown-button'}> {this.state.active ? this.state.button_fill_active : this.state.button_fill}
                </div>
                {/*<OutsideAlerter handleClick={this.handleClickOutside.bind(this)}>*/}

                <div
                    className={this.state.active ? 'dropdown-menu-show' : 'dropdown-menu'}>

                    {this.state.item_list ? this.state.item_list.map((obj, index) => {
                            return (
                                <div
                                    key={index} className={'dropdown-item'}>
                                    {obj}
                                </div>)
                        }
                    ) : null}

                </div>
                <OutsideAlerter handleClick={this.handleClickOutside.bind(this)} container={this.container.current}/>
            </div>

        )
    }
}

export default withRouter(Dropdown)