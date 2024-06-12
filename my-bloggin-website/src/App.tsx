import { Routes } from './router';
import { BrowserRouter, useRoutes } from 'react-router-dom';

const Router = () => {
  const myroutes = useRoutes(Routes());
  return myroutes;
};
function App() {
  return (
    <div >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
