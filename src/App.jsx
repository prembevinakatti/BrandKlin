import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskDashboard from './pages/TaskDashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/tasks" element={<TaskDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
