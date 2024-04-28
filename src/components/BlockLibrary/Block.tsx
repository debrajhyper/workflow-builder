import { BlockType } from "types";
import { DND_DATA_TRANSFER } from "../../utils";
import { DragEvent } from "react";

export function Block(props: { data: BlockType }) {
    const {
        data: { name, description, nodeType },
    } = props;

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData(DND_DATA_TRANSFER, nodeType);
        event.dataTransfer.effectAllowed = "move";
    };
    return (
        <div
            className="rounded overflow-hidden shadow-lg bg-card flex flex-col p-4 mb-4"
            onDragStart={(event) => onDragStart(event, nodeType)}
            draggable
        >
            <div className="text-md font-bold">{name}</div>
            <div className="text-xs opacity-[0.7]">{description}</div>
        </div>
    );
}