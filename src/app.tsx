import { createRoot } from 'react-dom/client';
import { Home } from './Pages/Home';
import { HashRouter, Route, Routes } from "react-router-dom";
import Root from './Layouts/Root';


const root = createRoot(document.body);
root.render(
    <HashRouter>
    <Routes>
        <Route path="/" element={<Root/>}>
            <Route element={<Home/ >} path="/"/>
        </Route>
    </Routes>
  </HashRouter>
);