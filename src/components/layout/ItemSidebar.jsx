
export const ItemSidebar = ({ icon: Icon,
    label,
    active = false, }) => {

    return (
        <button
            className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${active
                    ? "bg-blue-600/20 text-text-title"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
      `}
        >
            <Icon className="w-5 h-5" />

            <span className="text-sm font-medium">
                {label}
            </span>
        </button>
    )
}
