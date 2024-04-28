import { useAppSelector, useAppDispatch, getWorkflowByIdSelectors, setCurrentWorkflow } from "@Services";


import { Canvas, BlockLibrary, Title } from "@Components";
import { Preview } from "./Preview";
import { ReactFlowProvider } from "reactflow";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { newWorkflow } from "@Utils";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

export function WorkflowBuilder() {
    const { id: workflowId = 0 } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentItem = useAppSelector((state) =>
        getWorkflowByIdSelectors(state, Number(workflowId))
    );

    useEffect(() => {
        if (currentItem === null) {
            if (workflowId !== 0) {
                navigate("/");
            } else {
                dispatch(setCurrentWorkflow(newWorkflow));
            }
        } else {
            dispatch(setCurrentWorkflow(currentItem));
        }
    }, [currentItem, dispatch, navigate, workflowId]);

    return (
        <>
            <Title
                id={currentItem?.id || Number(workflowId)}
                name={currentItem?.name || "New Workflow"}
            />
            <PanelGroup autoSaveId="persistence" direction="vertical" className="!h-[86vh]">
                <Panel maxSize={95} className="flex w-full h-[54%]">
                    <ReactFlowProvider>
                        <BlockLibrary />
                        <Canvas />
                    </ReactFlowProvider>
                </Panel>
                <PanelResizeHandle />
                <Panel maxSize={75} className="flex flex-col h-[31.5%]">
                    <Preview />
                </Panel>
            </PanelGroup>
            {/* <div className="flex w-full h-[54%]">
                <ReactFlowProvider>
                    <BlockLibrary />
                    <Canvas />
                </ReactFlowProvider>
            </div>
            <div className="flex flex-col h-[31.5%]">
                <Preview />
            </div> */}
        </>
    );
}