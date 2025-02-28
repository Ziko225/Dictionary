import { Navigate, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Settings from './pages/Settings';
import { paths } from './constants.js';
import Verbs from './pages/Verbs/index.jsx';
import Words from './pages/Words/index.jsx';

const AppRouter = () => {

    return (
        <Routes>
            <Route path={paths.wordsPath} element={<Words />} />
            <Route path={paths.verbsPath} element={<Verbs />} />
            <Route path={paths.gamePath} element={<Game />} />
            <Route path={paths.settingsPath} element={<Settings />} />
            <Route path="*" element={<Navigate replace to={paths.wordsPath} />} />
        </Routes>
    );
};

export default AppRouter;