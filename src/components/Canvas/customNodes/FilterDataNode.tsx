import { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { filterData } from "@Utils";
import { IconFilter } from '@tabler/icons-react';
import { EMPTY_STring, NEGATIVE_ONE, EQUAL, NOT_EQUAL, INCLUDES, NOT_INCLUDES } from "@Constants";
import { setPreview, useAppDispatch } from "@Services";

export function FilterDataNode({ id, data }: NodeProps<NodeData>) {
    const [column, setColumn] = useState<string>(EMPTY_STring);
    const [operation, setOperation] = useState<string>(EQUAL);
    const [filter, setFilter] = useState<string>(EMPTY_STring);
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
                : [<option value={NEGATIVE_ONE}>No column selected</option>]
            ),
        ];
    }, [data]);

    const previewClickHandler = useCallback(() => {
        startTransition(() => {
            dispatch(
                setPreview(
                    filterData({
                        tableData: data?.list || [],
                        filterConfig: { column, operation, filter },
                    })
                )
            );
        });
    }, [column, data?.list, dispatch, filter, operation]);

    return (
        <>
            <Handle type="target" position={Position.Left} id={`${id}_target`} />
            <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 min-w-44 justify-center items-start">
                <span className="flex justify-center items-start text-sm font-bold mb-2"><IconFilter size={18} className="mr-1" />Filter</span>
                <label className="mb-1">Column</label>
                <select
                    value={column}
                    defaultValue=""
                    className="nodrag block appearance-none w-full bg-gray-900 border border-gray-600 text-gray-100 py-2 px-2 rounded leading-tight focus:outline-none mb-2"
                    onChange={(e) => {
                        setColumn(e.target.value);
                    }}
                >
                    {options}
                </select>
                <label className="mb-1">Condition</label>
                <select
                    value={operation}
                    className="nodrag block appearance-none w-full bg-gray-900 border border-gray-600 text-gray-100 py-2 px-2 rounded leading-tight focus:outline-none mb-2"
                    onChange={(e) => {
                        setOperation(e.target.value);
                    }}
                >
                    <option value={EQUAL}>equals to</option>
                    <option value={NOT_EQUAL}>not equals to</option>
                    <option value={INCLUDES}>includes</option>
                    <option value={NOT_INCLUDES}>does not include</option>
                </select>
                <label className="mb-1">Filter</label>
                <input
                    value={filter}
                    type="text"
                    className="nodrag block appearance-none w-full bg-gray-900 border border-gray-600 text-gray-100 py-2 px-2 rounded leading-tight focus:outline-none mb-2"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                />

                <button
                    className="nodrag rounded bg-background/60 hover:bg-background p-1.5 px-2.5 self-end"
                    onClick={previewClickHandler}
                >
                    Run
                </button>
            </div>
        </>
    );
}