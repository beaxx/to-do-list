import './App.css';
import './media-query.css';
import React, { useState, useEffect } from 'react';
import {FaPlus, FaExclamation, FaRegTrashCan, FaCheck, FaFilter, FaListCheck} from 'react-icons/fa6';
import { saveTasks, loadTasks } from './services/localStorage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filter, setFilter] = useState(false);
  let message;

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };
  
  if(tasks.length === 0) {
    message = <span className='message'>You don't have any tasks at the moment. Enjoy your day!</span>
  }

  useEffect(() => {
    const stored = loadTasks();
    setTasks(stored);
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      saveTasks(tasks);
    }
  }, [tasks, isInitialLoad]);

  return (
    <div className='App'>
      <div className='title'>
        <FaListCheck className='icon'/>
        <h1> TO DO LIST </h1>
      </div>
      <div className='task-content'>
        <div className='task-list'>
          <div className='task-header'>
            <div className='task-add'>
              <input 
                placeholder='Type a task here...' 
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
              ></input>
              <button 
                className='add-task-button'
                title="Add task"
                onClick={() => {
                  if (taskValue.trim() === '') return;
                  const newTask ={
                    id: Date.now(),
                    title: taskValue,
                    important: false,
                    completed: false,
                  }
                  setTasks([...tasks, newTask]);
                  setTaskValue('');
                }} 
              >
                <FaPlus/>
              </button>
            </div>
            <div className='task-filter'>
              <button 
                title="Filter tasks"
                onClick={() => {
                  setFilter(!filter);
                }}
              >
                <FaFilter/>
              </button>
            </div>
          </div>
          <div className='all-tasks'>
            <div className='active-tasks'>
                <span className='tasks-title'>Active</span>
                {message}
                {tasks
                  .filter((t) => !filter || t.important)
                  .filter((t) => !t.completed)
                  .map((task) =>(
                    <div className='task-item' key={task.id}>
                    <h3 className='task-title' title={task.title}>{task.title}</h3>
                    <div className='task-options'>
                      <div className='option important'>
                        <FaExclamation/>
                        <label className="checkbox" title='Highlight'>
                          <input type="checkbox" name="important" className='important' 
                          checked={task.important} 
                            onChange={() => {
                              const updatedTasks = tasks.map((t) => 
                                t.id === task.id ? {...t, important: !t.important} : t
                                );
                              setTasks(updatedTasks);
                            }}
                          />
                          <span></span>
                        </label>
                      </div>
                      <div className='option completed'>
                        <FaCheck/>
                        <label className="checkbox" title='Finish'>
                          <input type="checkbox" name="completed" className='completed'
                            checked={task.completed} 
                            onChange={() => {
                              const updatedTasks = tasks.map((t) => 
                                t.id === task.id ? {...t, completed: !t.completed} : t
                                );
                              setTasks(updatedTasks);
                            }}
                          />
                          <span></span>
                        </label>
                      </div>
                      <div className='option trash'>
                        <FaRegTrashCan/>
                        <label className="checkbox" title='Delete'>
                          <input type="checkbox" name="trash" className='trash' 
                            onChange={() => {
                              deleteTask(task.id);
                            }}
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className='completed-tasks'>
              <span className='tasks-title'>Completed</span>
              {tasks
                  .filter((t) => !filter || t.important)
                  .filter((t) => t.completed)
                  .map((task) =>(
                    <div className='task-item' key={task.id}>
                    <h3 className='task-title completed' title={task.title}>{task.title}</h3>
                    <div className='task-options'>
                      <div className='option important'>
                        <FaExclamation/>
                        <label className="checkbox" title='Highlight'>
                          <input type="checkbox" name="important" className='important'
                          checked={task.important} 
                            onChange={() => {
                              const updatedTasks = tasks.map((t) => 
                                t.id === task.id ? {...t, important: !t.important} : t
                                );
                              setTasks(updatedTasks);
                            }}
                          />
                          <span></span>
                        </label>
                      </div>
                      <div className='option completed'>
                        <FaCheck/>
                        <label className="checkbox" title='Finish'>
                          <input type="checkbox" name="completed" className='completed'
                            checked={task.completed} 
                            onChange={() => {
                              const updatedTasks = tasks.map((t) => 
                                t.id === task.id ? {...t, completed: !t.completed} : t
                                );
                              setTasks(updatedTasks);
                            }}
                          />
                          <span></span>
                        </label>
                      </div>
                      <div className='option trash'>
                        <FaRegTrashCan/>
                        <label className="checkbox" title='Delete'>
                          <input type="checkbox" name="trash" className='trash' 
                            onChange={() => {
                              deleteTask(task.id);
                            }}
                            />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className='task-footer'>
        <span>
          Developed by <a href="https://github.com/beaxx" target="_blank" rel="noopener noreferrer">
            Beatriz
          </a>
          </span>
          <a href="/attributions.html" target="_blank" rel="noopener noreferrer">
            attributions
          </a>
      </div>
    </div>
  );
}

export default App;
