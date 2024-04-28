import { Cell } from "./Cell";

export function Row({ data, isHeader }: RowProps) {
    return (
        <div className={`flex relative ${isHeader && 'sticky top-0 font-bold z-10'}`}>
            {data.map((cellData, index) => (
                <Cell key={index} data={cellData} isHeader={isHeader} />
            ))}
        </div>
    );
}