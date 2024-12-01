import React from 'react';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Profile from './Profile';
import Account from "./Account.tsx";
import Quiz from "./Quiz.tsx";
import Summary from "./Summary.tsx";
import Upload from "./Upload.tsx";

interface ContentAreaProps {
    selectedComponent: string;
}

const Content: React.FC<ContentAreaProps> = ({ selectedComponent }) => {
    switch (selectedComponent) {
        case 'Account':
            return <Account />;
        case 'Quiz':
            return <Quiz />;
        case 'Summary':
            return <Summary/>;
        case 'Upload':
            return <Upload/>;
        default:
            return <div>Select a menu item</div>;
    }
};

export default Content;