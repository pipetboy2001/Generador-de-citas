import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Page.css'

const Page = () => {
    const [quote, setQuote] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://type.fit/api/quotes');
            const quotes = result.data;
            if (selectedAuthor) {
                const filteredQuotes = quotes.filter(q => q.author === selectedAuthor);
                setQuote(filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]);
            } else {
                setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
            }
        };
        fetchData();
    }, [selectedAuthor]);

    const getRandomQuote = () => {
        //Recarga la pagina
        window.location.reload();
    };

    const showAllQuotes = () => {
        setSelectedAuthor(quote.author);
        window.location.reload();
    };

    return (
        <div className="container">
            <h2>Obtenga su cita diaria</h2>
            {quote && (
                <div className="quoteContainer">
                    <div className="quoteText">
                        <p className="quoteText">
                            {quote.text}
                        </p>
                    </div>
                    <p className="quoteAuthor">
                        <button className="quoteAuthor" onClick={showAllQuotes}>
                            {quote.author}
                        </button>
                    </p>
                </div>
            )
            }
            <div className="buttonContainer">
                <a className="quoteButton" onClick={getRandomQuote}>Otra cita</a>
            </div>
        </div>
    );
};

export default Page;
