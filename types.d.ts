import { Edge, Node } from "reactflow";

type BlockCategoryType = "input" | "transform";
type NodeType = "fileUploadNode" | "filterNode" | "sortNode";
type BlockType = {
    id: string;
    name: string;
    description: string;
    nodeType: NodeType;
};

type CellType = string;
type RowType = CellType[];
type TableType = RowType[];

type OnCloseType = (params: {
    type: "close" | "save" | "cancel";
    data?: { id, name };
}) => void;

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