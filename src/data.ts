import { BlockCategoryType, BlockType } from "types";

export const blockCategory: Record<BlockCategoryType, string> = {
    input: "Input",
    transform: "Transform",
};

export const blockLibrary: Record<BlockCategoryType, BlockType[]> = {
    input: [
        {
            id: "csv",
            name: "CSV Block",
            description: "Handle csv files",
            nodeType: "fileUploadNode",
        },
    ],
    transform: [
        {
            id: "filter",
            name: "Filter",
            description: "Group a data set based on a given column name",
            nodeType: "filterNode",
        },
        {
            id: "sort",
            name: "Sort",
            description: "Sort data based on column name",
            nodeType: "sortNode",
        },
    ],
};

export const tableData = [
    ["Name", "Age", "Phone number"],
    ["Neel", "12", "123456790"],
    ["Neel12", "23", "123456790"],
];