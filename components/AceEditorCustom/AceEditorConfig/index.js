import React from 'react';
import ListSelect from "../../ListSelect";
import Input from "../../Input";

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceEditorConfig extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);
        this.mode = [
            {'name': 'python'},
            {'name': 'java'},
            {'name': 'javascript'},
            {'name': 'xml'}
        ]
        this.theme = [
            {'name': 'monokai'},
            {'name': 'github'},
            {'name': 'tomorrow'},
            {'name': 'kuroir'},
            {'name': 'twilight'},
            {'name': 'xcode'},
            {'name': 'textmate'},
            {'name': 'solarized_dark'},
            {'name': 'solarized_light'},
            {'name': 'terminal'},

        ]
        this.name = "default name"
    }

    render() {
        return (
                <div className={'AceEditorConfig'}>
                    <ListSelect
                            object_list={this.mode}
                            str_key={'name'}
                            id_key={'name'}
                            sort_key={'name'}
                            default={{'name': this.props.config.mode}}
                            handleSelect={(val) => this.props.onChange({mode: val.name})}
                    />
                    <ListSelect
                            object_list={this.theme}
                            str_key={'name'}
                            id_key={'name'}
                            sort_key={'name'}
                            default={{'name': this.props.config.theme}}
                            handleSelect={(val) => this.props.onChange({theme: val.name})}
                    />
                    <Input
                            value={this.props.config.name}
                            name={'name'}
                            onChange={(val) => this.props.onChange({'name': val})}
                    />
                    <Input
                            value={this.props.config.fontSize}
                            name={'font size'}
                            type={'number'}
                            onChange={(val) => this.props.onChange({'fontSize': parseInt(val)})}
                    />
                    <Input
                            value={this.props.config.showPrintMargin}
                            name={'show margin'}
                            type={'checkbox'}
                            onChange={(val) => this.props.onChange({'showPrintMargin': val})}
                    />
                    <Input
                            value={this.props.config.showGutter}
                            name={'showGutter'}
                            onChange={(val) => this.props.onChange({'showGutter': val})}
                            type={'checkbox'}

                    />
                    <Input
                            value={this.props.config.highlightActiveLine}
                            name={'highlightActiveLine'}
                            type={'checkbox'}
                            onChange={(val) => this.props.onChange({'highlightActiveLine': val})}
                    />

                    <Input
                            value={this.props.config.setOptions.tabSize}
                            name={'tabSize'}
                            type={'number'}
                            onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{tabSize: parseInt(val)}}})}

                    />
                    <Input
                            value={this.props.config.setOptions.enableBasicAutocompletion}
                            name={'enableBasicAutocompletion'}
                            type={'checkbox'}
                            onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{enableBasicAutocompletion: val}}})}
                    />
                    <Input
                            value={this.props.config.setOptions.enableSnippets}
                            name={'enableSnippets'}
                            type={'checkbox'}
                            onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{enableSnippets: val}}})}
                    />
                    <Input
                            value={this.props.config.setOptions.showLineNumbers}
                            name={'showLineNumbers'}
                            type={'checkbox'}
                            onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{showLineNumbers: val}}})}
                    />
                    <Input
                            value={this.props.config.setOptions.enableLiveAutocompletion}
                            name={'enableLiveAutocompletion'}
                            type={'checkbox'}
                            onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{enableLiveAutocompletion: val}}})}
                    />

                </div>
        )
    }
}

