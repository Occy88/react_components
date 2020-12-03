import React from "react";
import ReactDOM from "react-dom";

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
export default function WidthProvider(WrappedComponent) {
    return class WidthProvider extends React.Component {


        constructor(props) {
            super(props);
            this.state = {
                width: 10000,
                mounted: false,
            };
            this.onWindowResize = this.onWindowResize.bind(this);
        }


        componentDidMount() {
            this.setState({
                mounted: true
            });
            // window.addEventListener("resize", this.onWindowResize);
            // Call to properly set the breakpoint and resize the elements.
            // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
            // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.
            // this.onWindowResize();
        }

        componentWillUnmount() {
            this.setState({
                mounted: false
            });
            // window.removeEventListener("resize", this.onWindowResize);
        }

        onWindowResize() {
            // return null
            if (!this.state.mounted) return;
            // eslint-disable-next-line react/no-find-dom-node
            const node = ReactDOM.findDOMNode(this); // Flow casts this to Text | Element
            if (node instanceof HTMLElement)
                this.setState({width: 10000});
        };

        render() {
            const {...rest} = this.props;
            if (this.mounted) {
                return (
                        <div className={this.props.className} style={this.props.style}/>
                );
            }

            return <WrappedComponent {...rest} {...this.state} />;
        }
    };
}
