

export const UserProfile = ({ avatarUrl, onClick }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-text-title hover:border-white transition-colors duration-200 focus:outline-none"
            >
                <img
                    src={avatarUrl || "https://via.placeholder.com/150"}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </button>
        </div>
    )
}
