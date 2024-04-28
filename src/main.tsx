import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@App/App';
import './index.css'
import { Provider } from "react-redux";
import { workflowStore } from "@Services";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={workflowStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
