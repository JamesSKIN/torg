import React from 'react';
import { useTasks } from '../context/TaskContext';

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  // Get upcoming tasks (not completed and have a due date)
  const upcomingTasks = tasks
    .filter(task => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5); // Show only the next 5 upcoming tasks

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <p>{completionRate}%</p>
        </div>
      </div>
      <div className="upcoming-tasks">
        <h3>Upcoming Deadlines</h3>
        {upcomingTasks.length > 0 ? (
          <ul>
            {upcomingTasks.map(task => (
              <li key={task.id}>
                <span className="task-title">{task.title}</span>
                <span className="due-date">
                  Due: {new Date(task.dueDate!).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming deadlines</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 