import { startTransition, useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { getTableDataFromText } from "@Utils";
import { IconFileTypeCsv } from '@tabler/icons-react';
import { setPreview, updateNodeData, useAppDispatch } from "@Services";

const fileReader = new FileReader();

export function FileUploadNode({ id, data }: NodeProps<NodeData>) {
    const dispatch = useAppDispatch();

    const saveFile = useCallback(
        (e: { target: { files: FileList | null; }; }) => {
            const file = e.target?.files;
            if (file) {
                fileReader.onload = (event) => {
                    const csvOutput = event?.target?.result;
                    dispatch(
                        updateNodeData({
                            id,
                            data: {
                                name: file[0].name,
                                list: getTableDataFromText(csvOutput as string),
                            },
                        })
                    );
                    startTransition(() => {
                        dispatch(setPreview(getTableDataFromText(csvOutput as string) || []));
                    });
                };
                fileReader.readAsText(file[0]);
            }
        },
        [dispatch, id]
    );

    const previewClickHandler = useCallback(() => {
        startTransition(() => {
            dispatch(setPreview(data?.list || []));
        });
    }, [data, dispatch]);

    return (
        <>
            <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 min-w-44 justify-center items-center">
                <span className="flex justify-center items-start text-sm font-bold mb-2 self-start">
                    <IconFileTypeCsv size={18} className="mr-1"/>
                    {data ? "CSV File" : "Upload CSV File"}
                </span>
                {data ? (
                    <>
                        {data.name && (
                            <span className="text-sm font-bold mb-2 self-start">
                                {data.name}
                            </span>
                        )}
                        <button
                            className="nodrag rounded bg-background/60 p-1.5 px-2.5 self-end mt-2 hover:bg-background"
                            onClick={previewClickHandler}
                        >
                            Run
                        </button>
                    </>
                ) : (
                    <input
                        type="file"
                        className="nodrag block w-full
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-background file:text-white
          hover:text-slate cursor-pointer"
                        id="custom-input"
                        onChange={saveFile}
                        hidden
                    />
                )}
            </div>
            {
                data
                    ? <span>[DATASET] {data?.list?.length - 1} rows | {data?.list?.[0]?.length} columns</span>
                    : null
            }
            <Handle type="source" position={Position.Right} id={`${id}_source`} />
        </>
    );
}