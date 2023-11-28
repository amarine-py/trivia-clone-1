

export default function ValueBox({ value }) {

    return (
        <div id="value-box-container" className="value-box">
            <p className="clue-box-value">{`$${value}`}</p>
        </div>
    );
}