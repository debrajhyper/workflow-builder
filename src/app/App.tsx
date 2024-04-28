import { Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from "@Layout";
import { HomePage, WorkflowBuilder, NoMatchFound } from "@View";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="workflow" element={<WorkflowBuilder />}>
          <Route path=":id" element={<WorkflowBuilder />} />
        </Route>

        <Route path="*" element={<NoMatchFound />} />
      </Route>
    </Routes>
  )
}

export default App
