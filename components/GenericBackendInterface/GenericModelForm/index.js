import React from 'react';
// import languages from "./lang.js";
import './style.scss';
// import PropTypes from 'prop-types';
// import {TextFormat} from "@material-ui/icons";
import File from '../../Forms/File'
import Url from '../../Forms/Url'
import Boolean from '../../Forms/Boolean'
import Text from '../../Forms/Text'
import Number from '../../Forms/Number'
import Date from '../../Forms/Date'
import IdleTimerCustom from "../../IdleTimerCustom";
import LoadingIndicator from "../../LoadingIndicator";
import Button from "../../Button";

/**
 * Views a post only
 */
export default function GenericModelForm(types, api) {
    return class GenericModelFormTemplate extends React.Component {
        /**
         * props must set the data once, once the data is set
         * there are the following options
         * @param props.setData {(data)=>this.setData(data)} callback to set data of child if needed.
         * @param props.read_only {boolean} -> form will be updated to api.
         * @param props.submit_button {boolean} -> form will contain a submit button if modify state active, otherwise automatic submission
         * the user may not change the form. this is to be set by the props (modify=true|false) default is false.
         * @param props
         */
        constructor(props) {
            super(props)
            console.log("GENERIC TEMPLATE INSTANTIATED ")
            console.log(props)
            let data = {...types}
            Object.keys(data).forEach((key) => data[key] = '');
            this.state = ({
                data: data,
                sync: false
            })
            this.response = this.response.bind(this)
            this.onDataChange = this.onDataChange.bind(this)
            this.submitForm = this.submitForm.bind(this)
        }

        setData(data) {
            this.setState({
                data: data
            })

        }

        componentDidMount() {
            console.log("COMPONENT MOUNTED BINDING SET DATA===========")
            // this.props.setData ? this.props.setData(this.setData.bind(this)) : null
        }

        response(data) {
            console.log("RESPONSE FROM SERVER: ")
            console.log(data)
            this.setState({
                sync: false,
                data: data
            })
        }

        submitForm() {
            this.setState({
                sync: true
            })
            console.log("SUBMITTING FORM")
            this.state.data.id ?
                api.update(this.state.data).then((d) => {
                    this.response(d)
                }) : api.create(this.state.data).then((d) => {
                    this.response(d)
                })
        }

        onDataChange(dict) {
            console.log(this.state.data)
            console.log(dict)
            console.log("-----------------")
            this.setState({
                data: {...this.state.data, ...dict}
            })
            console.log(this.state.resetTimer)
            console.log('_____________________timer: ')
            this.props.submit_button ? null : this.state.resetTimer()

        }

        render() {
            console.log("PROPS: ", this.props)
            const forms = Object.keys(types).map((key, val) => {
                val = types[key]
                console.log(key, this.state.data[key]);
                return React.createElement(formFactory(val), {
                    data: this.state.data[key],
                    name: key,
                    key: key,
                    read_only: this.props.read_only,
                    onChange: (data) => this.onDataChange({[key]: data})
                })
            })
            const loading_indicator = <LoadingIndicator loading={this.state.sync}/>
            console.log("SETTING TIMEOUT TO : ", this.props.timeout)
            const idle_timer = <IdleTimerCustom
                timer={1000 * 5}
                throttle={1000}
                onIdle={this.submitForm}
                timeout={this.props.timeout}
                resetFunction={(func) => {
                    this.setState({resetTimer: func})
                }}/>
            const submit_button = <Button text={'Submit'} onClick={this.submitForm.bind(this)}/>

            console.log(submit_button)
            console.log(loading_indicator)

            console.log(forms)

            return (

                <div className={'GenericModelFormTemplate'} aria-readonly={!this.props.modify}>
                    {loading_indicator}
                    {forms}
                    {this.props.submit_button ? submit_button : idle_timer}

                </div>
            )
        }
    }
}

function formFactory(form_type) {
    switch (form_type) {
        case 'file':
            return File
        case 'text':
            return Text
        case 'number':
            return Number
        case 'url':
            return Url
        case 'date':
            return Date
        case 'boolean':
            return Boolean
    }
}

// [ item, item, item ]
// form:
// item
// item
// item
// update, delete, create
