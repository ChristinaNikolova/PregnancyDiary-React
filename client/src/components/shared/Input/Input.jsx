import InputError from "../InputError/InputError.jsx";

function Input({ type, name, label, placeholder, onChange, value, error }) {
    return (
        <div className='form-group'>
            {label !== ''
                ? <label className='form-control-label' htmlFor={name}>{label}</label>
                : null}

            {name === 'content'
                ? <textarea
                    className='form-control'
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={value}
                    cols="10"
                    rows="7"
                ></textarea>
                : <input
                    className='form-control'
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    defaultValue={value}
                />
            }
            {(error !== '' && error !== undefined) ? (<InputError>{error}</InputError>) : null}
        </div>
    )
}

export default Input;