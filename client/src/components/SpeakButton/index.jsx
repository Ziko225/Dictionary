import VolumeIco from "./volume.svg?react";

import "./styles.scss";

const SpeakButton = ({ speak: speakLogic, data, className, ...props }) => {
    return (
        <button
            className={`speakButton ${className}`}
            onClick={() => speakLogic(data)}
            {...props}
        >
            <VolumeIco />
        </button>
    );
};

export default SpeakButton;