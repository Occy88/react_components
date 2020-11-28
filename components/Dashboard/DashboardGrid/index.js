import React from "react";
import {Responsive} from "react-grid-layout";
import './style.scss'
import BaseWidget from "../../BaseWidget";
import WidthProvider from './WidthProvider'
import ScrollContainer from "react-indiana-drag-scroll";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class DashboardGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        // this.onBreakpointChange = this.onBreakpointChange.bind(this);
        // this.onLayoutChange = this.onLayoutChange.bind(this);

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
        return (
            <div className={'DashboardGrid'}>

                    <ResponsiveGridLayout
                        useCSSTransforms={true}
                        transformScale={1}
                        rowHeight={100}
                        breakpoints={{res: 40}}
                        cols={{res: 100}}
                        // measureWidthBeforeMount={true}
                        compactType={'vertical'}
                        draggableCancel={'.nonDraggable'}
                        onResizeStop={() => window.dispatchEvent(new Event('resize'))}
                        onWidthChange={() => {
                            return null
                        }}
                        isBounded={false}
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
            </div>
        );
    }
}
