import Image from "next/image";
import Header from "@/components/Layout/Header";  // Adjust path according to your folder structure
import Footer from "@/components/Layout/Footer";  // Adjust path according to your folder structure
import Calculator from "@/components/Calculator/CalculatorForm";
import CookieBanner from "@/components/CookieBanner";  // Adjust path according to your folder structure
import AdComponent from "@/components/ad/AdComponent";  // Import the AdComponent

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 rounded-b">
      {/* Header */}
      <header>
        <Header />
      </header>


      {/* Main Content */}
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Section */}
            <div className="lg:col-span-2">
              <section
                itemScope
                itemType="https://schema.org/Calculator"
                className="space-y-6"
              >
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Studiefinanciering compensatie berekenen
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Vul je studiegegevens in om te zien hoeveel compensatie je kunt verwachten.
                  </p>
                </div>
                <Calculator />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick Links Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Handige Links
                </h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://duo.nl/tegemoetkoming-leenstelselstudenten/"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 group transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </span>
                      <span className="ml-3 flex-grow font-medium text-gray-900">
                        Officiële DUO informatie
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://duo.nl/particulier/studiefinanciering/gift-of-terugbetalen.jsp"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 group transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </span>
                      <span className="ml-3 flex-grow font-medium text-gray-900">
                        Terugbetalen studiefinanciering
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Ad Component */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Onze Partners</h2>
                <div className="flex items-center justify-center">
                  <AdComponent />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <CookieBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
