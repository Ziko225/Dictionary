import { ReactComponent as VolumeIco } from "./volume.svg";
import "./styles.css";

const SpeakButton = ({speak, data}) => {
    return (
        <button className="button" onClick={() => speak(data)}><VolumeIco /></button>
    );
};

export default SpeakButton;