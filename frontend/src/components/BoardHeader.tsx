interface BoardHeaderProps {
  title: string
  sidebarCollapsed?: boolean
}

function BoardHeader({ title, sidebarCollapsed = false }: BoardHeaderProps) {
  return (
    <>
      <div
        className={`flex flex-row justify-between p-4 items-center transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-64'
        }`}
      >
        <h1 className="font-bold text-2xl">{title}</h1>
        <button
          type="button"
          className="text-gray-800 bg-amber-400 hover:bg-neutral-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:cursor-pointer"
        >
          + Add New Task
        </button>
      </div>
    </>
  )
}

export default BoardHeader
