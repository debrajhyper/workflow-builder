import { blockCategory } from "../../data";
import { BlockCategoryType, BlockType } from "types";
import { Block } from "./Block";

export function BlockCategory(props: {
    name: BlockCategoryType;
    data: BlockType[];
}) {
    const { name, data } = props;
    return (
        <>
            <div className="font-bold mb-4">{blockCategory[name]}</div>
            {data.map((block) => {
                return <Block key={block.id} data={block} />;
            })}
        </>
    );
}