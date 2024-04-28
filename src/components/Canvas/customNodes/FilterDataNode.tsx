import {
    startTransition,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { filterData } from "@Utils";
import { setPreview, useAppDispatch } from "@Services";
import { Handle, NodeProps, Position } from "reactflow";

type NodeData = {
    name: string;
    list: string[][];
    id: string;
};

export function FilterDataNode(props: NodeProps<NodeData>) {
    const dispatch = useAppDispatch();
    const { id, data } = props;
    const [column, setColumn] = useState<string>("");
    const [operation, setOperation] = useState<string>("=");
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        setColumn("");
    }, [data]);

    const options = useMemo(() => {
        return [
            <option value="-1">Select</option>,
            ...(data
                ? data.list[0].map((item: string, index: number) => (
                    <option key={item} value={index}>{item}</option>
                ))
                : []),
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
            <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 justify-center items-start">
                <span className="text-sm font-bold mb-2">Filter</span>
                <label className="mb-2">Column</label>
                <select
                    value={column}
                    defaultValue=""
                    className="nodrag block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                    onChange={(e) => {
                        setColumn(e.target.value);
                    }}
                >
                    {options}
                </select>
                <label className="mb-2">Condition</label>
                <select
                    value={operation}
                    className="nodrag block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                    onChange={(e) => {
                        setOperation(e.target.value);
                    }}
                >
                    <option value="=">equals to</option>
                    <option value="!=">not equals to</option>
                    <option value="^">includes</option>
                    <option value="!^">does not include</option>
                </select>
                <label className="mb-2">Filter</label>
                <input
                    value={filter}
                    type="text"
                    className="nodrag block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                />

                <button
                    className="nodrag rounded bg-background p-2 self-end"
                    onClick={previewClickHandler}
                >
                    Run
                </button>
            </div>
        </>
    );
}