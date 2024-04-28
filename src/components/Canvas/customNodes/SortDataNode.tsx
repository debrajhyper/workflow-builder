import { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { sortData } from "@Utils";
import { EMPTY_STring } from "@Constants";
import { IconArrowsSort } from '@tabler/icons-react';
import { setPreview, useAppDispatch } from "@Services";
import { ORDER_ASC, NEGATIVE_ONE, ORDER_DESC } from '@Constants';

export function SortDataNode({ id, data }: NodeProps<NodeData>) {
    const [column, setColumn] = useState<string>(EMPTY_STring);
    const [order, setOrder] = useState<string>(ORDER_ASC);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setColumn(EMPTY_STring);
    }, [data]);

    const options = useMemo(() => {
        return [
            ...(data
                ? data.list[0].map((item: string, index: number) => (
                    <option key={item} value={index} className="text-sm cursor-pointer">{item}</option>
                ))
                : [<option value={NEGATIVE_ONE}>No column selected</option>]),
        ];
    }, [data]);

    const previewClickHandler = useCallback(() => {
        startTransition(() => {
            dispatch(
                setPreview(
                    sortData({
                        tableData: data?.list || [],
                        sortConfig: { column, order },
                    })
                )
            );
        });
    }, [column, data?.list, dispatch, order]);

    console.log(data)

    return (
        <>
            <Handle type="target" position={Position.Left} id={`${id}_target`} />
            <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 min-w-44 justify-center items-start">
                <span className="flex justify-center items-start text-sm font-bold mb-2"><IconArrowsSort size={18} className="mr-1" />Sort</span>
                <label className="mb-1">Column</label>
                <select
                    value={column}
                    className="block appearance-none w-full bg-gray-900 border border-gray-600 text-gray-100 py-2 px-2 rounded leading-tight focus:outline-none mb-2"
                    onChange={(e) => {
                        setColumn(e.target.value);
                    }}
                >
                    {options}
                </select>
                <label className="mb-1">Sort by</label>
                <select
                    value={order}
                    className="block appearance-none w-full bg-gray-900 border border-gray-600 text-gray-100 py-2 px-2 rounded leading-tight focus:outline-none mb-2"
                    onChange={(e) => {
                        setOrder(e.target.value);
                    }}
                >
                    <option value={ORDER_ASC}>asc</option>
                    <option value={ORDER_DESC}>desc</option>
                </select>
                <button
                    className="rounded bg-background/60 hover:bg-background p-1.5 px-2.5 self-end"
                    onClick={previewClickHandler}
                >
                    Run
                </button>
            </div>
        </>
    );
}