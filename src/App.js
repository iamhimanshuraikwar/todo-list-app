import React, { useState, useEffect } from 'react';
import { Calendar, Flag, Trash2, Archive, Plus } from 'lucide-react';

const priorities = {
  low: { color: 'bg-blue-100 text-blue-800', label: 'Low' },
  medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  high: { color: 'bg-red-100 text-red-800', label: 'High' }
};

const Footer = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-3 text-center text-sm text-gray-600 border-t flex items-center justify-center">
    <span className="mr-2">Made with</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
    <span>by</span>
    <a href="https://himanshuraikwar.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
      Himanshu Raikwar
    </a>
  </div>
);

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [activeTab, setActiveTab] = useState('active');
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        dueDate: newDueDate,
        priority: newPriority,
        archived: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setNewDueDate('');
      setNewPriority('medium');
      setIsAddingTodo(false);
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
    <div className="min-h-screen pb-16 relative bg-gray-50">
      <div className="container mx-auto max-w-2xl p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Elegant Todo List</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 ${activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`flex-1 py-3 ${activeTab === 'archived' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
            >
              Archived
            </button>
          </div>
          {activeTab === 'active' && !isAddingTodo && (
            <button
              onClick={() => setIsAddingTodo(true)}
              className="w-full py-3 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Todo
            </button>
          )}
          {activeTab === 'active' && isAddingTodo && (
            <div className="p-4 border-b">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <div className="flex space-x-2 mb-2">
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(priorities).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingTodo(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={addTodo}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Todo
                </button>
              </div>
            </div>
          )}
          <ul className="divide-y divide-gray-200">
            {filteredTodos.map(todo => (
              <li key={todo.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
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
                      className="text-gray-500 hover:text-blue-600 focus:outline-none"
                    >
                      <Archive className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-500 hover:text-red-600 focus:outline-none"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TodoList;
