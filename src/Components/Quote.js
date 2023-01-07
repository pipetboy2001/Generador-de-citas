import axios from 'axios';
import { useEffect, useState } from 'react';

const QuoteDisplay = () => {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://type.fit/api/quotes');
            const randomIndex = Math.floor(Math.random() * result.data.length);
            setQuote(result.data[randomIndex]);
        };
        fetchData();
    }, []);

    return (
        <div className="quote-display">
            {quote && (
                <div className="quote" key={quote.text}>
                    <p className="quote-text">{quote.text}</p>
                    <p className="quote-author">- {quote.author}</p>
                </div>
            )}
        </div>
    );
};

export default QuoteDisplay;
