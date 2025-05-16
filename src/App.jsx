import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import List from "./components/List"

const App = () => {
  const [taskText, setTaskText] = useState("")
  const [toDoList, setToDoList] = useState(() => {
    const localStorageList = localStorage.getItem('toDoList')
    return localStorageList ? JSON.parse(localStorageList) : []
  })
  const [editingId, setEditingId] = useState(null)
  const [editedText, setEditedText] = useState("")

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
  }, [toDoList])

  const handleChange = (e) => {
    setTaskText(e.target.value)
  }

  const handleAddTask = () => {
    if (taskText.trim() === "") return

    const newTask = {
      id: uuidv4(),
      text: taskText,
      done: false,
    }

    setToDoList([newTask, ...toDoList])
    setTaskText("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  const toggleDone = (id) => {
    setToDoList(toDoList.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  const editTask = (id, newText) => {
    const updatedList = toDoList.map((task) => (task.id === id ? { ...task, text: newText } : task))
    setToDoList(updatedList)
    setEditingId(null)
  }

  const deleteTask = (id) => {
    setToDoList(toDoList.filter((task) => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-violet-600 py-4 px-6">
          <h1 className="text-3xl font-bold text-white text-center">Task Manager</h1>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter your task..."
              value={taskText}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 rounded-lg border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handleAddTask}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>

          {toDoList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks yet. Add a task to get started!</p>
            </div>
          ) : (
            <List
              toDoList={toDoList}
              toggleDone={toggleDone}
              editTask={editTask}
              deleteTask={deleteTask}
              editingId={editingId}
              setEditingId={setEditingId}
              editedText={editedText}
              setEditedText={setEditedText}
            />
          )}
        </div>

        <div className="bg-violet-50 py-3 px-6 text-center text-sm text-violet-600">
          <p>
            {toDoList.length} task{toDoList.length !== 1 ? "s" : ""} • {toDoList.filter((task) => task.done).length}{" "}
            completed
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
