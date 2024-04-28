
import { Key } from "react";
import { Row } from "./Row";

export function Table({ data }: TableProps) {
    return (
        <div className="flex flex-col text-xs">
            {data.map((rowData: RowType, index: Key | null | undefined) => (
                <Row key={index} data={rowData} isHeader={index == 0} />
            ))}
        </div>
    );
}