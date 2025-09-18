import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface AddCardProps {
  listId: number
  onAddCard: (listId: number, title: string, description: string) => void
}

function AddCard({ listId, onAddCard }: AddCardProps) {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onAddCard(listId, title.trim(), description.trim())
      setTitle('')
      setDescription('')
      setIsFormVisible(false)
    } catch (error) {
      console.error('Failed to add card:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setIsFormVisible(false)
  }

  if (!isFormVisible) {
    return (
      <button
        onClick={() => setIsFormVisible(true)}
        className="w-full flex items-center justify-center gap-2 p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
      >
        <Plus size={16} />
        <span className="text-sm">Add a card</span>
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
    >
      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter card title..."
          className="w-full text-sm font-medium text-gray-900 border-none outline-none resize-none placeholder-gray-400"
          autoFocus
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description (optional)..."
          className="w-full text-xs text-gray-600 border-none outline-none resize-none placeholder-gray-400 min-h-[60px]"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add Card'}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </form>
  )
}

export default AddCard
