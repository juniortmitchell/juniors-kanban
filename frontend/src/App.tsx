import { useState } from 'react'
import './App.css'
import './components/Sidebar'
import Sidebar from './components/Sidebar'
import MainBoard from './components/Mainboard'
import BoardHeader from './components/BoardHeader'
import { BoardProvider, useBoard } from './contexts/BoardContext'

function AppContent() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)
  const { selectedBoard } = useBoard()

  return (
    <div className="">
      <Sidebar
        isHidden={isSidebarHidden}
        onToggle={() => setIsSidebarHidden(!isSidebarHidden)}
      />
      <BoardHeader
        title={selectedBoard?.title || 'Select a board'}
        sidebarCollapsed={isSidebarHidden}
      />
      <MainBoard sidebarCollapsed={isSidebarHidden} />
    </div>
  )
}

function App() {
  return (
    <BoardProvider>
      <AppContent />
    </BoardProvider>
  )
}

export default App
