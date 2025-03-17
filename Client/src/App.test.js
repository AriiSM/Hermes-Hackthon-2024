import React from "react";
import "./App.css"; // Importăm fișierul CSS pentru stilizare

function App() {
    return (
        <div className="app-container">
            <div className="screen">
                <div className="header">
                    <h1 className="header-title">AIVEL EI RAN</h1>
                </div>

                <div className="content">
                    <div className="green-box">
                        <h2 className="message-title">ACKTMIS PFEURN</h2>
                        <p className="description">
                            NOST KRLTY RNAL BEIENE SEVIDARE<br /> TET SNE VMAGE
                        </p>
                        <button className="action-button">TRE AIN "BARBERFE" TALLME</button>
                    </div>
                </div>

                <div className="footer">
                    <div className="footer-left">
                        <h3>HOBANAST</h3>
                        <p>
                            MAIN CHALLENGES:<br />
                            Solve current global issues.<br />
                            Bring better balance toward Earth.<br />
                            Enhance cooperative abilities.
                        </p>
                    </div>
                    <div className="footer-right">
                        <h3>FINAL GOAL:</h3>
                        <p>
                            Bring AI to advanced stages.<br />
                            Achieve developmental harmony.<br />
                            Gain clarity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
