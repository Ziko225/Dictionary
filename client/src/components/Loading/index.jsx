import { ReactComponent as CircleIco } from "./circle.svg";
import "./styles.scss";

const Loading = () => {
    return (
        <div className="loading">
            <CircleIco className="loading__ico" />
        </div>
    );
};

export default Loading;