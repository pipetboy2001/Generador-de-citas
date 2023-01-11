import { useEffect, useState } from 'react';
import AuthorQuotes from './AuthorQuotes';
import '../Styles/Page.css'

const Page = () => {
    const [quote, setQuote] = useState(null);
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showQuotesByAuthor, setShowQuotesByAuthor] = useState(false);

    /*
    * Obtiene una lista de citas de una API externa y establece el estado de la aplicación en la lista de citas obtenidas.
    */
    const fetchQuote = async () => {
        const response = await fetch('https://favqs.com/api/qotd', {
            method: 'GET',
            headers: {
                Authorization: 'Token token="73a567c9eaa68890d677caf1d367e1db"',
            },
        });
        const data = await response.json();
        setCategory(data.quote.tags);
        return data.quote;
    };
    /*
    * useeffect que se encarga de obtener las citas de la API cuando se carga la página.
    * @param {function} fetchQuotes - Función que obtiene las citas de la API.
    * @returns {undefined}
    */
    useEffect(() => {
        fetchQuote().then(quote => {
            setQuote(quote);
            setIsLoading(false);
        });
    }, []);

    /* Muestra todas las citas del autor especificado.
    *
    * @param { string } author - Nombre del autor cuyas citas se deben mostrar.
    * @returns { undefined }
    */
    const handleShowQuotesByAuthor = async (author) => {
        const response = await fetch(`https://favqs.com/api/quotes/?filter=${author}&type=author`, {
            method: 'GET',
            headers: {
                Authorization: 'Token token="73a567c9eaa68890d677caf1d367e1db"'
            },
        })
        const data = await response.json()
        setQuote(data.quotes)
        setShowQuotesByAuthor(true)
    }

    const showRandomQuote = async () => {
        const response = await fetch('https://favqs.com/api/qotd', {
            method: 'GET',
            headers: {
                Authorization: 'Token token="73a567c9eaa68890d677caf1d367e1db"',
            },
        });
        const data = await response.json();
        console.log(data);  // imprime la respuesta de la API
        setQuote(data.quote);
    };



    return (
        <div className="container">
            <h2>Get your daily quote</h2>
            {isLoading ? (
                <div className="quoteContainer">
                    <div className="quoteText">
                        <p className="quoteText">Loading...</p>
                    </div>
                    <p className="quoteAuthor">Loading...</p>
                </div>
            ) : (
                <div className="quoteContainer">
                    <div className="quoteText">
                        {/* citas */}
                        <p className="quoteText">"{quote.body}"</p>
                        {showQuotesByAuthor && <AuthorQuotes quotes={quote} />}
                    </div>
                    {/* autor */}
                    <p className="quoteAuthor">- {quote.author}</p>
                    {/* Categoría */}
                    <p className="quoteCategory">Category: {category[0]}</p>
                </div>
            )}

            {/* Boton para pedir otra cita */}
            <div className="buttonContainer">
                {/* Boton para ver todas las citas del autor */}
                <a className="quoteButton" onClick={() => handleShowQuotesByAuthor(quote.author)}>See all quotes</a>

                <a className="quoteButton" onClick={showRandomQuote}>See another quote</a>
            </div>
        </div>
    );
};

export default Page;
