import { Route, Routes } from "react-router-dom";
import Words from "./pages/Words";
import Verbs from "./pages/Verbs";

export const wordsPath = "words";
export const verbsPath = "verbs";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={wordsPath} Component={Words} />
            <Route path={verbsPath} Component={Verbs} />
        </Routes>
    );
};

export default AppRouter;