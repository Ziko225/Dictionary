import { Navigate, Route, Routes } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Game from "./pages/Game";

export const wordsPath = "/";
export const verbsPath = "/verbs";
export const gamePath = "/game";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={wordsPath} element={<Dictionary path={wordsPath} />} />
            <Route path={verbsPath} element={<Dictionary path={verbsPath} />} />
            <Route path={gamePath} element={<Game />} />
            <Route path="*" element={<Navigate replace to={wordsPath} />} />
        </Routes>
    );
};

export default AppRouter;