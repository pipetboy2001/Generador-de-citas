import axios from 'axios';
import { useEffect, useState } from 'react';
import Page from './Page';

const QuoteDisplay = ({ authors, quotes }) => {
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("https://type.fit/api/quotes");
            const randomIndex = Math.floor(Math.random() * result.data.length);
            setQuote(result.data[randomIndex].text);
            setAuthor(result.data[randomIndex].author);
        };
        fetchData();
    }, []);

    return (
        <div className="quote-display">
            {quote && author && (
                <Page authors={authors} quotes={quotes} quote={quote} author={author} />
            )}
        </div>
    );
};


export default QuoteDisplay;
