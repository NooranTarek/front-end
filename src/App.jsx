import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router'; // Import your router configuration
import './App.css'
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
