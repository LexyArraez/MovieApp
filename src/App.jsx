import { Router } from "./Router";
import { SearchProvider } from "./hooks/context/SearchContext";


function App() {
    return (
       <>
       <SearchProvider>
         <Router/>
       </SearchProvider>
       </>
    )
}

export default App
