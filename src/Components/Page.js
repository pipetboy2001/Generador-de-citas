import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Page.css'

const Page = () => {

    const [quotes, setQuotes] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [randomIndex, setRandomIndex] = useState(0);

    /*
    * Obtiene una lista de citas de una API externa y establece el estado de la aplicación en la lista de citas obtenidas.
    */
    const fetchQuotes = async () => {
        const result = await axios.get('https://type.fit/api/quotes');
        setQuotes(result.data);
        setIsLoading(false);
    };

    /*
    * useeffect que se encarga de obtener las citas de la API cuando se carga la página.
    * @param {function} fetchQuotes - Función que obtiene las citas de la API.
    * @returns {undefined}
    */
    useEffect(() => {
        fetchQuotes();
    }, []);

    /*
    * Efecto de lado que establece un índice aleatorio y el autor seleccionado en "null" cuando se actualiza la lista de citas.
    *
    * @param {array} quotes - Lista de citas.
    * @param {function} setRandomIndex - Función que establece el índice aleatorio en el estado de la aplicación.
    * @param {function} setSelectedAuthor - Función que establece el autor seleccionado en el estado de la aplicación.
    * @returns {undefined}
    */
    useEffect(() => {
        if (quotes) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setRandomIndex(randomIndex);
            setSelectedAuthor(null);
        }
    }, [quotes]);

    /* Muestra todas las citas del autor especificado.
    *
    * @param { string } author - Nombre del autor cuyas citas se deben mostrar.
    * @returns { undefined }
    */
    const showAllQuotes = (author) => {
        setSelectedAuthor(author);
    };

    /*
    * Muestra una cita aleatoria y establece el autor seleccionado en "null".
    *
    * @param {array} quotes - Lista de citas.
    * @param {function} setRandomIndex - Función que establece el índice aleatorio en el estado de la aplicación.
    * @param {function} setSelectedAuthor - Función que establece el autor seleccionado en el estado de la aplicación.
    * @returns {undefined}
    */
    const showRandomQuote = () => {
        if (quotes) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setRandomIndex(randomIndex);
            setSelectedAuthor(null);
        }
    };

    return (
        <div className="container">
            <h2>Get your daily quote</h2>
            {isLoading ? (
                <>
                    <div className="quoteContainer">
                        <div className="quoteText">
                            <p className="quoteText">
                                Loading...
                            </p>
                        </div>
                        <p className="quoteAuthor">
                            Loading...
                        </p>
                    </div>

                </>
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
                                <button className="quoteAuthor" value='All Quotes' onClick={() => showAllQuotes(quotes[randomIndex].author)}>
                                    {quotes[randomIndex].author}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            )}
            <div className="buttonContainer">
                <a className="quoteButton" onClick={showRandomQuote}>See another quote</a>
            </div>
        </div>
    );
};

export default Page;
