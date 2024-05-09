import { useState } from 'react';
import './ToDoListMaker.css';
import ToDoListPic from './toDoListIconPNG.png';

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
    const newList = { name: listName, tasks: editedTasks };
    setSavedLists([...savedLists, newList]);
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
      <div className="ToDoListContainer">
        <div className="ToDoListContent">
          <img src={ToDoListPic} alt="ToDoListPic" style={{ width: '200px', height: '200px' }} className="ToDoListPic"></img>
          <div className="ToDoListHome">
            <h1>To-Do List Maker</h1>
            <form onSubmit={handleSubmit}>
              <p><strong>Please Enter A Task:</strong></p>
              <textarea
                onChange={handleInputChange}
                maxLength={500}
                rows={10}
                cols={80}
                value={toDoTask}
              />
              <div className="buttonContainer">
                <button type="submit"><strong>Add Task</strong></button>
                <button onClick={handleSaveList}><strong>Save List</strong></button>
              </div>
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
              <button onClick={handleOpenList} className="OpenListButton"><strong>Open List</strong></button>
            )}
            <button onClick={handleCloseList} className="CloseListButton"><strong>Close List</strong></button>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>
                  &times;
                </span>
                <p><strong>Please Enter The Name For Your To-Do List:</strong></p>
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <button onClick={handleSaveListConfirm}>OK</button>
              </div>
            </div>
          )}

          <div className="SavedListsContainer">
            <div className="SavedLists">
              <h2>Saved To-Do Lists:</h2>
              {/* Move the button rendering outside the h2 element */}
            </div>
            {/* Wrap the saved lists in a div and apply the "SavedLists" class to it */}
            <div className="SavedLists">
              {savedLists.map((list, index) => (
                <button key={index} onClick={() => setToDoList(list.tasks)}>
                  {list.name}
                </button>
              ))}
            </div>


            <div className="DeleteList">
              <h2>Delete To-Do List:</h2>
              <p><strong>Select A To-Do List To Delete:</strong></p>
              <div className="grid-container">
                {savedLists.map((list, index) => (
                  <button key={index} onClick={() => handleDeleteList(index)}>
                    {list.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;