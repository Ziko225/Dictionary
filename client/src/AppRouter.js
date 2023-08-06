import { Navigate, Route, Routes } from "react-router-dom";
import Dictionary from "./pages/Dictionary";

export const wordsPath = "/";
export const verbsPath = "/verbs";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={wordsPath} element={<Dictionary path={wordsPath} />} />
            <Route path={verbsPath} element={<Dictionary path={verbsPath} />} />
            <Route path="*" element={<Navigate replace to={wordsPath} />} />
        </Routes>
    );
};

export default AppRouter;