import React from'react'
import App from './App';
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import './index.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App />}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
)