import { useCallback } from "react";
import { NodeType } from "types";
import { UseDnDProps } from "./types";
import { DND_DATA_TRANSFER } from "@Utils";
import { DND_MOVE, UNDEFINED } from "@Constants";

export const useDnD = ({ setIsHighlight, onDropCallback, reactFlowInstance }: UseDnDProps ) => {
    const onDropHandler = (event: { dataTransfer: { getData: (arg0: string) => string; }; clientX: number; clientY: number; }) => {
        setIsHighlight(false);
        const type = event?.dataTransfer.getData(DND_DATA_TRANSFER) as NodeType;
        // check if the dropped element is valid
        if (typeof type === UNDEFINED || !type) {
            return;
        }
        const position = reactFlowInstance?.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        onDropCallback({ position, type });
    };
    const onDragOverHandler = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = DND_MOVE;
    }, []);

    return { onDropHandler, onDragOverHandler };
};