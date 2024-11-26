import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Calculator from './components/Calculator/CalculatorForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-duo-blue">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Header />
        </div>
      </div>
      <main className="flex-grow bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Main Content with Schema Markup */}
              <section
                itemScope
                itemType="https://schema.org/Calculator"
                className="space-y-6"
              >
                <h1 itemProp="name" className="sr-only">
                  Bereken jouw DUO compensatie
                </h1>
                <Calculator />
              </section>
            </div>
            <aside className="space-y-6">
              <div className="duo-card">
                <h2 className="text-xl font-bold mb-4">Snelle Links</h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://duo.nl/tegemoetkoming-leenstelselstudenten/"
                      className="text-duo-blue hover:text-duo-orange flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Officiële DUO informatie
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://duo.nl/particulier/studiefinanciering/gift-of-terugbetalen.jsp"
                      className="text-duo-blue hover:text-duo-orange flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terugbetalen studiefinanciering
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
