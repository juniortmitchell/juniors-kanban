import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Board } from '../types/api'

interface BoardContextType {
  selectedBoard: Board | null
  setSelectedBoard: (board: Board | null) => void
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

interface BoardProviderProps {
  children: ReactNode
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)

  return (
    <BoardContext.Provider value={{ selectedBoard, setSelectedBoard }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext)
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider')
  }
  return context
}
