import { XYPosition } from "reactflow";

type SortDataProps = {
    tableData: Array<string[]>;
    sortConfig: {
        column: string;
        order: string
    };
}

type FilterDataProps = {
    tableData: Array<string[]>;
    filterConfig: {
        column: string;
        operation: string;
        filter: string
    };
}

type GetNewNodeProps = {
    type: NodeType;
    position?: XYPosition;
}