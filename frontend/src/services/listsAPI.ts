import apiClient from './apiClient'
import type {
  KanbanListResponse,
  UpdateKanbanListRequest,
  ApiResponse,
} from '../types/api'

export class ListsAPI {
  /**
   * Get all lists for a specific board
   */
  static async getListsByBoardId(
    boardId: number,
  ): Promise<ApiResponse<KanbanListResponse[]>> {
    try {
      const response = await apiClient.get<KanbanListResponse[]>(
        `/lists/board/${boardId}`,
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
          `Failed to fetch lists for board ${boardId}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Get a list by ID
   */
  static async getListById(
    id: number,
  ): Promise<ApiResponse<KanbanListResponse>> {
    try {
      const response = await apiClient.get<KanbanListResponse>(`/lists/${id}`)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          `Failed to fetch list ${id}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Update a list title
   */
  static async updateList(
    id: number,
    listData: UpdateKanbanListRequest,
  ): Promise<ApiResponse<KanbanListResponse>> {
    try {
      const response = await apiClient.put<KanbanListResponse>(
        `/lists/${id}`,
        listData,
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
          `Failed to update list ${id}`,
        status: error.response?.status || 500,
      }
    }
  }
}
