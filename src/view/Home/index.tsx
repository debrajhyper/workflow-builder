import { Link } from "react-router-dom";
import { WorkflowType } from "types";
import { WORKFLOW_LINK } from "@Routes";
import { WorkflowCard } from "@Components";
import { useAppSelector, getWorkflowListSelectors } from "@Services";
import { IconFolderPlus } from '@tabler/icons-react';

export function HomePage() {
    const list = useAppSelector(getWorkflowListSelectors);

    return (
        <main className="grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 
        gap-6 sm:gap-8 md:gap-4 lg:gap-5 xl:gap-4 
        p-6 sm:p-8 md:p-4 lg:p-5 xl:p-4 
        justify-items-center">
            {
                list.map((item: Pick<WorkflowType, "id" | "name">) => <WorkflowCard key={item.id} data={item} />)
            }
            <Link to={WORKFLOW_LINK} className="w-44 h-32">
                <div className="rounded overflow-hidden shadow-xl bg-card/60 hover:bg-card flex flex-col justify-center items-center p-4 h-full w-full">
                    <IconFolderPlus />
                    <div className="text-md">create workflow</div>
                </div>
            </Link>
        </main>
    );
}