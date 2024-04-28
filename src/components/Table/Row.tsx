import { RowType } from "types";
import { Cell } from "./Cell";

export function Row(props: { data: RowType; isHeader: boolean }) {
    const { data, isHeader } = props;
    return (
        <div className={`flex relative ${isHeader && 'sticky top-0 font-bold z-10'}`}>
            {data.map((cellData, index) => (
                // just to avoid key waring in the console
                // using index is not appropriate practice
                // in reality, we usually use table library
                <Cell key={index} data={cellData} isHeader={isHeader} />
            ))}
        </div>
    );
}