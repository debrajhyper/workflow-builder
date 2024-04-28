import { MODAL_CLOSE, MODAL_SAVE } from "@Constants";

type OnCloseType = (params: {
    type: MODAL_CLOSE | MODAL_SAVE;
    data?: { id, name };
}) => void;

type SaveModalProps = {
    id: number | undefined;
    workflowName: string | undefined;
    onClose: OnCloseType;
}