import apiClient from './apiClient'
import type {
  Board,
  BoardResponse,
  CreateBoardRequest,
  UpdateBoardRequest,
  ApiResponse,
} from '../types/api'

export class BoardsAPI {
  /**
   * Get all boards
   */
  static async getBoards(): Promise<ApiResponse<Board[]>> {
    try {
      const response = await apiClient.get<Board[]>('/boards')
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch boards',
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Get a board by ID
   */
  static async getBoardById(id: number): Promise<ApiResponse<Board>> {
    try {
      const response = await apiClient.get<Board>(`/boards/${id}`)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          `Failed to fetch board ${id}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Create a new board
   */
  static async createBoard(
    boardData: CreateBoardRequest,
  ): Promise<ApiResponse<BoardResponse>> {
    try {
      const response = await apiClient.post<BoardResponse>('/boards', boardData)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to create board',
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Update a board
   */
  static async updateBoard(
    id: number,
    boardData: UpdateBoardRequest,
  ): Promise<ApiResponse<BoardResponse>> {
    try {
      const response = await apiClient.put<BoardResponse>(
        `/boards/${id}`,
        boardData,
      )
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          `Failed to update board ${id}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Delete a board
   */
  static async deleteBoard(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete(`/boards/${id}`)
      return {
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          `Failed to delete board ${id}`,
        status: error.response?.status || 500,
      }
    }
  }
}
