// Board related types
export interface Board {
  id: number
  title: string
  createdAt: string
}

export interface CreateBoardRequest {
  title: string
}

export interface UpdateBoardRequest {
  title: string
}

export interface BoardResponse {
  id: number
  title: string
  createdAt: string
}

// List related types
export interface KanbanList {
  id: number
  title: string
  type: string
  boardId: number
  createdAt: string
}

export interface KanbanListResponse {
  id: number
  title: string
  type: string
  boardId: number
  createdAt: string
}

export interface UpdateKanbanListRequest {
  title: string
}

// Card related types
export interface Card {
  id: number
  title: string
  description: string
  position: number
  listId: number
  createdAt: string
}

export interface CardResponse {
  id: number
  title: string
  description: string
  position: number
  listId: number
  createdAt: string
}

export interface CreateCardRequest {
  title: string
  description: string
  listId: number
}

export interface UpdateCardRequest {
  title: string
  description: string
}

export interface MoveCardRequest {
  targetListId: number
  position: number
}

// API Response wrapper for error handling
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}
