import React from 'react';
import './style.scss'
import languages from "./lang.js"
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


/**
 *  takes a list of any html items
 *  and places them into a nice dropdown
 *  on selection, the item is returned?
 */
export default class TreeDirectoryViewer extends React.Component {
    /**
     * Props should set the variables for the list ( objects should be a string and an id)
     * Props should send api_url (url to get objects from)
     * @param props : object_list, handleSelect (function)
     */
    constructor(props) {
        super(props);
        //by default hide on scroll, user can decide not to
        //  {
        //     id: 'root',
        //     name: 'Parent',
        //     children: [
        //         {
        //             id: '1',
        //             name: 'Child - 1',
        //         },
        //         {
        //             id: '3',
        //             name: 'Child - 3',
        //             children: [
        //                 {
        //                     id: '4',
        //                     name: 'Child - 4',
        //                 },
        //             ],
        //         },
        //     ],
        // };
    }

    /**
     * Render the list witall_datah an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {

        console.log("--------1----------")
        // const classes = useStyles();
        console.log("---------2-------------")
        const renderTree = (nodes) => (
                <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
                    {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
                </TreeItem>
        );
        let tree = renderTree(this.props.data)
        console.log("--------3----------")
        console.log(tree)
        return (
                <TreeView
                        // className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpanded={['root']}
                        defaultExpandIcon={<ChevronRightIcon/>}
                >
                    {tree}
                </TreeView>
        );
    }
}

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});