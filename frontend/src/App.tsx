import './App.css'
import './components/Sidebar'
import Sidebar from './components/Sidebar'
import MainBoard from './components/Mainboard'

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-900">
      <Sidebar />
      <MainBoard />
    </div>
  )
}

export default App
