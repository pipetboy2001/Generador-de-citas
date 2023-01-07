import React from 'react'
import '../Styles/Page.css'
import  Quote  from './Quote'

export const Page = () => {
    return (
        <div className="container">
            <h2>Obtenga su cita diaria</h2>
            <div className="quoteContainer">
                <p>
                    {/* aqui va la cita */}
                    <Quote/>
                </p>
                <p className="quoteGenius"></p>
            </div>
            <div className="buttonContainer">
                <a href="#" className="quoteButton">Citame</a>
            </div>
        </div>
    )
}
