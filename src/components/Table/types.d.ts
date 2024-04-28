type CellType = string;
type RowType = CellType[];
type TableType = RowType[];

type TableProps = {
    data: TableType;
}

type RowProps = {
    data: RowType;
    isHeader: boolean;
}

type CellProps = {
    data: CellType;
    isHeader: boolean;
}