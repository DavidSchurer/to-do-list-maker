import {useState} from 'react';
import './App.css';

function App() {
  // Store the the task that the user has input using useState
  const [toDoTask, setToDoTask] = useState('');

  // Store the list of tasks using useState
  const [toDoList, setToDoList] = useState([]);

  const [listName, setListName] = useState('');

  const [isModalOpen, setisModalOpen] = useState(false);

  const [savedLists, setSavedLists] = useState([]);

  // handleInputChange is used to handle the input change
  const handleInputChange = (event) => {
    // This updates the state of the task with a new input
    setToDoTask(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
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
    setSavedLists([...savedLists, {name: listName, tasks: toDoList}]);
    setToDoList([]);
    setToDoTask('');
    setListName('');
  };

  const handleDeleteList = (index) => {
    const updatedLists = [...savedLists];
    updatedLists.splice(index, 1);
    setSavedLists(updatedLists);
  };

  return (
    <>
    <div className="ToDoListHome">
          <h1>To-Do List Maker</h1>
          <button onClick={handleSaveList}>Save List</button>
          <form onSubmit={handleSubmit}>
            <p>Please Enter A Task:</p>
            <textarea
              value={toDoTask}
              onChange={handleInputChange}
              maxLength={500}
              rows={10}
              cols={80}
            />
            <button type="submit">Add Task</button>
          </form>
          <ol>
            {toDoList.map((toDoTask, index) => (
              <li key={index}>{toDoTask}</li>
            ))}
          </ol>
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