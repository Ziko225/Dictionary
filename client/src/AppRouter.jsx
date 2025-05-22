import { Navigate, Route, Routes } from "react-router-dom";
import QuickQuiz from "./pages/QuickQuiz/index.jsx";
import Settings from './pages/Settings/index.jsx';
import { paths } from './constants.js';
import Verbs from './pages/Verbs/index.jsx';
import Words from './pages/Words/index.jsx';
import Learn10 from './pages/Learn10/index.jsx';

const AppRouter = () => {
    return (
        <Routes>
            <Route path={paths.wordsPath} element={<Words />} />
            <Route path={paths.verbsPath} element={<Verbs />} />
            <Route path={paths.gamePath} element={<QuickQuiz />} />
            <Route path={paths.settingsPath} element={<Settings />} />
            <Route path={paths.learn10} element={<Learn10 />} />
            <Route path="*" element={<Navigate replace to={paths.wordsPath} />} />
        </Routes>
    );
};

export default AppRouter;