import { blockLibrary } from "./BlockDetails";
import { BlockCategory } from "./BlockCategory";
import { IconHexagons } from '@tabler/icons-react';

export function BlockLibrary() {
    const categoryList = Object.keys(blockLibrary) as (keyof typeof blockLibrary)[];

    return (
        <div className="flex flex-col flex-[0.5] md:flex-[0.3] lg:flex-[0.18] border-r border-border">
            <div className="flex items-center justify-start px-2 py-1 h-7">
                <IconHexagons size={18} />
                <span className="text-md font-bold ml-1">Block Library</span>
            </div>
            <div className="p-2 overflow-auto">
                {
                    categoryList.map((key) => (
                        <BlockCategory key={key} name={key} data={blockLibrary[key]} />
                    ))
                }
            </div>
        </div>
    );
}