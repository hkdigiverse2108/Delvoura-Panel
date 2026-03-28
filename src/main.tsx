// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import 'antd/dist/reset.css';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// import { Provider } from "react-redux";
// import { createRoot } from "react-dom/client";
// import { store } from "./Store/Store"; 
// import App from "./App";
// import "./index.css";
// import "../public/assets/css/style.css";


// createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <App/>
//   </Provider>
// );


import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/Store";
import App from "./App";
 import "../public/assets/css/style.css";
 import "../public/assets/css/first.css";
 

// ✅ React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Redux Persist
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);