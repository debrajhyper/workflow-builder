import { useCallback, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { OnCloseType } from "./types";
import { HOME_PATH } from "@Routes";
import { SaveModal } from "./SaveModal";
import { MODAL_SAVE } from "@Constants";
import { IconFolderPlus, IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { createWorkflow, getCurrentWorkflowSelectors, updateWorkflow, useAppDispatch, useAppSelector } from "@Services";

export function Header() {
    const dispatch = useAppDispatch();
    const currentWorkflow = useAppSelector(getCurrentWorkflowSelectors);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    const onClose = useCallback(
        (params: Parameters<OnCloseType>[0]) => {
            const { type, data } = params;
            setIsOpen(false);
            if (type === MODAL_SAVE && currentWorkflow) {
                if (data?.id === 0) {
                    dispatch(createWorkflow({ ...currentWorkflow, id: data?.id, name: data?.name }));
                } else {
                    dispatch(
                        updateWorkflow({
                            id: data?.id,
                            data: { ...currentWorkflow, name: data?.name },
                        })
                    );
                }
                navigate(HOME_PATH);
            }
        },
        [currentWorkflow, dispatch, navigate]
    );

    return (
        <>
            <header className="flex justify-between items-center bg-header border-b border-border px-4 h-12">
                <div className="flex items-center h-full font-extrabold text-2xl tracking-tighter text-[#4f4e60]">
                    <span>Workflow Builder</span>
                </div>
                {
                    currentWorkflow && location?.pathname !== HOME_PATH
                        ? (
                            <span className="flex justify-center items-center text-sm font-semibold">
                                <IconFolderPlus size={18} />
                                <span className="ml-1">{currentWorkflow?.name}</span>
                            </span>
                        )
                        : null
                }
                {
                    currentWorkflow && location?.pathname !== HOME_PATH
                        ? (
                            <div className="flex gap-4">
                                <button onClick={() => setIsOpen(true)} title="Click to save workflow" className="flex justify-center items-center rounded border border-border p-1.5 px-4 text-xs font-bold hover:bg-border">
                                    <IconDeviceFloppy size={18} />
                                    <span className="ml-1">Save workflow</span>
                                </button>
                                <Link to={HOME_PATH} title="Click to close workflow" className="flex justify-center items-center rounded border border-border p-1.5 px-1.5 text-xs font-bold hover:bg-border">
                                    <IconX size={18} />
                                </Link>
                            </div>
                        )
                        : null
                }
            </header>
            {isOpen && (
                <SaveModal
                    id={currentWorkflow?.id}
                    workflowName={currentWorkflow?.name}
                    onClose={onClose}
                />
            )}
        </>
    );
}