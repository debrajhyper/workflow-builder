import { useState } from "react";
import { OnCloseType } from "types";

export function SaveModal(props: {
    id: number;
    workflowName: string;
    onClose: OnCloseType;
}) {
    const { id, workflowName, onClose } = props;
    const [name, setName] = useState<string>(id !== 0 ? workflowName : "");
    return (
        <div
            id="modal"
            className="items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60 flex z-10"
        >
            <div className="bg-background max-w-xl w-full rounded-md">
                <div className="p-4 py-3 flex items-center justify-between border-b border-border">
                    <h3 className="font-semibold text-xl">Save Workflow</h3>
                    <span
                        className="modal-close cursor-pointer border border-border rounded-md px-4 py-2 hover:bg-border"
                        onClick={() => onClose({ type: "close" })}
                    >
                        ×
                    </span>
                </div>
                <div className="p-4 py-3 border-b border-border">
                    <div className="flex flex-col">
                        <label className="mb-4">Workflow Name</label>
                        <input
                            type="text"
                            value={name}
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
                            onChange={(e) => setName(e?.target?.value)}
                        />
                    </div>
                </div>
                <div className="p-4 py-3 flex items-center justify-end">
                    <div>
                        <button
                            className="text-sm bg-border border border-border rounded-md px-4 py-2 mr-4 hover:bg-transparent"
                            onClick={() => onClose({ type: "save", data: { id, name } })}
                        >
                            Save
                        </button>
                        <button
                            className="modal-close text-sm border border-border rounded-md px-4 py-2 hover:bg-border"
                            onClick={() => onClose({ type: "cancel" })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}