import { useBoard } from '../contexts/BoardContext'

interface BoardHeaderProps {
  title: string
  sidebarCollapsed?: boolean
}

function BoardHeader({ title, sidebarCollapsed = false }: BoardHeaderProps) {
  const { selectedBoard } = useBoard()

  // Hide the header completely when no board is selected
  if (!selectedBoard) {
    return null
  }

  return (
    <>
      <div
        className={`flex flex-row justify-between p-4 items-center border-b border-gray-200 bg-gray-900 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-64'
        }`}
      >
        <div>
          <h1 className="font-bold text-2xl text-amber-400">{title}</h1>
          {selectedBoard && (
            <p className="text-sm text-amber-100 mt-1">
              Created {new Date(selectedBoard.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <button
          type="button"
          className="text-gray-800 bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:cursor-pointer transition-colors"
          disabled={!selectedBoard}
          hidden={!selectedBoard}
        >
          + Add New Task
        </button>
      </div>
    </>
  )
}

export default BoardHeader
