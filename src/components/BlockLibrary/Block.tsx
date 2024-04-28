import { DragEvent } from "react";
import { DND_MOVE } from "@Constants";
import { DND_DATA_TRANSFER } from "@Utils";

export function Block({ data: { name, icon, description, input, output, nodeType } }: BlockProps) {
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData(DND_DATA_TRANSFER, nodeType);
        event.dataTransfer.effectAllowed = DND_MOVE;
    };

    return (
        <div
            onDragStart={(event) => onDragStart(event, nodeType)}
            className="rounded overflow-hidden shadow-lg bg-card flex flex-col p-3 mb-3 cursor-grab"
            draggable
        >
            {icon}
            <div className="text-md font-bold">{name}</div>
            <div className="text-xs opacity-[0.8]">{description}</div>
            <div className="flex flex-col mt-2">
                <span className="text-xs opacity-[0.4]">Input: {input}</span>
                <span className="text-xs opacity-[0.4]">Output: {output}</span>
            </div>
        </div>
    );
}