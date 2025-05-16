const List = ({ toDoList, toggleDone, deleteTask, editTask, editingId, setEditingId, editedText, setEditedText }) => {
    return (
        <ul className="space-y-3">
            {toDoList.map((listItem) => (
                <li
                    key={listItem.id}
                    className={`p-3 border border-violet-200 rounded-lg flex items-center justify-between ${listItem.done ? "bg-violet-50" : "bg-white"
                        }`}
                >
                    {editingId === listItem.id ? (
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Edit Task"
                                value={editedText}
                                onChange={(e) => {
                                    setEditedText(e.target.value)
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                            <button
                                onClick={() => editTask(listItem.id, editedText)}
                                className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <span className={`flex-1 ${listItem.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                                {listItem.text}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleDone(listItem.id)}
                                        checked={listItem.done}
                                        className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500 cursor-pointer"
                                    />
                                </div>

                                {!listItem.done && (
                                    <button
                                        onClick={() => {
                                            setEditingId(listItem.id)
                                            setEditedText(listItem.text)
                                        }}
                                        className="text-violet-600 hover:text-violet-800 font-medium px-2 py-1 rounded transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => deleteTask(listItem.id)}
                                    className="text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default List
