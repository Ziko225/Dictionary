import { ReactComponent as VolumeIco } from "./volume.svg";

const SpeakButton = ({ speak, data, className }) => {
    return (
        <button className={`button ${className}`} onClick={() => speak(data)}><VolumeIco /></button>
    );
};

export default SpeakButton;