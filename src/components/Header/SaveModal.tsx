import { useState } from "react";
import { SaveModalProps } from "./types";
import { MODAL_CLOSE, MODAL_SAVE, EMPTY_STring, DEFAULT_WORKFLOW_NAME } from "@Constants";
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';

export function SaveModal({ id, workflowName, onClose }: SaveModalProps) {
    const [name, setName] = useState<string>(id !== 0 ? workflowName != undefined ? workflowName : DEFAULT_WORKFLOW_NAME : EMPTY_STring);

    return (
        <div id="modal" className="items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60 flex z-10">
            <div className="bg-background max-w-xl w-full rounded-lg shadow-lg">
                <div className="p-4 py-3 flex items-center justify-between border-b border-border">
                    <h3 className="font-semibold text-xl">Save Workflow</h3>
                    <span onClick={() => onClose({ type: MODAL_CLOSE })} className="modal-close cursor-pointer border border-border rounded-md p-2 hover:bg-border">
                        <IconX size={18} />
                    </span>
                </div>
                <div className="p-4 py-3 border-b border-border">
                    <div className="flex flex-col">
                        <label className="mb-2">Workflow Name</label>
                        <input
                            type="text"
                            value={name}
                            className="block appearance-none w-full bg-gray-900 border border-gray-600 text-gray-100 py-2 px-2 rounded leading-tight focus:outline-none mb-4"
                            onChange={(e) => setName(e?.target?.value)}
                        />
                    </div>
                </div>
                <div className="p-4 py-3 flex items-center justify-end">
                    <button onClick={() => onClose({ type: MODAL_SAVE, data: { id, name } })} className="flex justify-center items-center text-sm bg-border border border-border rounded-md px-4 py-2 hover:bg-transparent">
                        <IconDeviceFloppy size={18} />
                        <span className="ml-1">Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}