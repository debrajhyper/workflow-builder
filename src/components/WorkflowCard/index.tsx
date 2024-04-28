import { WorkflowType } from "types";
import { Link } from "react-router-dom";

export function WorkflowCard(props: { data: Pick<WorkflowType, "id" | "name"> }) {
    const { data: { id, name } } = props;
    return (
        <Link to={`/workflow/${id}`}>
            <div className="rounded overflow-hidden shadow-lg bg-card flex flex-col p-4 mb-4 mr-4 w-[250px] ">
                <div className="text-xs opacity-[0.7]">ID: {id}</div>
                <div className="text-md font-bold">{name}</div>
            </div>
        </Link>
    );
}