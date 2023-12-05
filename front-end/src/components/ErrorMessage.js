
export default function ErrorMessage({errorStatus, doReload}) {
    const errorTitle = errorStatus.errorTitle;
    const errorMessage = errorStatus.errorMessage;

    const handleClick = () => {
        doReload();
    }

    return (
        <div className="error-message-wrapper">
            <h2 className="error-message-header">{errorTitle}</h2>
            <p className="error-message-text">{errorMessage}</p>
            <button onClick={handleClick} className="error-reload-button">Reload</button>
        </div>
    );
}