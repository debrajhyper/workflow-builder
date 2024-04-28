import { useAppSelector, getWorkflowListSelectors } from "@Services";
import { WorkflowCard } from "@Components";
import { Link } from "react-router-dom";
import { WorkflowType } from "types";

export function HomePage() {
    const list = useAppSelector(getWorkflowListSelectors);

    return (
        <>
            <div className={`flex flex-wrap p-4 h-[86%] ${list.length === 0 ? "items-center" : ""}`}>
                {list.length === 0 ? (
                    <div className="container flex flex-col items-center">
                        <div className="flex flex-col gap-6 max-w-md text-center">
                            <p className="text-2xl md:text-3xl dark:text-gray-300">
                                There is no workflow found
                            </p>
                            <Link
                                to="/workflow"
                                className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200"
                            >
                                + Create workflow
                            </Link>
                        </div>
                    </div>
                ) : (
                    list.map((item: Pick<WorkflowType, "id" | "name">) => <WorkflowCard key={item.id} data={item} />)
                )}
            </div>
        </>
    );
}