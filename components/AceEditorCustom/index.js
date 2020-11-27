import React from 'react';
import AceEditorConfig from './AceEditorConfig'
import AceEditorInstance from './AceEditorInstance';
import Toolbar from '../Toolbar'
import './style.scss'

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceEditorCustom extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);
        this.state = ({
            config: {
                width: 500,
                height: 500,
                placeholder: this.props.placeholder ? this.props.placeholder : "Placeholder Text",
                mode: this.props.mode ? this.props.mode : 'python',
                theme: this.props.theme ? this.props.theme : 'monokai',
                name: this.props.name ? this.props.name : 'default',
                onLoad: this.props.onLoad,
                onChange: this.props.onChange,
                fontSize: 14,
                showPrintMargin: true,
                showGutter: true,
                highlightActiveLine: true,
                setOptions: {
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }
            },
            value: this.props.value
        })
        // console.log('instantiated ace example: ')
        // console.log(this.state.config)
        this.onToggle = this.onToggle.bind(this)
    }


    componentDidMount() {
    }

    updateConfig(config) {
        // console.log("updating config: ")
        // console.log(config)
        this.setState({config: {...this.state.config, ...config}})

    }

    onToggle() {
    }

    render() {
        // console.log("EXAMPLE : ")
        // console.log(this.state.config)
        return (
                <div className={'AceEditor'}>

                    <AceEditorInstance value={this.props.value} config={this.state.config}/>
                    <Toolbar
                            reverse={true}
                            onToggle={this.onToggle}
                            component={
                                <AceEditorConfig config={this.state.config}
                                                 onChange={(config) => this.updateConfig(config)}/>
                            }/>

                </div>

        )
    }
}

