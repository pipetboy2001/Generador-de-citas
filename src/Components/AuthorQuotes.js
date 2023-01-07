import React from 'react';

const AuthorQuotes = ({ author, authors, quotes }) => {
    const authorQuotes = quotes.filter((quote, index) => authors[index] === author);

    return (
        <div className="author-quotes">
            <h2>Todas las citas de {author}</h2>

            {authorQuotes.map((quote, index) => (
                <p className="quote" key={quote.text}>{quote.text}</p>
            ))}
        </div>
    );
};

export default AuthorQuotes;
