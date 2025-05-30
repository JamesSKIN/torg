import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types/Task';

const Tasks: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      editTask(editingTask.id, newTask);
      setEditingTask(null);
    } else {
      addTask({
        ...newTask,
        completed: false,
      });
    }
    setNewTask({ title: '', description: '', dueDate: '' });
    setShowForm(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate || '',
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setNewTask({ title: '', description: '', dueDate: '' });
    setShowForm(false);
  };

  return (
    <div className="tasks">
      <div className="tasks-header">
        <h2>Tasks</h2>
        <button 
          className="add-task-btn"
          onClick={() => {
            setEditingTask(null);
            setNewTask({ title: '', description: '', dueDate: '' });
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="task-form">
          <h3>{editingTask ? 'Edit Task' : 'New Task'}</h3>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
            {editingTask && (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <div className="task-details">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    {task.dueDate && (
                      <span className="due-date">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks; 