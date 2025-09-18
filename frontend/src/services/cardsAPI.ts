import apiClient from './apiClient'
import type {
  CardResponse,
  CreateCardRequest,
  UpdateCardRequest,
  MoveCardRequest,
  ApiResponse,
} from '../types/api'

export class CardsAPI {
  /**
   * Get all cards for a specific list
   */
  static async getCardsByListId(
    listId: number,
  ): Promise<ApiResponse<CardResponse[]>> {
    try {
      const response = await apiClient.get<CardResponse[]>(
        `/cards/list/${listId}`,
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
          `Failed to fetch cards for list ${listId}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Get a card by ID
   */
  static async getCardById(id: number): Promise<ApiResponse<CardResponse>> {
    try {
      const response = await apiClient.get<CardResponse>(`/cards/${id}`)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          `Failed to fetch card ${id}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Create a new card
   */
  static async createCard(
    cardData: CreateCardRequest,
  ): Promise<ApiResponse<CardResponse>> {
    try {
      const response = await apiClient.post<CardResponse>('/cards', cardData)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to create card',
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Update a card
   */
  static async updateCard(
    id: number,
    cardData: UpdateCardRequest,
  ): Promise<ApiResponse<CardResponse>> {
    try {
      const response = await apiClient.put<CardResponse>(
        `/cards/${id}`,
        cardData,
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
          `Failed to update card ${id}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Delete a card
   */
  static async deleteCard(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete(`/cards/${id}`)
      return {
        status: response.status,
      }
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          error.message ||
          `Failed to delete card ${id}`,
        status: error.response?.status || 500,
      }
    }
  }

  /**
   * Move a card to a different list and/or position
   */
  static async moveCard(
    id: number,
    moveData: MoveCardRequest,
  ): Promise<ApiResponse<CardResponse>> {
    try {
      const response = await apiClient.put<CardResponse>(
        `/cards/${id}/move`,
        moveData,
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
          `Failed to move card ${id}`,
        status: error.response?.status || 500,
      }
    }
  }
}
