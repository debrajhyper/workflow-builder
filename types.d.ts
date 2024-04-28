import { Edge, Node } from "reactflow";
import { BLOCK_INPUT, BLOCK_TRANSFORM, NODE_TYPE_FILE_UPLOAD, NODE_TYPE_FILTER, NODE_TYPE_SORT } from "@Constants";

type NodeType = NODE_TYPE_FILE_UPLOAD | NODE_TYPE_FILTER | NODE_TYPE_SORT;
type BlockCategoryType = BLOCK_INPUT | BLOCK_TRANSFORM;
type BlockType = {
    id: string;
    name: string;
    icon?: react.ForwardRefExoticComponent<Omit<IconProps, "ref"> & react.RefAttributes<Icon>>;
    description: string;
    input: string;
    output: string;
    nodeType: NodeType;
};

type WorkflowType = {
    id: number;
    name: string;
    nodes: Node[];
    edges: Edge[];
    preview: string[][] | string;
};
type WorkflowBuilderState = {
    items: WorkflowType[];
    currentItem: WorkflowType | null;
};