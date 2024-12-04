import Sidebar from './components/Sidebar.tsx';
import Content from './components/Content.tsx';
import Quiz from './components/Quiz.tsx';
import RightSideBar from './components/RightSideBar.tsx';
import './index.css'
import './components/sidebar.css'
import {useState} from "react";
const HomePage: React.FC = () => {
        const [selection, setSelection] = useState<string>(sessionStorage.getItem("sidebarSelection") || "Account"); // Default to 'dashboard'

        const handleSelect = (component: string): void => {
            setSelection(component);
        };

        const[isFileSelected, setIsFileSelected] = useState(false);

return(
    <div className="main">
    <Sidebar onSelect={handleSelect} />
    <Content selectedComponent={selection} />
    <RightSideBar />
    </div>
);
}
export default HomePage;