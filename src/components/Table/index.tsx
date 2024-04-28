
import { TableType } from "types";
import { Row } from "./Row";

export function Table(props: { data: TableType }) {
    const { data } = props;
    return (
        <div className="flex flex-col text-xs">
            {data.map((rowData, index) => (
                // just to avoid key waring in the console
                // using index is not appropriate practice
                // in reality, we usually use table library
                <Row key={index} data={rowData} isHeader={index == 0} />
            ))}
        </div>
    );
}