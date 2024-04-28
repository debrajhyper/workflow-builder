import { FilterDataProps, GetNewNodeProps, SortDataProps } from "./types";
import { EMPTY_STring, NOT_EQUAL, TAB_NEW_LINE, ZERO, DEFAULT_WORKFLOW_NAME, COMA, EQUAL, INCLUDES, NEGATIVE_ONE, NOT_INCLUDES, NO_PREVIEW, ORDER_DESC } from "@Constants";

export const DND_DATA_TRANSFER = "application/reactflow";

export const newWorkflow = {
    id: 0,
    name: DEFAULT_WORKFLOW_NAME,
    nodes: [],
    edges: [],
    preview: NO_PREVIEW,
};

export const getNewNode = ({ type, position }: GetNewNodeProps) => {
    return {
        id: ZERO,
        type,
        position,
        data: null,
    };
};

export const getTableDataFromText = (csvText: string) => {
    const data = csvText.split(TAB_NEW_LINE);
    return data.map((rows) => {
        return rows
            .split(/(".*?"|[^",]+)(?=\s*,|\s*$)/)
            .filter((item) => ![EMPTY_STring, COMA].includes(item));
    });
};

export const filterData = ({ tableData, filterConfig: { column, operation, filter } }: FilterDataProps) => {
    if (!tableData || tableData.length === 0) {
        return NO_PREVIEW;
    }
    return tableData.filter((row, index) => {
        if (index === 0 || column === NEGATIVE_ONE || filter === EMPTY_STring) {
            return true;
        }
        if (operation === EQUAL) {
            if (row[+column] !== filter) {
                return false;
            }
        }
        if (operation === NOT_EQUAL) {
            if (row[+column] === filter) {
                return false;
            }
        }
        if (operation === INCLUDES) {
            if (!row[+column].includes(filter)) {
                return false;
            }
        }
        if (operation === NOT_INCLUDES) {
            if (row[+column].includes(filter)) {
                return false;
            }
        }
        return true;
    });
};


export const sortData = ({ tableData, sortConfig: { column, order } }: SortDataProps) => {
    // Check if tableData is empty or undefined
    if (!tableData || tableData.length === 0) {
        return [[NO_PREVIEW]];
    }
    // Check if column is set to "-1" indicating no sorting needed
    if (column === NEGATIVE_ONE) {
        return tableData;
    }
    // Sort the tableData based on the specified column and order
    const sortedTableData = [...tableData];
    // Return the sorted tableData with the header row
    return [sortedTableData[0], ...sortedTableData.slice(1).sort((a, b) => {
        if (a[+column] && b[+column]) {
            return (
                (a[+column].localeCompare(b[+column])) *
                (order === ORDER_DESC ? -1 : 1)
            );
        }
        return 0;
    })];
};