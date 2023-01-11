import React from 'react';

const AuthorQuotes = ({ quotes }) => {
    return (
        <div className="author-quotes">
            {quotes.map(quote => (
                <div className="quote" key={quote.id}>
                    <p className="quote-text">"{quote.body}"</p>
                    <p className="quote-author">- {quote.author}</p>
                </div>
            ))}
        </div>
    );
}

export default AuthorQuotes;
