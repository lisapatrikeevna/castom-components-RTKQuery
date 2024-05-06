import {App} from "@/App.tsx";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'
import { store } from "@/services/store.ts";
import { Provider } from "react-redux";


createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </StrictMode>
)
