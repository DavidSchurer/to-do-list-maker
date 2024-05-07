import { useState } from 'react';
import './App.css';

function App() {
  const [toDoTask, setToDoTask] = useState('');
  // Store the list of tasks using useState
  // Initialize toDoList and editedTasks with empty arrays when the list is open
  const [toDoList, setToDoList] = useState([]);
  const [listName, setListName] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const [savedLists, setSavedLists] = useState([]);
  const [editedTasks, setEditedTasks] = useState([]);
  const [isListOpen, setIsListOpen] = useState(true);

  // handleInputChange is used to handle the input change
  const handleInputChange = (event) => {
    setToDoTask(event.target.value);
  };

  const handleEditInputChange = (event, index) => {
    const updatedTasks = [...editedTasks];
    updatedTasks[index] = event.target.value;
    setEditedTasks(updatedTasks);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setEditedTasks([...editedTasks, toDoTask]);
    setToDoList([...toDoList, toDoTask]);
    setToDoTask('');
  };

  const handleSaveList = () => {
    setisModalOpen(true);
  };

  const handleModalClose = () => {
    setisModalOpen(false);
  };

  const handleSaveListConfirm = () => {
    setisModalOpen(false);
    setSavedLists([...savedLists, {name: listName, tasks: editedTasks}]);
    setToDoList([]);
    setToDoTask('');
    setListName('');
    setEditedTasks([]);
  };

  const handleDeleteList = (index) => {
    const updatedLists = [...savedLists];
    updatedLists.splice(index, 1);
    setSavedLists(updatedLists);
  };

  const handleEditTask = (index) => {
    const updatedList = [...toDoList];
    updatedList[index] = editedTasks[index];
    setToDoList(updatedList);
  };

  const handleCloseList = () => {
    setIsListOpen(false);
  };

  const handleOpenList = () => {
    setIsListOpen(true);
  };

  return (
    <>
    <div className="ToDoListHome">
          <h1>To-Do List Maker</h1>
          <button onClick={handleSaveList}>Save List</button>
          <form onSubmit={handleSubmit}>
            <p>Please Enter A Task:</p>
            <textarea
              onChange={handleInputChange}
              maxLength={500}
              rows={10}
              cols={80}
              value={toDoTask}
            />
            <button type="submit">Add Task</button>
          </form>
          {isListOpen && (
          <ol>
            {toDoList.map((toDoTask, index) => (
              <li key={index}>
                  <input
                   type="text"
                   value={editedTasks[index] || toDoTask}
                   onChange={(event) => handleEditInputChange(event, index)}
                   onBlur={() => handleEditTask(index)}
                   />
              </li>
            ))}
          </ol>
        )}
        {!isListOpen && toDoList.length > 0 && (
          <button onClick={handleOpenList}>Open List</button>
        )}
          <button onClick={handleCloseList}>Close List</button>
    </div>

    {isModalOpen && (
      <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
                &times;
            </span>
            <p>Please Enter The Name For Your ToDo List:</p>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <button onClick={handleSaveListConfirm}>OK</button>
          </div>
      </div>
    )}

    <div className="SavedLists">
      <h2>Saved To-Do Lists:</h2>
      {savedLists.map((list, index) => (
        <button key={index} onClick={() => setToDoList(list.tasks)}>
          {list.name}
        </button>
      ))}
    </div>

    <div className="DeleteList">
      <h2>Delete A To-Do-List</h2>
      <p>Select A To-Do List To Delete:</p>
        <div className="grid-container">
          {savedLists.map((list, index) => (
            <button key={index} onClick={() => handleDeleteList(index)}>
              {list.name}
            </button>
          ))}
        </div>
    </div>
    </>
  );
}

export default App;