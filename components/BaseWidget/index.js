import React from "react";
import Button from "../Button";
import './style.scss'
import thin_black_cross from "../../img/thin_black_cross.png"

class BaseWidget extends React.Component {
    // Styles
    constructor(props) {
        super(props);
    }

    render() {

        const button_style = {
            position: "absolute",
            right: "0",
            width: "20px",
            float: "right"
        };
        const element = React.createElement(this.props.componentDict.component, Object.assign({}, this.props, this.props.componentDict.props));
        // Create the interior of any given widget to be displayed.
        return ([
                <div className={'remove'}>
                    <Button
                        onClick={() => {
                            this.props.handleRemove(this.props.componentDict.id)
                        }}
                        image={STATIC_URL + thin_black_cross}
                        style={button_style}>
                    </Button></div>,
                <div className={'BaseWidget'}>
                    <div className={'relative'}>
                        <div className={'draggableArea'}>

                        </div>
                    </div>


                    <div className={'nonDraggable'}>
                        {element}
                    </div>
                </div>]
        );
    };
}

export default BaseWidget;
