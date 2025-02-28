import { ReactComponent as VolumeIco } from "./volume.svg";

import "./styles.scss";

const SpeakButton = ({ speak, data, className }) => {
    return (
        <button className={`speakButton ${className}`} onClick={() => speak(data)}><VolumeIco /></button>
    );
};

export default SpeakButton;