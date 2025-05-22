import VolumeIco from "./volume.svg?react";

import "./styles.scss";

const SpeakButton = ({ onClick, className, ...props }) => {
    return (
        <button
            className={`speakButton${className ? ` ${className}` : ''}`}
            onClick={onClick}
            {...props}
        >
            <VolumeIco />
        </button>
    );
};

export default SpeakButton;