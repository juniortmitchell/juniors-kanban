import { ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BoardsAPI } from '../services'
import { useBoard } from '../contexts/BoardContext'
import type { Board } from '../types/api'

interface SidebarProps {
  isHidden: boolean
  onToggle: () => void
}

function Sidebar({ isHidden, onToggle }: SidebarProps) {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateInput, setShowCreateInput] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')
  const { selectedBoard, setSelectedBoard } = useBoard()

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true)
        const response = await BoardsAPI.getBoards()

        if (response.error) {
          setError(response.error)
        } else if (response.data) {
          setBoards(response.data)
        }
      } catch (err) {
        setError('Failed to fetch boards')
        console.error('Error fetching boards:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBoards()
  }, [])

  const handleCreateBoard = async (boardTitle: string) => {
    try {
      const response = await BoardsAPI.createBoard({ title: boardTitle })

      if (response.error) {
        setError(response.error)
      } else if (response.data) {
        // Refresh boards list
        const boardsResponse = await BoardsAPI.getBoards()
        if (boardsResponse.data) {
          setBoards(boardsResponse.data)
        }
        // Reset input state
        setShowCreateInput(false)
        setNewBoardName('')
      }
    } catch (err) {
      setError('Failed to create board')
      console.error('Error creating board:', err)
    }
  }

  const handleSubmitNewBoard = (e: React.FormEvent) => {
    e.preventDefault()
    if (newBoardName.trim()) {
      handleCreateBoard(newBoardName.trim())
    }
  }

  const handleCancelCreate = () => {
    setShowCreateInput(false)
    setNewBoardName('')
  }

  const handleDeleteBoard = async (boardId: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent board selection when clicking delete

    if (!confirm('Are you sure you want to delete this board?')) {
      return
    }

    try {
      const response = await BoardsAPI.deleteBoard(boardId)

      if (response.error) {
        setError(response.error)
      } else {
        // If deleted board was selected, clear selection
        if (selectedBoard?.id === boardId) {
          setSelectedBoard(null)
        }

        // Refresh boards list
        const boardsResponse = await BoardsAPI.getBoards()
        if (boardsResponse.data) {
          setBoards(boardsResponse.data)
        }
      }
    } catch (err) {
      setError('Failed to delete board')
      console.error('Error deleting board:', err)
    }
  }
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white border-r border-gray-700 z-50 transition-transform duration-300 ease-in-out ${
          isHidden ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-amber-400 border-b-2 border-amber-400 pb-3">
              Junior's Kanban App
            </h1>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Hide sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {loading && (
              <div className="text-gray-400 text-sm">Loading boards...</div>
            )}

            {error && <div className="text-red-400 text-sm">{error}</div>}

            {!loading && !error && boards.length === 0 && (
              <div className="text-gray-400 text-sm">
                No boards yet. Create your first board!
              </div>
            )}

            {boards.map((board) => (
              <div
                key={board.id}
                className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors flex items-center justify-between group ${
                  selectedBoard?.id === board.id
                    ? 'bg-amber-600 text-white font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span
                  onClick={() => setSelectedBoard(board)}
                  className="flex-1"
                >
                  {board.title}
                </span>
                <button
                  onClick={(e) => handleDeleteBoard(board.id, e)}
                  className="opacity-0 group-hover:opacity-100 ml-2 p-1 rounded hover:bg-red-600 transition-all"
                  title="Delete board"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* Create new board section */}
            {showCreateInput ? (
              <form onSubmit={handleSubmitNewBoard} className="mt-3.5">
                <input
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Enter board name..."
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-amber-400 focus:outline-none text-sm"
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-400 text-gray-900 rounded text-xs font-medium hover:bg-amber-500 transition-colors"
                    disabled={!newBoardName.trim()}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelCreate}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowCreateInput(true)}
                className="text-amber-400 hover:text-neutral-100 hover:cursor-pointer mt-3.5 w-full text-center"
              >
                New Board +
              </button>
            )}
          </nav>
        </div>
      </aside>

      {/* Show button when sidebar is hidden */}
      {isHidden && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 border border-gray-700"
          title="Show sidebar"
        >
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      )}
    </>
  )
}

export default Sidebar
