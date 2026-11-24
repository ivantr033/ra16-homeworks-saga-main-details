import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ServicesListPage } from './pages/ServicesListPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<ServicesListPage />} />
            <Route path="/:id/details" element={<ServiceDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
