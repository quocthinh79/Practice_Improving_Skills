import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {publicRoutes} from "./routes";

function App() {
    return (<Router basename="/Practice_Improving_Skills">
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    return (<Route
                        key={index}
                        path={route.path}
                        element={route.pages}/>)
                })}
            </Routes>
        </div>
    </Router>);
}

export default App;
