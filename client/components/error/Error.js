import React from 'react';

const Error = ({ error }) => {
    return (
        <div className='error-container'>
            <h1>Oops!</h1>
            <h3 className='code-block'>{error.message}</h3>
            <div className='code-block'>
                <code>
                    {
                        error.stack.split('\\n').map(line => <p>{line}</p>)
                    }
                </code>
            </div>
        </div>
    );
};

export default Error;