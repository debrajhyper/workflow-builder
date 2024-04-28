import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY, NO_PREVIEW, NODE_TYPE_FILE_UPLOAD, STORE_NAME } from "@Constants";
import { RootState } from "./workflowStore";
import { Connection, Edge, EdgeChange, Node, NodeRemoveChange } from "reactflow";
import { WorkflowBuilderState, WorkflowType } from "types";

const storedItems: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
const parsedItems = storedItems ? JSON.parse(storedItems) : null;
const localItems = parsedItems !== null ? parsedItems : [];
const initialState: WorkflowBuilderState = {
    items: localItems || [],
    currentItem: null,
};

export const workflowBuilderSlice = createSlice({
    name: STORE_NAME,
    initialState,
    reducers: {
        setCurrentWorkflow: (state, action: PayloadAction<WorkflowType>) => {
            state.currentItem = action.payload;
        },
        resetCurrentWorkflow: (state) => {
            state.currentItem = initialState.currentItem;
        },
        createWorkflow: (state, action: PayloadAction<WorkflowType>) => {
            // state.currentItem = initialState.currentItem;
            const newWorkflow = { ...action.payload, id: state.items.length + 1 };
            state.items.push(newWorkflow);
            state.currentItem = newWorkflow;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
        },
        updateWorkflow: (state, action: PayloadAction<{ id: number; data: WorkflowType }>) => {
            // state.currentItem = initialState.currentItem;
            const { id, data } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index] = data;
            state.currentItem = data;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
        },
        addNewNode: (state, action: PayloadAction<Node>) => {
            state.currentItem?.nodes.push({
                ...action.payload,
                id: (state.currentItem?.nodes.length + 1).toString(),
            });
        },
        updateNodes: (state, action: PayloadAction<Node[]>) => {
            if (state.currentItem) {
                state.currentItem.nodes = action.payload;
            }
        },
        updateNodeData: (state, action: PayloadAction<{ id: string; data: unknown }>) => {
            const { id, data } = action.payload;
            if (state.currentItem) {
                const index = state.currentItem.nodes.findIndex(
                    (node: { id: string; }) => node.id === id
                );
                state.currentItem.nodes[index].data = data;

                if (
                    state.currentItem.nodes[index].type === NODE_TYPE_FILE_UPLOAD &&
                    state.currentItem.edges.some((edge: { source: string; }) => edge.source === id)
                ) {
                    const filteredEdges = state.currentItem.edges.filter(
                        (edge: { source: string; }) => edge.source === id
                    );
                    filteredEdges.forEach((edge) => {
                        if (state.currentItem) {
                            const index = state.currentItem.nodes.findIndex(
                                (node) => node.id === edge.target
                            );
                            state.currentItem.nodes[index].data = data;
                        }
                    });
                }
            }
        },
        updateEdges: (
            state,
            action: PayloadAction<{
                edges: Edge[];
                currentEdge: Connection | EdgeChange[];
            }>
        ) => {
            const { edges, currentEdge } = action.payload;
            if (state.currentItem) {
                if (currentEdge instanceof Array) {
                    if (currentEdge[0].type === "remove") {
                        const edgeIndex = state.currentItem.edges.findIndex(
                            (edge) => edge.id === (currentEdge[0] as NodeRemoveChange).id
                        );
                        const foundEdge = state.currentItem.edges[edgeIndex];
                        const targetNodeIndex = state.currentItem.nodes.findIndex(
                            (node) => node.id === foundEdge.target
                        );
                        state.currentItem.nodes[targetNodeIndex].data = null;
                    }
                } else {
                    const sourceNodeIndex = state.currentItem.nodes.findIndex(
                        (node) => node.id === currentEdge.source
                    );
                    const targetNodeIndex = state.currentItem.nodes.findIndex(
                        (node) => node.id === currentEdge.target
                    );
                    if (
                        state.currentItem.nodes[sourceNodeIndex].type === NODE_TYPE_FILE_UPLOAD
                    ) {
                        state.currentItem.nodes[targetNodeIndex].data =
                            state.currentItem.nodes[sourceNodeIndex].data;
                    } else {
                        state.currentItem.nodes[targetNodeIndex].data = null;
                    }
                }
                state.currentItem.edges = edges;
            }
        },
        setPreview: (state, action) => {
            if (state.currentItem) {
                state.currentItem.preview = action.payload;
            }
        },
        resetPreview: (state) => {
            if (state.currentItem) {
                state.currentItem.preview =
                    initialState.currentItem?.preview || NO_PREVIEW;
            }
        },
    }
});

export const {
    createWorkflow,
    resetCurrentWorkflow,
    updateWorkflow,
    addNewNode,
    setPreview,
    resetPreview,
    setCurrentWorkflow,
    updateNodes,
    updateEdges,
    updateNodeData, } = workflowBuilderSlice.actions;


export const getWorkflowByIdSelectors = (state: RootState, workflowId?: number) => {
    return (
        state.workFlowBuilder.items.find((item: { id: number | undefined; }) => item.id === workflowId) || null
    );
};

export const getWorkFlowDataSelector = (state: RootState) => {
    return state.workFlowBuilder;
};

export const getWorkflowListSelectors = createSelector(getWorkFlowDataSelector, ({ items }) => {
    return items.map((workflow: { id: number; name: string; }) => ({
        id: workflow.id,
        name: workflow.name,
    }));
}
);

export const getPreviewSelectors = createSelector(
    getWorkFlowDataSelector,
    ({ currentItem }) => {
        return currentItem?.preview || NO_PREVIEW;
    }
);

export const getNodesSelectors = createSelector(
    getWorkFlowDataSelector,
    ({ currentItem }) => {
        return currentItem?.nodes || [];
    }
);

export const getEdgesSelectors = createSelector(
    getWorkFlowDataSelector,
    ({ currentItem }) => {
        return currentItem?.edges || [];
    }
);

export const getCurrentWorkflowSelectors = createSelector(
    getWorkFlowDataSelector,
    ({ currentItem }) => {
        return currentItem || null;
    }
);





export default workflowBuilderSlice.reducer;