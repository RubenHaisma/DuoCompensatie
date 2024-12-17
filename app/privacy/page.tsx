'use client';

import React from "react";
import Link from "next/link";
import Footer from "@/components/Layout/Footer";

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={{ ...styles.header, backgroundColor: '#003b5c' }}>
        <h1 style={{ ...styles.title, color: 'white' }}>Privacybeleid van DuoCompensatie.nl</h1>
        <p style={{ ...styles.date, color: 'white' }}><strong>Ingangsdatum:</strong> 01-12-2024</p>
      </header>

      {/* Content */}
      <main style={styles.content}>
        <section>
          <p>
            Bij <strong>DuoCompensatie.nl</strong> hechten wij veel waarde aan uw privacy. Dit 
            privacybeleid legt uit welke gegevens wij verzamelen, hoe wij deze gebruiken 
            en welke rechten u heeft met betrekking tot uw persoonsgegevens.
          </p>

          <h2 style={styles.subHeading}>1. Verzamelde Gegevens</h2>
          <p>
            Wij verzamelen persoonlijke gegevens die u vrijwillig aan ons verstrekt, zoals 
            uw naam, e-mailadres en andere contactgegevens wanneer u onze diensten gebruikt 
            of contact met ons opneemt.
          </p>

          <h2 style={styles.subHeading}>2. Gebruik van Gegevens</h2>
          <p>
            Uw gegevens worden gebruikt om onze diensten te leveren, uw vragen te beantwoorden, 
            en onze website te verbeteren. Wij zullen uw gegevens nooit verkopen aan derden.
          </p>

          <h2 style={styles.subHeading}>3. Gegevensbeveiliging</h2>
          <p>
            Wij nemen passende beveiligingsmaatregelen om uw persoonlijke gegevens te beschermen 
            tegen ongeautoriseerde toegang, wijziging of vernietiging.
          </p>

          <h2 style={styles.subHeading}>4. Cookies</h2>
          <p>
            Onze website maakt gebruik van cookies om de gebruikerservaring te verbeteren. 
            U kunt uw cookievoorkeuren instellen via uw browser.
          </p>

          <h2 style={styles.subHeading}>5. Uw Rechten</h2>
          <p>
            U heeft het recht om toegang te vragen tot uw gegevens, deze te corrigeren, te 
            laten verwijderen of bezwaar te maken tegen de verwerking. Neem contact met ons 
            op via <a href="mailto:contact@DuoCompensatie.nl"><strong>contact@DuoCompensatie.nl</strong></a> om uw rechten uit te oefenen.
          </p>

          <h2 style={styles.subHeading}>6. Wijzigingen</h2>
          <p>
            Dit privacybeleid kan worden bijgewerkt. Wij raden u aan deze pagina regelmatig 
            te controleren voor wijzigingen.
          </p>
        </section>
      </main>

      {/* Go Back Button */}
      <div style={styles.buttonContainer}>
        <Link href="/">
          <button style={{ ...styles.button, backgroundColor: '#EC672B' }}>
            Terug naar vorige pagina
          </button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    color: "#333",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#003b5c",
    color: "#fff",
    padding: "20px",
    textAlign: "center" as const,
  },
  title: {
    margin: "0",
    fontSize: "28px",
  },
  date: {
    fontSize: "14px",
    marginTop: "5px",
  },
  content: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  subHeading: {
    fontSize: "20px",
    marginTop: "20px",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  button: {
    backgroundColor: "#003b5c",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  footer: {
    backgroundColor: "#003b5c",
    color: "#fff",
    textAlign: "center" as const,
    padding: "10px 20px",
  },
};

export default PrivacyPolicy;
