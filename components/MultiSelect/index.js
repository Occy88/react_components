import React from 'react';
import './style.scss'
import languages from "./lang.js"
import Dropdown from "../Dropdown";

let lang = languages[document.documentElement.lang];

/**
 *  takes a list of objects which have an str field and an id
 *  displays the str of each object,
 *  on selection returns the object
 * list it will return The id of the object.
 */
export default class MultiSelect extends React.Component {
    /**
     * Props should set the variables for the list ( objects should be a string and an id)
     * Props should send api_url (url to get objects from)
     * @param props : object_list, handleSelect (function)
     */
    constructor(props) {
        super(props);
        this.reverse = props.reverse;
        let temp_list = [...props.object_list];
        temp_list = this.sortList(temp_list);
        if (this.reverse) {
            temp_list.reverse()
        }
        this.state = {
            object_list: this.props.object_list,
            temp_list: temp_list,
            list_selected: [],
            list_not_selected: [...temp_list],
            handleSelect: this.props.handleSelect,
        };
        this.filterList = this.filterList.bind(this);
        //    set the first value if there is one...
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * Check the length, compare each item's id (we expect and id and an str), return true
     * @param arr1
     * @param arr2
     */
    static testArrayEqual(arr1, arr2) {
        if (arr1 && !arr2 || arr2 && !arr1) {
            return false

        }
        if (!arr1 && !arr2) {
            return true
        }
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i].id !== arr2[i].id)
                return false;
        }

        return true;
    }

    /**
     * Each object has id, test if id is in array
     * @param object
     * @param array
     */
    static testObjectInArray(object, array) {
        for (const item of array) {
            if (object.id === item.id) {
                return true
            }
        }
        return false
    }

    static popObjectFromArray(object, array) {
        let new_arr = [];
        for (const obj of array) {
            if (obj === object) {
            } else {
                new_arr.push(obj)
            }
        }
        return new_arr
    }

    handleClick(object) {
        let list_sel = this.state.list_selected;
        let list_n = this.state.list_not_selected;
        if (MultiSelect.testObjectInArray(object, list_sel)) {
            list_sel = MultiSelect.popObjectFromArray(object, list_sel);
            list_n.push(object);
        } else {
            list_n = MultiSelect.popObjectFromArray(object, list_n);
            // list_n.pop(object);
            list_sel.push(object);


        }
        this.setState({
            list_selected: list_sel,
            list_not_selected: list_n
        });
        list_sel[0] ? this.props.handleSelect(list_sel) : this.props.handleSelect(null);
    }


    /**
     * Function to sort alphabetically an array of objects by some specific key.
     *
     * @param {String} property Key of the object to sort.
     */
    static dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            let c = +a[property];
            let d = +b[property];
            if (c && d) {
                return sortOrder === -1 ? c < d ? 1 : -1 : d < c ? 1 : -1;
            }
            return sortOrder === -1 ? b[property] > a[property] ? 1 : -1 : a[property] > b[property] ? 1 : -1;

        }
    }

    /**
     * sort the list into alphabetical by the str attribute
     */
    sortList(list) {
        list.sort(MultiSelect.dynamicSort("str"));
        return list;
    }

    /**
     * Parent updates with new list of objects
     * @param props : object_list
     */
    UNSAFE_componentWillReceiveProps(props) {

        if ("object_list" in props && !MultiSelect.testArrayEqual(props.object_list, this.state.object_list)) {
            let temp_list = this.sortList([...props.object_list]);
            if (this.reverse) {
                temp_list.reverse();
            }
            this.setState({
                object_list: props.object_list,
                temp_list: temp_list,
                list_selected: [],
                list_not_selected: [...temp_list],
            });
            this.props.handleSelect(null);
        }
    }

    /**
     * Filter the object list from the filter input
     * send the first item in the list as the selected item.
     * if there is nothing send null
     * @param event
     */
    filterList(event) {

        let values = event.target.value.toLowerCase().split(",");
        let all_data = [];
        for (let val of values) {
            all_data = all_data.concat(this.state.object_list.filter(function (item) {
                return item.str.toLowerCase().search(val) !== -1;
            }));
        }
        let temp_d = {};
        let all_data_unique = [];
        for (let obj of all_data) {
            if (!(obj.id in temp_d)) {
                all_data_unique.push(obj);
                temp_d[obj.id] = obj.id;
            }
        }
        all_data = all_data_unique;
        all_data = this.sortList(all_data);
        if (this.reverse) {
            all_data.reverse();
        }
        let list_sel = [];
        for (const el of this.state.list_selected) {
            if (MultiSelect.testObjectInArray(el, all_data)) {
                list_sel.push(el)
            }
        }
        let list_n = [];
        for (const el of all_data) {
            if (!MultiSelect.testObjectInArray(el, list_sel)) {
                list_n.push(el)
            }
        }
        this.setState({
            temp_list: all_data,
            list_selected: list_sel,
            list_not_selected: list_n
        });
        list_sel[0] ? this.props.handleSelect(list_sel) : this.props.handleSelect(null);
    }

    invertSelection() {
        this.setState({
            list_selected: this.state.list_not_selected,
            list_not_selected: this.state.list_selected,
        });
        this.state.list_not_selected[0] ? this.props.handleSelect(this.state.list_not_selected) : this.props.handleSelect(null);

    }

    selectAll() {

        this.setState({
            list_selected: [...this.state.temp_list],
            list_not_selected: []
        });
        this.state.temp_list[0] ? this.props.handleSelect(this.state.temp_list) : this.props.handleSelect(null);

    }

    /**
     * Render the list with an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {
        if (!this.state.temp_list) return <div style={{display: 'inline-block'}}>N/A</div>;
        return (
            <div className={'MultiSelect'}>
                <div className={'option_buttons'}>
                    <button onClick={this.selectAll.bind(this)}>{lang.all}</button>
                    <button onClick={this.invertSelection.bind(this)}>{lang.invert}</button>
                </div>
                <input type="text" placeholder={lang.filter}
                       onChange={this.filterList}/>
                <Dropdown
                    hide_on_mouse_leave={false}
                    hide_on_scroll={false}
                    item_list={
                        this.state.temp_list.map(item => <option
                            style={MultiSelect.testObjectInArray(item, this.state.list_selected) ? null : {backgroundColor: item.backgroundColor}}
                            className={MultiSelect.testObjectInArray(item, this.state.list_selected) ? "selected" : "not_selected"}
                            onClick={() => this.handleClick(item)}
                            key={item.id}> {item.str}</option>)
                    }/>

            </div>
        )
    }

}

