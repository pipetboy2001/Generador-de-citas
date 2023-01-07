import React, { useState } from 'react'
import AuthorQuotes from './AuthorQuotes';
import '../Styles/Page.css'

const Page = ({ authors, quotes, quote, author }) => {
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    const getRandomQuote = () => {
        console.log("Mostrar otra cita aleatoria");
        setSelectedAuthor(null);
        window.location.reload();

    };

    const AllQuotes = () => {
        console.log("Mostrar todas las citas de este autor");
        setSelectedAuthor(author);
    };

    return (
        <div className="container">
            <h2>Obtenga su cita diaria</h2>
            <div className="quoteContainer">
                <div className="quoteText">
                    {selectedAuthor ? (
                        <AuthorQuotes author={selectedAuthor} authors={authors} quotes={quotes} />
                    ) : (
                        <p className="quoteText">{quote}</p>
                    )}
                </div>
                <p className="quoteAuthor">
                    <button className="quoteAuthor" onClick={AllQuotes}>
                        {author}
                    </button>
                    
                </p>
            </div>
            <div className="buttonContainer">
                <a className="quoteButton" onClick={getRandomQuote}>Otra cita</a>
            </div>
        </div>
    )
}

export default Page;
