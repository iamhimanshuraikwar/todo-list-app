import React, { useState } from 'react';
import { Calendar, Flag, Trash2, Archive } from 'lucide-react';

const priorities = {
  low: { color: 'bg-blue-200 text-blue-800', label: 'Low' },
  medium: { color: 'bg-yellow-200 text-yellow-800', label: 'Medium' },
  high: { color: 'bg-red-200 text-red-800', label: 'High' }
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [activeTab, setActiveTab] = useState('active');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        dueDate: newDueDate,
        priority: newPriority,
        archived: false
      }]);
      setNewTodo('');
      setNewDueDate('');
      setNewPriority('medium');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const archiveTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, archived: !todo.archived } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => 
    activeTab === 'active' ? !todo.archived : todo.archived
  );

  return (
    <div className="min-h-screen pb-16 relative">
      <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Simple Todo List</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 ${activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-4 py-2 ${activeTab === 'archived' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md`}
          >
            Archived
          </button>
        </div>
        {activeTab === 'active' && (
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(priorities).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Todo
            </button>
          </div>
        )}
        <ul className="space-y-2">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={`flex items-center justify-between p-3 rounded-lg ${todo.completed ? 'bg-gray-100' : 'bg-white'} border`}>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={todo.completed ? 'todo-text completed' : 'todo-text active'}>
                  {todo.text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {todo.dueDate && (
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${priorities[todo.priority].color}`}>
                  <Flag className="h-3 w-3 inline mr-1" />
                  {priorities[todo.priority].label}
                </span>
                <button
                  onClick={() => archiveTodo(todo.id)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <Archive className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white py-2 text-center text-sm text-gray-500 border-t">
        Created by <a href="https://himanshuraikwar.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Himanshu Raikwar</a>
      </div>
    </div>
  );
};

export default TodoList;
