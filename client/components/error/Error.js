import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
    return (
        <div className='error-container'>
            <h1>Oops!</h1>
            <h3 className='code-block'>{error.message}</h3>
            <div className='code-block'>
                <code>
                    {error.stack.split('\\n').map(line => (
                        <p key={line}>{line}</p>
                    ))}
                </code>
            </div>
        </div>
    );
};
Error.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
        stack: PropTypes.string
    })
};
export default Error;