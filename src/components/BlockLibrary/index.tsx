import { blockLibrary } from "../../data";
import { BlockCategory } from "./BlockCategory";

export function BlockLibrary() {
    const categoryList = Object.keys(
        blockLibrary
    ) as (keyof typeof blockLibrary)[];

    return (
        <div className="flex flex-col flex-[0.25] border-r border-border">
            <div className="flex items-center justify-between border-b border-border bg-background px-4 py-1 h-8">
                <span className="text-sm font-bold">Assets</span>
            </div>
            <div className="p-4 overflow-auto">
                {categoryList.map((key) => (
                    <BlockCategory key={key} name={key} data={blockLibrary[key]} />
                ))}
            </div>
        </div>
    );
}