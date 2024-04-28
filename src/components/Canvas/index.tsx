import { useState } from "react";
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, Node, NodeTypes, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { useDnD } from "@Hooks";
import { getNewNode } from "@Utils";
import { OnDropCallbackProps } from "./types";
import { FileUploadNode, FilterDataNode, SortDataNode } from "./customNodes";
import { addNewNode, getEdgesSelectors, getNodesSelectors, updateEdges, updateNodes, useAppDispatch, useAppSelector } from "@Services";

const nodeTypes: NodeTypes = {
    fileUploadNode: FileUploadNode,
    filterNode: FilterDataNode,
    sortNode: SortDataNode,
};

export function Canvas() {
    const [isHighlight, setIsHighlight] = useState(false);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const nodes = useAppSelector(getNodesSelectors);
    const edges = useAppSelector(getEdgesSelectors);
    const dispatch = useAppDispatch();

    const onDropCallback = ({ position, type }: OnDropCallbackProps) => {
        const node = getNewNode({ position, type });
        dispatch(addNewNode(node as Node));
    };

    const { onDragOverHandler, onDropHandler } = useDnD({
        setIsHighlight,
        reactFlowInstance,
        onDropCallback,
    });

    return (
        <div className="flex-[0.85] flex h-full w-full relative text-xs">
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