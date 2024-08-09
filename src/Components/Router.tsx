import { HashRouter, Route, Routes } from 'react-router-dom';
import Root from '../Layouts/Root';
import { Home } from '../Pages/Home';
import { Sql } from '../Pages/Sql';

export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route element={<Home />} path="/" />
          <Route element={<Sql />} path="/sql" />
        </Route>
      </Routes>
    </HashRouter>
  );
}
