import { useState } from 'react'
import './App.css'
import './components/Sidebar'
import Sidebar from './components/Sidebar'
import MainBoard from './components/Mainboard'
import BoardHeader from './components/BoardHeader'

function App() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)

  return (
    <div className="">
      <Sidebar
        isHidden={isSidebarHidden}
        onToggle={() => setIsSidebarHidden(!isSidebarHidden)}
      />
      <BoardHeader
        title="Example board title"
        sidebarCollapsed={isSidebarHidden}
      />
      <MainBoard sidebarCollapsed={isSidebarHidden} />
    </div>
  )
}

export default App
