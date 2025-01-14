import Image from "next/image";
import Header from "@/components/Layout/Header"; // Adjust path according to your folder structure
import Footer from "@/components/Layout/Footer"; // Adjust path according to your folder structure
import Calculator from "@/components/Calculator/CalculatorForm";
import CookieBanner from "@/components/CookieBanner"; // Adjust path according to your folder structure
import AdComponent from "@/components/ad/AdComponent"; // Import the AdComponent
import HandigeLinks from "@/components/links"; // Import the new component
import { AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function Home() {
  const links = [
    {
      href: "https://duo.nl/tegemoetkoming-leenstelselstudenten/",
      title: "Officiële DUO informatie",
      icon: <AiOutlineInfoCircle className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      href: "https://duo.nl/particulier/studiefinanciering/gift-of-terugbetalen.jsp",
      title: "Terugbetalen studiefinanciering",
      icon: <FiExternalLink className="w-5 h-5 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      href: "https://duohelper.nl",
      title: "DUO aflossing berekenen?",
      icon: <AiOutlineInfoCircle className="w-5 h-5 text-yellow-600" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      href: "mailto:contact@duocompensatie.nl",
      title: "Contact",
      icon: <AiOutlineMail className="w-5 h-5 text-red-600" />,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

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
              {/* Handige Links Card */}
              <HandigeLinks links={links} />

              {/* Ad Component */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Onze Partners
                </h2>
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
