import { ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { CardResponse } from '../types/api'

interface CardProps {
  card: CardResponse
  canMoveLeft: boolean
  canMoveRight: boolean
  onMoveLeft: (cardId: number) => void
  onMoveRight: (cardId: number) => void
  onEdit: (cardId: number) => void
  onDelete: (cardId: number) => void
}

function Card({
  card,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
  onEdit,
  onDelete,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm flex-1 mr-2">
          {card.title}
        </h4>

        {/* Action buttons - show on hover */}
        <div
          className={`flex gap-1 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        >
          <button
            onClick={() => onEdit(card.id)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Edit card"
          >
            <Edit2 size={12} />
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
            title="Delete card"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Card Description */}
      {card.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {card.description}
        </p>
      )}

      {/* Movement Arrows */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => onMoveLeft(card.id)}
          disabled={!canMoveLeft}
          className={`p-1 rounded transition-colors ${
            canMoveLeft
              ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Move to previous list"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-xs text-gray-400">
          {(() => {
            console.log('Card createdAt:', card.createdAt, typeof card.createdAt)
            if (!card.createdAt) return 'No date'
            
            const date = new Date(card.createdAt)
            console.log('Parsed date:', date, 'isValid:', !isNaN(date.getTime()))
            
            if (isNaN(date.getTime())) {
              return 'Invalid date'
            }
            
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          })()}
        </span>

        <button
          onClick={() => onMoveRight(card.id)}
          disabled={!canMoveRight}
          className={`p-1 rounded transition-colors ${
            canMoveRight
              ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Move to next list"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Card
