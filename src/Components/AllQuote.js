import React, { useEffect, useState } from 'react';
import '../Styles/Page.css';

const AllQuotes = ({ author }) => {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://animechan.vercel.app/api/quotes/character?name=${author}`)
            .then((response) => response.json())
            .then((data) => {
                setQuotes(data);
                setIsLoading(false);
            });
    }, [author]);

    return (
        <div className="all-quotes-container">
            <center>
                <h2>Quotes by {author}</h2>
            </center>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="quotes-list">
                        {quotes.map((quote, index) => (
                            <div className="Quote" key={index}>
                                <p>"{quote.quote}"</p>
                            </div>
                        ))}

                </div>
            )}
        </div>
    );
};

export default AllQuotes;
