import { ReactComponent as EditIco } from "./edit.svg";

import './styles.scss';

const SettingField = ({ title, value, placeholder, toggler, isOpen, onChange, children, ...props }) => {
    return (
        <div className='settings__field'>
            {title}
            {isOpen
                ? children ? children : <input {...props} required placeholder={placeholder} onChange={onChange} />
                : <>
                    <p>{value}</p>
                    <button onClick={toggler} className='settings__editButton'>
                        <EditIco />
                    </button>
                </>
            }
        </div>
    );
};

export default SettingField;