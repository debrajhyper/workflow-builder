import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import workflowReducer from "./workflowSlice";

export const workflowStore = configureStore({
    reducer: {
        workFlowBuilder: workflowReducer,
    }
});

export type AppDispatch = typeof workflowStore.dispatch;
export type RootState = ReturnType<typeof workflowStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;