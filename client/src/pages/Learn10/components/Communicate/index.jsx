import './styles.scss';

const Communicate = ({ title, subtitle, children }) => {
    return (
        <div className="communicateBlock">
            <h1 className='communicateBlock__title'>
                {title}
            </h1>
            <p className='communicateBlock__subTitle'>
                {subtitle}
            </p>
            {children}
        </div>
    );
};

export default Communicate;