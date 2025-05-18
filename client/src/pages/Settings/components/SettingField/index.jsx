import EditIco from "./edit.svg?react";

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