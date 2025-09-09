function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white border-r border-gray-700 z-50">
      <div className="p-6">
        <h1 className="text-xl font-bold text-amber-400 mb-6 border-b-2 border-amber-400 pb-3">
          Junior's Kanban App
        </h1>

        <nav className="space-y-2">
          <div className="text-gray-300 text-sm">
            Do this after making the api lols
          </div>
          <button className="text-neutral-300 hover:text-neutral-100 hover:cursor-pointer mt-3.5">
            {' '}
            New Board +{' '}
          </button>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
