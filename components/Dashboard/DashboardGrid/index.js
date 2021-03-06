import React from "react";
import {Responsive} from 'react-grid-layout';
import './style.scss'
import BaseWidget from "../../BaseWidget";
import WidthProvider from './WidthProvider'

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class DashboardGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 10000
        }
        this.Grid = React.createRef()
    }

    //
    // onBreakpointChange(breakpoint, cols) {
    //     this.setState({
    //         breakpoint: breakpoint,
    //         cols: cols
    //     });
    //
    // }
    //
    // onLayoutChange(layout) {
    //     // this.props.onLayoutChange(layout);
    //     this.setState({layout: layout});
    // }

    render() {
        let scale = this.props.grid_config.scale
        // let d = 1 - scale
        // d /= 2
        // scale = 1 - d
        console.log("rendering: ", this.props.component_dicts)
        console.log("scale:", this.props.grid_config.scale)
        console.log("GRID: ", this.Grid.current ? this.Grid.current : "NO GRID")
        return (
            <div className={'DashboardGrid'}
                 style={{
                     width: this.state.width + 'px',
                     // zoom: this.props.grid_config.scale,
                     transform: "scale(" + this.props.grid_config.scale + ")"
                 }}>
                <ResponsiveGridLayout
                    ref={this.Grid}
                    width={1000}
                    useCSSTransforms={true}
                    rowHeight={this.props.grid_config.row_height ? this.props.grid_config.row_height : 100}
                    breakpoints={{res: 40}}
                    cols={{res: this.props.grid_config.row_height ? this.props.grid_config.row_height : 100}}
                    measureWidthBeforeMount={true}
                    compactType={'vertical'}
                    verticalCompact={this.props.grid_config.vertical_compact ? true : false}
                    draggableCancel={'.nonDraggable'}
                    onResizeStop={() => window.dispatchEvent(new Event('resize'))}
                    // onWidthChange={() => {
                    //     return null
                    // }}
                    onLayoutChange={this.props.onLayoutChange}
                    autoSize={true}
                    transformScale={scale}
                    margin={this.props.grid_config.margin ? this.props.grid_config.margin : [10, 10]}
                    // preventCollision={true}
                    isBounded={false}
                    // onLayoutChange={this.onLayoutChange}
                    // onBreakpointChange={this.onBreakpointChange}
                    {...this.props}
                >
                    {this.props.component_dicts.map((comp, index) => {
                        return <div className={'widget'}
                            // itemevation={3}
                                    key={comp.id}
                                    data-grid={{
                                        i: comp.id,
                                        x: comp.x,
                                        y: comp.y,
                                        h: comp.h,
                                        w: comp.w
                                    }}
                        >

                            <BaseWidget component_dict={comp}
                                        handleRemove={this.props.handleRemove}
                                        handleCreate={this.props.handleCreate}/>
                        </div>
                    })}
                </ResponsiveGridLayout>
            </div>

        );
    }
}
