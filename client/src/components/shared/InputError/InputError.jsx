function InputError({ children }) {
    if (!children) {
        return null;
    }

    return (
        <div className="alert alert-danger mt-1">
            { children }
        </div >
    );
}

export default InputError;