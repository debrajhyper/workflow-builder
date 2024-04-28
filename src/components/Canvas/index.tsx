import { useState } from "react";
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    Node,
    NodeTypes,
    ReactFlowInstance,
    XYPosition,
} from "reactflow";
import "reactflow/dist/style.css";
import { getNewNode } from "@Utils";
import { FileUploadNode, FilterDataNode, SortDataNode } from "./customNodes";
import { useDnD } from "@Hooks";

import {
    addNewNode,
    getEdgesSelectors,
    getNodesSelectors,
    updateEdges,
    updateNodes,
    useAppDispatch, useAppSelector
} from "@Services";
import { NodeType } from "types";


const nodeTypes: NodeTypes = {
    fileUploadNode: FileUploadNode,
    filterNode: FilterDataNode,
    sortNode: SortDataNode,
};

export function Canvas() {
    const dispatch = useAppDispatch();
    const nodes = useAppSelector(getNodesSelectors);
    const edges = useAppSelector(getEdgesSelectors);
    const [isHighlight, setIsHighlight] = useState(false);
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance | null>(null);
    console.log(nodes);
    console.log(edges);
    const onDropCallback = (params: {
        position?: XYPosition;
        type: NodeType;
    }) => {
        const { position, type } = params;

        const node = getNewNode({ position, type });
        dispatch(addNewNode(node as Node));
    };

    const { onDragOverHandler, onDropHandler } = useDnD({
        setIsHighlight,
        reactFlowInstance,
        onDropCallback,
    });

    return (
        <div className="flex-[0.75] flex h-full w-full relative text-xs">
            {isHighlight && (
                <div className="bg-previewBackground absolute inset-y-0 inset-x-0 border border-previewBorder rounded"></div>
            )}

            <ReactFlow
                nodes={nodes}
                onNodesChange={(changes) => {
                    dispatch(updateNodes(applyNodeChanges(changes, nodes)));
                }}
                onEdgesChange={(changes) => {
                    dispatch(
                        updateEdges({
                            edges: applyEdgeChanges(changes, edges),
                            currentEdge: changes,
                        })
                    );
                }}
                edges={edges}
                onInit={setReactFlowInstance}
                onDrop={onDropHandler}
                onDragEnter={() => setIsHighlight(true)}
                onDragLeave={() => setIsHighlight(false)}
                onConnect={(params) => {
                    dispatch(
                        updateEdges({ edges: addEdge(params, edges), currentEdge: params })
                    );
                }}
                onDragOver={onDragOverHandler}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls className="bg-white" />
            </ReactFlow>
        </div>
    );
}