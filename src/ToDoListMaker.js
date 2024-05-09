import { useState } from 'react';
import './ToDoListMaker.css';
import ToDoListPic from './toDoListIconPNG.png';

function App() {
  // --------------------------------[State Variables]--------------------------------

  // This state variable stores the current task input
  const [toDoTask, setToDoTask] = useState('');

  // This state variable stores the list of tasks in the to-do list
  const [toDoList, setToDoList] = useState([]);

  // This state variable stores the name of the current to-do list
  const [listName, setListName] = useState('');

  // This state variable is to control the opening/closing of the pop-up modal
  // (The popup window that asks the user to give their to-do list a name)
  const [isModalOpen, setisModalOpen] = useState(false);

  // This state variable stores the saved to-do lists
  const [savedLists, setSavedLists] = useState([]);

  // This state variable stores the edited tasks in the to-do list
  const [editedTasks, setEditedTasks] = useState([]);

  // This state variable controls whether the list is open/displayed
  const [isListOpen, setIsListOpen] = useState(true);

  // --------------------------------[Event Handlers]--------------------------------

  // Handles updating to-do list task input
  const handleInputChange = (event) => {
    setToDoTask(event.target.value);
  };

  // Handles updating edited to-do list tasks
  const handleEditInputChange = (event, index) => {
    const updatedTasks = [...editedTasks];
    updatedTasks[index] = event.target.value;
    setEditedTasks(updatedTasks);
  };

  // Handles submitting a new to-do list task
  const handleSubmit = (event) => {
    event.preventDefault();
    setEditedTasks([...editedTasks, toDoTask]); // New task will be added to editedTasks
    setToDoList([...toDoList, toDoTask]); // New task added to toDoList
    setToDoTask(''); // Clears the task input
  };

  // Handles opening modal to save list
  const handleSaveList = () => {
    setisModalOpen(true);
  };

  // Handles closing the modal
  const handleModalClose = () => {
    setisModalOpen(false);
  };

  // handles confirming and saving a to-do list
  const handleSaveListConfirm = () => {
    setisModalOpen(false);
    const newList = { name: listName, tasks: editedTasks };
    setSavedLists([...savedLists, newList]);
    setToDoList([]); // Clears the current to-do list
    setToDoTask(''); // clears the task input
    setListName(''); // Clears the list name input
    setEditedTasks([]); // Clears the edited tasks
  };

  // Handles deleting a saved to-do list
  const handleDeleteList = (index) => {
    const updatedLists = [...savedLists];
    updatedLists.splice(index, 1);
    setSavedLists(updatedLists);
  };

  // Handles editing a task
  const handleEditTask = (index) => {
    const updatedList = [...toDoList];
    updatedList[index] = editedTasks[index];
    setToDoList(updatedList);
  };

  // Handles closing the current to-do list
  const handleCloseList = () => {
    setIsListOpen(false);
  };

  // Handles opening the current to-do list
  const handleOpenList = () => {
    setIsListOpen(true);
  };

  // --------------------------------[To-Do List Maker Application Content]--------------------------------
  // This component is the main application interface for the to-do list maker, it includes UI elements
  // for entering/submitting/editing tasks for a to-do list, saving to-do lists, and deleting to-do lists.
  // State variables and event handlers are used in order to manage the behavior of this to-do list maker.
  return (
    <>
      <div className="ToDoListContainer">
        <div className="ToDoListContent">
          <img src={ToDoListPic} alt="ToDoListPic" style={{ width: '200px', height: '200px' }} className="ToDoListPic"></img>
          <div className="ToDoListHome">
            <h1>To-Do List Maker</h1>
            <form onSubmit={handleSubmit}>
              <p><strong>Please Enter A Task:</strong></p>
              {/* Textarea used for entering a task to add to the to-do list */}
              <textarea
                onChange={handleInputChange}
                maxLength={500}
                rows={10}
                cols={80}
                value={toDoTask}
              />
              <div className="buttonContainer">
                {/* Button to add a new task*/}
                <button type="submit"><strong>Add Task</strong></button>
                {/* Button to save the to-do list (opens up a modal)*/}
                <button onClick={handleSaveList}><strong>Save List</strong></button>
              </div>
            </form>
            {/* Displays the current to-do list tasks */}
            {isListOpen && (
              <ol>
                {toDoList.map((toDoTask, index) => (
                  <li key={index}>
                    {/* Input field for the tasks, allowing users to edit tasks as they add them */}
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
            {/* Button to open and display current to-do list */}
            {!isListOpen && toDoList.length > 0 && (
              <button onClick={handleOpenList} className="OpenListButton"><strong>Open List</strong></button>
            )}
            {/* Button to close and stop displaying current to-do list */}
            <button onClick={handleCloseList} className="CloseListButton"><strong>Close List</strong></button>
          </div>

          {/* Modal for entering name for saving to-do list */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>
                  &times;
                </span>
                <p><strong>Please Enter The Name For Your To-Do List:</strong></p>
                {/* Text input field for entering a name for saved to-do list */}
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                {/* Button for confirming and saving to-do list */}
                <button onClick={handleSaveListConfirm}>Save</button>
              </div>
            </div>
          )}

          {/* Displays all of the saved to-do lists as buttons */}
          <div className="SavedListsContainer">
            <div className="SavedLists">
              <h2>Saved To-Do Lists:</h2>
            </div>
            <div className="SavedLists">
              {savedLists.map((list, index) => (
                <button key={index} onClick={() => setToDoList(list.tasks)}>
                  {list.name}
                </button>
              ))}
            </div>

            {/* Displays the names of all of the saved to-do lists as buttons, 
                user is able to click them to delete those to-do lists */}
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