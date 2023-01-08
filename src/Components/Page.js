import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Page.css'

const Page = () => {
    const [quotes, setQuotes] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [randomIndex, setRandomIndex] = useState(1);


    const fetchQuotes = async () => {
        const result = await axios.get('https://type.fit/api/quotes');
        setQuotes(result.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    useEffect(() => {
        if (quotes) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setSelectedAuthor(null);
        }
    }, [quotes]);

    const showAllQuotes = (author) => {
        setSelectedAuthor(author);
    };

    return (
        <div className="container">
            <h2>Obtenga su cita diaria</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {selectedAuthor ? (
                        quotes.filter(q => q.author === selectedAuthor).map(quote => (
                            <div className="quoteContainer" key={quote.id}>
                                <div className="quoteText">
                                    <p className="quoteText">
                                        {quote.text}
                                    </p>
                                </div>
                                <p className="quoteAuthor">
                                    {quote.author}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="quoteContainer">
                            <div className="quoteText">
                                <p className="quoteText">
                                    {quotes[randomIndex].text}
                                </p>
                            </div>
                            <p className="quoteAuthor">
                                <button className="quoteAuthor" onClick={() => showAllQuotes(quotes[randomIndex].author)}>
                                    {quotes[randomIndex].author}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            )}
            <div className="buttonContainer">
                <a className="quoteButton" onClick={() => setSelectedAuthor(null)}>Ver otra cita</a>
            </div>
        </div>
    );
};

export default Page;
