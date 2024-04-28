import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { HOME_PATH } from "@Routes";
import { newWorkflow } from "@Utils";
import { Preview } from "./Preview";
import { Canvas, BlockLibrary } from "@Components";
import { useAppSelector, useAppDispatch, getWorkflowByIdSelectors, setCurrentWorkflow } from "@Services";
import { PanelGroup, Panel, PanelResizeHandle, ImperativePanelGroupHandle } from "react-resizable-panels";

export function WorkflowBuilder() {
    const { id: workflowId = 0 } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentItem = useAppSelector((state) =>
        getWorkflowByIdSelectors(state, Number(workflowId))
    );
    const panelRef = useRef<ImperativePanelGroupHandle | null>(null);

    useEffect(() => {
        const panelGroup = panelRef.current;
        if (panelGroup) {
            panelGroup.setLayout([70, 30]);
        }
    }, [panelRef])

    useEffect(() => {
        if (currentItem === null) {
            if (workflowId !== 0) {
                navigate(HOME_PATH);
            } else {
                dispatch(setCurrentWorkflow(newWorkflow));
            }
        } else {
            dispatch(setCurrentWorkflow(currentItem));
        }
    }, [currentItem, dispatch, navigate, workflowId]);

    return (
        <>
            <PanelGroup autoSaveId="persistence" direction="vertical" className="!h-[93vh]" ref={panelRef}>
                <Panel maxSize={95} className="flex w-full">
                    <ReactFlowProvider>
                        <BlockLibrary />
                        <Canvas />
                    </ReactFlowProvider>
                </Panel>
                <PanelResizeHandle />
                <Panel collapsible maxSize={75} className="flex flex-col">
                    <Preview />
                </Panel>
            </PanelGroup>
        </>
    );
}