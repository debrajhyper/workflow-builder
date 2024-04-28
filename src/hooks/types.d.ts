import { ReactFlowInstance, XYPosition } from "reactflow";

type UseDnDProps = {
    setIsHighlight: React.Dispatch<React.SetStateAction<boolean>>;
    onDropCallback: (params: { position?: XYPosition; type: NodeType }) => void;
    reactFlowInstance: ReactFlowInstance | null;
}