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
        console.log("rendering: ", this.props.componentDicts)
        console.log("scale:", this.props.s)
        return (
                <ResponsiveGridLayout
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
                        autoSize={true}
                        transformScale={this.props.grid_config.scale}
                        margin={this.props.grid_config.margin ? this.props.grid_config.margin : [10, 10]}
                        // preventCollision={true}
                        // isBounded={false}
                        // onLayoutChange={this.onLayoutChange}
                        // onBreakpointChange={this.onBreakpointChange}
                        {...this.props}
                >
                    {this.props.componentDicts.map((componentDict, index) => {
                        return <div className={'widget'}
                                // itemevation={3}
                                    key={componentDict.id}
                                    data-grid={{
                                        i: componentDict.id,
                                        x: componentDict.x,
                                        y: componentDict.y,
                                        h: componentDict.h,
                                        w: componentDict.w
                                    }}
                        >

                            <BaseWidget componentDict={componentDict}
                                        handleRemove={this.props.handleRemove}
                                        handleCreate={this.props.handleCreate}/>
                        </div>
                    })}
                </ResponsiveGridLayout>
        );
    }
}
