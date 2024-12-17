'use client';

import React from "react";
import Link from "next/link";
import Footer from "@/components/Layout/Footer";

const TermsAndConditions: React.FC = () => {

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={{...styles.title, color: 'white'}}>Algemene Voorwaarden van DuoCompensatie.nl</h1>
        <p style={{...styles.date, color: 'white'}}><strong>Ingangsdatum:</strong> 01-12-2024</p>
      </header>

      {/* Content */}
      <main style={styles.content}>
        <section>
          <p>
            Welkom bij <strong>DuoCompensatie.nl</strong>. Door gebruik te maken van onze website 
            stemt u ermee in zich te houden aan de volgende algemene voorwaarden. 
            Lees deze voorwaarden zorgvuldig door voordat u gebruik maakt van onze diensten. 
            Indien u niet akkoord gaat, dient u de website niet te gebruiken.
          </p>

          <h2 style={styles.subHeading}>1. Gebruik van de Website</h2>
          <p>
            U stemt ermee in <strong>DuoCompensatie.nl</strong> uitsluitend te gebruiken voor legitieme 
            doeleinden en in overeenstemming met deze voorwaarden.
          </p>

          <h2 style={styles.subHeading}>2. Verleende Diensten</h2>
          <p>
            DuoCompensatie.nl biedt informatie en tools met betrekking tot compensatie. 
            Wij streven naar nauwkeurigheid, maar garanderen dit niet volledig.
          </p>

          <h2 style={styles.subHeading}>3. Verplichtingen van Gebruikers</h2>
          <p>
            Gebruikers moeten correcte informatie verstrekken en zich houden aan alle 
            toepasselijke wetgeving. Misbruik kan leiden tot juridische stappen.
          </p>

          <h2 style={styles.subHeading}>4. Intellectueel Eigendom</h2>
          <p>
            Alle inhoud op deze website, inclusief tekst en logo's, is eigendom van DuoCompensatie.nl.
          </p>

          <h2 style={styles.subHeading}>5. Aansprakelijkheidsverklaring</h2>
          <p>
            Wij zijn niet aansprakelijk voor enige schade die voortvloeit uit het gebruik van 
            deze website. Gebruik is volledig op eigen risico.
          </p>

          <h2 style={styles.subHeading}>6. Wijzigingen</h2>
          <p>
            DuoCompensatie.nl behoudt zich het recht voor deze voorwaarden op elk moment te wijzigen. 
            Wij raden aan regelmatig deze pagina te controleren.
          </p>
        </section>
      </main>

      {/* Go Back Button */}
      <div style={styles.buttonContainer}>
        <Link href="/">
          <button style={{ ...styles.button, backgroundColor: "#ff9900" }}>
            <span style={{ color: 'white' }}>Terug naar vorige pagina</span>
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

export default TermsAndConditions;
