import { Route, Routes } from 'react-router-dom';
import { HomeLayout, ProtectedLayout } from './components';

import { LoginPage, TodosPage, SignUpPage } from './pages';

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route path="/protected" element={<ProtectedLayout />}>
        <Route path="todos" element={<TodosPage />} />
      </Route>
    </Routes>
  );
}

export default App;
