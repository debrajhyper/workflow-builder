import { Block } from "./Block";
import { blockCategory } from "./BlockDetails";

export function BlockCategory({ name, data }: BlockCategoryProps) {
    return (
        <>
            <div className="font-bold mb-1">{blockCategory[name]}</div>
            {
                data.map((block) => {
                    return <Block key={block.id} data={block} />;
                })
            }
        </>
    );
}