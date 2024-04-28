import { CellType } from "types";

export function Cell(props: { data: CellType, isHeader: boolean }) {
    const { data, isHeader } = props;
    return (
        <div className={`${isHeader ? 'bg-[#262445]' :'bg-background'} border border-border p-2 h-full min-w-28 w-28 max-w-28`}>
            {data}
        </div>
    );
}