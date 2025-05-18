import CircleIco from './circles.svg?react';
import "./styles.scss";

const Loading = () => {
    return (
        <div className="loading">
            <CircleIco className="loading__ico" />
        </div>
    );
};

export default Loading;