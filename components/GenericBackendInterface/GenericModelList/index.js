import React from "react";
import ListSelect from "../../ListSelect";

function GenericModelList(api_get, get_dict, display_str_key) {
    return class GenericServiceListTemplate extends React.Component {
        constructor(props) {
            // console.log("GENERIC API INIT: ", api_get, get_dict, display_str_key)
            super(props);
            this.state = {
                data: []
            }
        }

        componentDidMount() {
            this.mounted = true;
            // console.log("GENERIC API GET: ", get_dict);
            api_get.get(get_dict).then(d => {
                // console.log("GENERIC API RESPONSE: ", d)
                this.setState({
                    data: d
                })
            })
        }

        render() {
            return (
                <ListSelect filter={false} object_list={this.state.data}
                            id_key={'id'}
                            str_key={display_str_key}
                            sort_key={'id'}
                            handleSelect={this.props.handleSelect}/>
            )
        }
    }
}

export default GenericModelList