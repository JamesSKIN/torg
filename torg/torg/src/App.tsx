import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Pages
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskMap from './pages/TaskMap'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-header">
            <h1>Torg</h1>
          </div>
          <ul className="nav-links">
            <li className={activePage === 'dashboard' ? 'active' : ''}>
              <Link to="/" onClick={() => setActivePage('dashboard')}>
                Dashboard
              </Link>
            </li>
            <li className={activePage === 'tasks' ? 'active' : ''}>
              <Link to="/tasks" onClick={() => setActivePage('tasks')}>
                Tasks
              </Link>
            </li>
            <li className={activePage === 'taskmap' ? 'active' : ''}>
              <Link to="/taskmap" onClick={() => setActivePage('taskmap')}>
                Task Map
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/taskmap" element={<TaskMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
