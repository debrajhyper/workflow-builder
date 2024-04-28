import { Route, Routes } from "react-router-dom";
import { Layout } from "@Layout";
import { HomePage, WorkflowBuilder, NoMatchFound } from "@View";
import { HOME_PATH, No_MATCH_FOUND_PATH, WORKFLOW_ID_PATH, WORKFLOW_PATH } from "@Routes";

function App() {
  return (
    <Routes>
      <Route path={HOME_PATH} element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path={WORKFLOW_PATH} element={<WorkflowBuilder />}>
          <Route path={WORKFLOW_ID_PATH} element={<WorkflowBuilder />} />
        </Route>

        <Route path={No_MATCH_FOUND_PATH} element={<NoMatchFound />} />
      </Route>
    </Routes>
  )
}

export default App
