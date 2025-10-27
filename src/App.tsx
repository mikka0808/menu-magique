import { Navigate, Route, Routes } from 'react-router-dom';
import { Planner } from './routes/Planner';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Planner />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
