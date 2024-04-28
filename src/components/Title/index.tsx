
import { SaveModal } from "./SaveModal";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OnCloseType } from "types";
import {
    createWorkflow,
    getCurrentWorkflowSelectors,
    updateWorkflow,
    useAppDispatch, useAppSelector
} from "@Services";

export function Title({ id, name }: { id: number, name: string }) {
    console.log(id, name)
    const dispatch = useAppDispatch();
    const currentWorkflow = useAppSelector(getCurrentWorkflowSelectors);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const onClose = useCallback(
        (params: Parameters<OnCloseType>[0]) => {
            const { type, data } = params;
            setIsOpen(false);
            if (type === "save" && currentWorkflow) {
                if (data?.id === 0) {
                    console.log("add");
                    dispatch(createWorkflow({ ...currentWorkflow, id: data?.id, name: data?.name }));
                } else {
                    dispatch(
                        updateWorkflow({
                            id: data?.id,
                            data: { ...currentWorkflow, name: data?.name },
                        })
                    );
                }
                navigate("/");
            }
        },
        [currentWorkflow, dispatch, navigate]
    );

    if (!currentWorkflow) {
        return <></>;
    }

    return (
        <>
            <div className="bg-header border-b border-border px-4 h-10 flex justify-between items-center">
                <div className="flex items-center h-full font-bold text-md">
                    <Link to="/">
                        {/* <ArrowLeft /> */}
                        Arrow Left
                    </Link>
                    <span className="ml-4">{currentWorkflow.name}</span>
                </div>
                <button
                    className="rounded border border-border p-1 px-3 text-xs font-bold hover:bg-border"
                    onClick={() => setIsOpen(true)}
                >
                    Save workflow
                </button>
            </div>
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
