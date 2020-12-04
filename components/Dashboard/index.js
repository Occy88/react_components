import React from 'react'
import DashboardGrid from "./DashboardGrid";
import "./style.scss";
import _ from 'underscore'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import findSpace from "../../js/packing";
import {v4 as uuid} from 'uuid'
import ScrollContainer from 'react-indiana-drag-scroll'
import Button from "../Button";

/**
 * High level component that handles the connection between the toolbar and the grid.
 * Maintains the createdWidgets to be displayed on the grid.
 */

export default class Dashboard extends React.Component {
    // State
    // Current createdWidgets on the grid
    /**
     *
     * @param props
     * @param props.grid_config {dict} {
     *                      vertical_compact: True,
     *                      row_height: 100,
     *                   }
     */
    constructor(props) {
        super(props);
        this.state = {
            componentDicts: [],
            zoom: 1

        };

        this.handleRemove = this.handleRemove.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.zoom = this.zoom.bind(this)
        this.dashboard = React.createRef()

    }

    /**
     * function adds a component to the grid
     * @param component an imported component (to be called with react.createElement(...)
     * @param id uuid
     * @param posX (null or int)
     * @param posY (null or int)
     * @param width (null or int)
     * @param height (null or int)
     * @param props (additional props to pass )
     */
    handleCreate(component, id, posX, posY, width, height, props) {
        // if id not provided generate it now
        if (!id) {
            id = uuid()
        }
        //if no height/ width provided, set it here.
        if (!width || !height) {
            width = 4;
            height = 4;
        }
        //if  position not provided, generate one.
        if (posX == null || posY == null) {
            let pos = findSpace(this.state.componentDicts, 13, 13, width, height);
            posX = pos[0];
            posY = Infinity
        }
        this.setState({
            componentDicts: this.state.componentDicts.concat({
                component: component,
                x: posX,
                y: posY,
                h: height,
                w: width,
                props: props,
                id: id
            }),
        })
    }

    /**
     * component dicts should be a list in the same format
     * as the specification for handleCreate
     * @param componentDicts
     */
    handleCreateMultiple(componentDicts) {
        let componentsToAdd = [];
        for (let d of componentDicts) {
            // if id not provided generate it now
            if (!d.id) {
                d.id = uuid()
            }
            //if no height/ width provided, set it here.
            if (!d.width || !d.height) {
                d.width = 4;
                d.height = 4;
            }
            //if  position not provided, generate one.
            if (d.posX == null || d.posY == null) {
                let pos = findSpace(this.state.componentDicts.concat(componentsToAdd), 13, 13, d.width, d.height);
                d.posX = pos[0];
                d.posY = pos[1];
            }
            componentsToAdd = componentsToAdd.concat({
                component: d.component,
                x: d.posX,
                y: d.posY,
                h: d.height,
                w: d.width,
                props: d.props,
                id: d.id
            })
        }
        this.setState({
            componentDicts: this.state.componentDicts.concat(componentsToAdd)
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.scale();
    // }

    scale(time) {

        time = time ? time : 0;
        setTimeout(() => window.dispatchEvent(new Event('resize')), time);
    }

    zoom(val) {
        this.setState({
            zoom: this.state.zoom + val
        })
        console.log(this.state.zoom)
    }

    /**
     * Function to remove a component from the grid
     * @param {string} id the unique id of the component.
     */
    handleRemove(id) {
        let new_dicts = _.reject(this.state.componentDicts, {id: id})
        this.setState({
            componentDicts: new_dicts
        })
    };

    render() {
        return (
                <div className='Dashboard'>
                    <div className={'zoomContainer'}>
                        <div className={'zoomButtons'}>
                            <Button text={'+'} onClick={() => this.zoom(0.1)}/>
                            <Button text={'-'} onClick={() => this.zoom(-0.1)}/>
                        </div>
                    </div>
                    <ScrollContainer className="scroll-container"
                                     ignoreElements={'.widget'}>
                        <DashboardGrid
                                ref={this.dashboard}
                                style={{transform: "scale(" + this.state.zoom + ")"}}
                                grid_config={this.props.grid_config ? {...this.props.grid_config, ...{scale: this.state.zoom}} : {scale: this.state.zoom}}
                                handleRemove={this.handleRemove}
                                handleCreate={this.handleCreate}
                                componentDicts={this.state.componentDicts}
                        />
                    </ScrollContainer>

                </div>
        );
    }
}
