import { useEffect, useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import AllQuote from './AllQuote';

import '../Styles/Page.css';

const Page = () => {
    const [quote, setQuote] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hover, setHover] = useState(false);
    const [showAllQuotes, setShowAllQuotes] = useState(false);
    const [author, setAuthor] = useState('');

    const getNewQuote = () => {
        fetch("https://animechan.vercel.app/api/random")
            .then((response) => response.json())
            .then((quote) => setQuote(quote));
        setIsLoading(false);
    }
    useEffect(() => {
        getNewQuote();
    }, []);

    const getQuotesByAuthor = (
        author) => {
        setAuthor(author);
        setShowAllQuotes(true);
    }


    return (
        <div className="container">
            <center>
                <h1 >Random Anime Quote</h1>
            </center>
            {/* Boton para pedir otra cita */}
            <div >
                <button className='NewQuote' onClick={getNewQuote}>Random <TfiReload/></button>
            </div>
            {isLoading ? (
                <div >
                    <div >
                        <p >Loading...</p>
                    </div>
                    <p >Loading...</p>
                </div>
            ) : (
                
                <div >
                        <div>
                            {showAllQuotes ? <AllQuote author={author} /> : <p className='Quote'>"{quote.quote}"</p>
                            }


                        </div>
                        <div className='Information' onClick={() => getQuotesByAuthor(quote.character)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            <p className='Author'> Author: {quote.character}  {hover && <AiOutlineArrowRight className='icon-right' />}</p>
                            <p>Anime: {quote.anime}</p>
                        </div>
                </div>
            )}
        </div>
    );
};

export default Page;
