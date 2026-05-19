export const Label = ({icon: Icon, text}) => {
    return (
       
            <div className="inline-flex items-center gap-1.5 border border-gray-600/40  px-2.5 py-1 rounded-md select-none">
      {Icon && <Icon className="w-3.5 h-3.5 text-text-tv " />}
      
      
      <span className="text-body-sm font-semibold tracking-wider text-text-4k uppercase">
        {text}
      </span>
        </div>
    )
}
