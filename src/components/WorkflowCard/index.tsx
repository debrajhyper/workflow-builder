import { Link } from "react-router-dom";
import { WorkflowType } from "types";
import { WORKFLOW_ID_LINK } from "@Routes";
import { IconFolderPlus } from '@tabler/icons-react';

export function WorkflowCard(props: { data: Pick<WorkflowType, "id" | "name"> }) {
    const { data: { id, name } } = props;
    return (
        <Link to={`${WORKFLOW_ID_LINK}${id}`} className="w-44 h-32">
            <div className="rounded overflow-hidden shadow-xl bg-card/60 hover:bg-card flex flex-col p-4 h-full w-full" title={name}>
                <div className="text-xs opacity-[0.7]"><IconFolderPlus /> ID: {id}</div>
                <div className="text-md font-bold leading-5 line-clamp-2 mt-3">{name}</div>
            </div>
        </Link>
    );
}