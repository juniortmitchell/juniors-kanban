import { ChevronLeft } from 'lucide-react'

interface SidebarProps {
  isHidden: boolean
  onToggle: () => void
}

function Sidebar({ isHidden, onToggle }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white border-r border-gray-700 z-50 transition-transform duration-300 ease-in-out ${
          isHidden ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-amber-400 border-b-2 border-amber-400 pb-3">
              Junior's Kanban App
            </h1>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Hide sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            <div className="text-gray-300 text-sm">
              Do this after making the api lols
            </div>
            <button className="text-amber-400 hover:text-neutral-100 hover:cursor-pointer mt-3.5">
              {' '}
              New Board +{' '}
            </button>
          </nav>
        </div>
      </aside>

      {/* Show button when sidebar is hidden */}
      {isHidden && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 border border-gray-700"
          title="Show sidebar"
        >
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      )}
    </>
  )
}

export default Sidebar
