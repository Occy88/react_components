import React from "react";
import {Responsive} from "react-grid-layout";
import './style.scss'
import BaseWidget from "../../BaseWidget";
import WidthProvider from './WidthProvider'
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
                    rowHeight={screen.height / 10}
                    breakpoints={{res: 4}}
                    cols={{res: 4}}
                    compactType={'vertical'}
                    draggableCancel={'.nonDraggable'}
                    autoSize={false}
                    onWidthChange={() => {
                        return null
                    }}
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
