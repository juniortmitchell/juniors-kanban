import { useState, useEffect } from 'react'
import { useBoard } from '../contexts/BoardContext'
import { ListsAPI, CardsAPI } from '../services'
import type { KanbanListResponse, CardResponse } from '../types/api'
import Card from './Card'
import AddCard from './AddCard'

interface MainBoardProps {
  sidebarCollapsed: boolean
}

function MainBoard({ sidebarCollapsed }: MainBoardProps) {
  const { selectedBoard } = useBoard()
  const [lists, setLists] = useState<KanbanListResponse[]>([])
  const [cards, setCards] = useState<{ [listId: number]: CardResponse[] }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedBoard) {
      setLists([])
      setCards({})
      return
    }

    const fetchListsAndCards = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch lists
        const listsResponse = await ListsAPI.getListsByBoardId(selectedBoard.id)

        if (listsResponse.error) {
          setError(listsResponse.error)
          return
        }

        if (listsResponse.data) {
          setLists(listsResponse.data)

          // Fetch cards for each list
          const cardsData: { [listId: number]: CardResponse[] } = {}

          for (const list of listsResponse.data) {
            const cardsResponse = await CardsAPI.getCardsByListId(list.id)
            if (cardsResponse.data) {
              cardsData[list.id] = cardsResponse.data.sort(
                (a, b) => a.position - b.position,
              )
            } else {
              cardsData[list.id] = []
            }
          }

          setCards(cardsData)
        }
      } catch (err) {
        setError('Failed to fetch lists and cards')
        console.error('Error fetching lists and cards:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchListsAndCards()
  }, [selectedBoard])

  // Add a new card to a list
  const handleAddCard = async (
    listId: number,
    title: string,
    description: string,
  ) => {
    try {
      const response = await CardsAPI.createCard({
        title,
        description,
        listId,
      })

      if (response.error) {
        setError(response.error)
        return
      }

      if (response.data) {
        setCards((prev) => ({
          ...prev,
          [listId]: [...(prev[listId] || []), response.data!].sort(
            (a, b) => a.position - b.position,
          ),
        }))
      }
    } catch (err) {
      console.error('Error creating card:', err)
      setError('Failed to create card')
    }
  }

  // Move card to adjacent list
  const handleMoveCard = async (
    cardId: number,
    direction: 'left' | 'right',
  ) => {
    const currentCard = Object.values(cards)
      .flat()
      .find((card) => card.id === cardId)
    if (!currentCard) return

    const currentListIndex = lists.findIndex(
      (list) => list.id === currentCard.listId,
    )
    const targetListIndex =
      direction === 'left' ? currentListIndex - 1 : currentListIndex + 1

    if (targetListIndex < 0 || targetListIndex >= lists.length) return

    const targetList = lists[targetListIndex]
    const targetCards = cards[targetList.id] || []

    try {
      const response = await CardsAPI.moveCard(cardId, {
        targetListId: targetList.id,
        position: targetCards.length, // Add to end of target list
      })

      if (response.error) {
        setError(response.error)
        return
      }

      if (response.data) {
        // Update cards state
        setCards((prev) => {
          const newCards = { ...prev }

          // Remove from old list
          newCards[currentCard.listId] = newCards[currentCard.listId].filter(
            (card) => card.id !== cardId,
          )

          // Add to new list
          newCards[targetList.id] = [
            ...(newCards[targetList.id] || []),
            response.data!,
          ].sort((a, b) => a.position - b.position)

          return newCards
        })
      }
    } catch (err) {
      console.error('Error moving card:', err)
      setError('Failed to move card')
    }
  }

  // Delete a card
  const handleDeleteCard = async (cardId: number) => {
    try {
      const response = await CardsAPI.deleteCard(cardId)

      if (response.error) {
        setError(response.error)
        return
      }

      // Remove card from state
      setCards((prev) => {
        const newCards = { ...prev }
        Object.keys(newCards).forEach((listId) => {
          newCards[parseInt(listId)] = newCards[parseInt(listId)].filter(
            (card) => card.id !== cardId,
          )
        })
        return newCards
      })
    } catch (err) {
      console.error('Error deleting card:', err)
      setError('Failed to delete card')
    }
  }

  // Edit card (placeholder for now)
  const handleEditCard = (cardId: number) => {
    console.log('Edit card:', cardId)
    // TODO: Implement edit functionality
  }

  if (!selectedBoard) {
    return (
      <div
        className={`flex-1 flex items-center justify-center text-gray-500 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-64'
        }`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome to your Kanban Board
          </h2>
          <p>Select a board from the sidebar to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-0' : 'ml-64'
      }`}
    >
      {/* Board Content */}
      <div className="flex-1 p-6 ">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading lists...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {error}</div>
          </div>
        )}

        {!loading && !error && lists.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium mb-2">No lists yet</h3>
              <p>This board doesn't have any lists yet</p>
            </div>
          </div>
        )}

        {!loading && !error && lists.length > 0 && (
          <div className="flex gap-6 h-full">
            {lists.map((list, listIndex) => (
              <div
                key={list.id}
                className="flex-1 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
                  <h3 className="font-semibold text-gray-800">{list.title}</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {cards[list.id]?.length || 0} cards
                  </span>
                </div>

                <div className="p-4 max-h-96 overflow-y-auto">
                  {/* Cards */}
                  {cards[list.id]?.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      canMoveLeft={listIndex > 0}
                      canMoveRight={listIndex < lists.length - 1}
                      onMoveLeft={() => handleMoveCard(card.id, 'left')}
                      onMoveRight={() => handleMoveCard(card.id, 'right')}
                      onEdit={handleEditCard}
                      onDelete={handleDeleteCard}
                    />
                  ))}

                  {/* Add Card Component */}
                  <AddCard listId={list.id} onAddCard={handleAddCard} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MainBoard
