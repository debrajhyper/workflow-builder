import { BlockCategoryType, BlockType } from "types";
import { NODE_TYPE_FILE_UPLOAD, NODE_TYPE_FILTER, NODE_TYPE_SORT } from "@Constants";
import { IconFileTypeCsv, IconFilter, IconArrowsSort } from '@tabler/icons-react';

export const blockCategory: Record<BlockCategoryType, string> = {
    input: "Input",
    transform: "Transform",
};

export const blockLibrary: Record<BlockCategoryType, BlockType[]> = {
    input: [
        {
            id: "csv",
            name: "CSV File",
            icon: <IconFileTypeCsv />,
            description: "Handles csv files.",
            input: 'CSV File',
            output: 'Dataset',
            nodeType: NODE_TYPE_FILE_UPLOAD,
        },
    ],
    transform: [
        {
            id: "filter",
            name: "Filter",
            icon: <IconFilter />,
            description: "Groups a data set based on a given column.",
            input: 'Dataset',
            output: 'Dataset',
            nodeType: NODE_TYPE_FILTER,
        },
        {
            id: "sort",
            name: "Sort",
            icon: <IconArrowsSort />,
            description: "Sorts data based on a given column.",
            input: 'Dataset',
            output: 'Dataset',
            nodeType: NODE_TYPE_SORT,
        },
    ],
};