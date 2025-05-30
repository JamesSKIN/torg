import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types/Task';
import { Category } from '../types/Category';

const Tasks: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [completionFilter, setCompletionFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [dueDateFilter, setDueDateFilter] = useState<'all' | 'overdue' | 'upcoming'>('all');

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
    setShowModal(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate || '',
    });
    setShowModal(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setNewTask({ title: '', description: '', dueDate: '' });
    setShowModal(false);
  };

  const getCategoryColor = (category: Category): string => {
    const colors: { [key in Category]: string } = {
      work: '#3b82f6',
      personal: '#10b981',
      shopping: '#f59e0b',
      health: '#ef4444',
      education: '#8b5cf6',
      other: '#64748b'
    };
    return colors[category];
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    // Category filter
    if (selectedCategory !== 'all' && task.category !== selectedCategory) {
      return false;
    }

    // Completion filter
    if (completionFilter === 'completed' && !task.completed) {
      return false;
    }
    if (completionFilter === 'pending' && task.completed) {
      return false;
    }

    // Due date filter
    if (dueDateFilter !== 'all' && task.dueDate) {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      
      if (dueDateFilter === 'overdue' && dueDate >= today) {
        return false;
      }
      if (dueDateFilter === 'upcoming' && dueDate < today) {
        return false;
      }
    }

    return true;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
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
            setShowModal(true);
          }}
        >
          Add New Task
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCancel}>&times;</button>
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
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="task-filters">
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="category-filters">
            <button
              className={`category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === 'work' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('work')}
              style={{ backgroundColor: getCategoryColor('work') }}
            >
              Work
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === 'personal' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('personal')}
              style={{ backgroundColor: getCategoryColor('personal') }}
            >
              Personal
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === 'shopping' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('shopping')}
              style={{ backgroundColor: getCategoryColor('shopping') }}
            >
              Shopping
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === 'health' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('health')}
              style={{ backgroundColor: getCategoryColor('health') }}
            >
              Health
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === 'education' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('education')}
              style={{ backgroundColor: getCategoryColor('education') }}
            >
              Education
            </button>
            <button
              className={`category-filter-btn ${selectedCategory === 'other' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('other')}
              style={{ backgroundColor: getCategoryColor('other') }}
            >
              Other
            </button>
          </div>
        </div>

        <div className="filter-section">
          <h3>Status</h3>
          <div className="status-filters">
            <button
              className={`status-filter-btn ${completionFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCompletionFilter('all')}
            >
              All
            </button>
            <button
              className={`status-filter-btn ${completionFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setCompletionFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`status-filter-btn ${completionFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setCompletionFilter('pending')}
            >
              Pending
            </button>
          </div>
        </div>

        <div className="filter-section">
          <h3>Due Date</h3>
          <div className="date-filters">
            <button
              className={`date-filter-btn ${dueDateFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDueDateFilter('all')}
            >
              All
            </button>
            <button
              className={`date-filter-btn ${dueDateFilter === 'overdue' ? 'active' : ''}`}
              onClick={() => setDueDateFilter('overdue')}
            >
              Overdue
            </button>
            <button
              className={`date-filter-btn ${dueDateFilter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setDueDateFilter('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      <div className="task-list-container">
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p>No tasks match the selected filters</p>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                onClick={() => handleTaskClick(task)}
              >
                <div 
                  className="task-category-bar"
                  style={{ backgroundColor: getCategoryColor(task.category) }}
                />
                <div className="task-content-wrapper">
                  <div className="task-header">
                    <div className="task-title-wrapper">
                      <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                      />
                      <h3 className="task-title">{task.title}</h3>
                    </div>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(task.category) }}
                    >
                      {task.category}
                    </span>
                  </div>
                  {task.description && (
                    <p className="task-description">
                      {task.description}
                    </p>
                  )}
                  <div className="task-meta">
                    {task.dueDate && (
                      <span className="task-meta-item">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className="task-meta-item">
                      Status: {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(task);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={handleCloseTaskDetail}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseTaskDetail}>&times;</button>
            <div className="task-detail">
              <div className="task-detail-header">
                <h2>{selectedTask.title}</h2>
                <span 
                  className="category-badge"
                  style={{ backgroundColor: getCategoryColor(selectedTask.category) }}
                >
                  {selectedTask.category}
                </span>
              </div>
              {selectedTask.description && (
                <div className="task-detail-description">
                  <h3>Description</h3>
                  <p>{selectedTask.description}</p>
                </div>
              )}
              <div className="task-detail-meta">
                <div className="task-detail-meta-item">
                  <h3>Due Date</h3>
                  <p>{selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : 'No due date'}</p>
                </div>
                <div className="task-detail-meta-item">
                  <h3>Status</h3>
                  <p>{selectedTask.completed ? 'Completed' : 'Pending'}</p>
                </div>
              </div>
              <div className="task-detail-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    handleCloseTaskDetail();
                    handleEdit(selectedTask);
                  }}
                >
                  Edit Task
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    deleteTask(selectedTask.id);
                    handleCloseTaskDetail();
                  }}
                >
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks; 