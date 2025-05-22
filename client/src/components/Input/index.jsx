import './styles.scss';

const Input = ({ className, ...props }) => {
    return <input className={`customInput${className ? ` ${className}` : ''}`} {...props} />;
};

export default Input;