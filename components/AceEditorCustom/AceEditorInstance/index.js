import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver.js'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/mode-scss'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-ambiance'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-spellcheck'
import './style.scss'

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceEditorInstance extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);

    }

    render() {
        // console.log("ACE EDITOR: ")
        // console.log(this.props.config)
        return (
                <AceEditor
                        placeholder={this.props.config.placeholder}
                        width={'100%'}
                        height={'100%'}
                        mode={this.props.config.mode}
                        theme={this.props.config.theme}
                        name={this.props.config.name}
                        onLoad={this.props.config.onLoad}
                        onChange={this.props.config.onChange}
                        fontSize={this.props.config.fontSize}
                        showPrintMargin={this.props.config.showPrintMargin}
                        showGutter={this.props.config.showGutter}
                        highlightActiveLine={this.props.config.highlightActiveLine}
                        value={this.props.value}
                        setOptions={{
                            enableBasicAutocompletion: this.props.config.setOptions.enableBasicAutocompletion,
                            enableLiveAutocompletion: this.props.config.setOptions.enableLiveAutocompletion,
                            enableSnippets: this.props.config.setOptions.enableSnippets,
                            showLineNumbers: this.props.config.setOptions.showLineNumbers,
                            tabSize: this.props.config.setOptions.tabSize,
                        }}/>

        )
    }
}

