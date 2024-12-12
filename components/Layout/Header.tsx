export default function Header() {
  return (
    <header
      className="py-12"
      style={{ backgroundColor: '#003b5c' }} // Use the exact hex color
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
        <h1 itemProp="headline" className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
          Bereken jouw DUO compensatie
        </h1>
        <p itemProp="description" className="text-white text-sm md:text-lg max-w-2xl">
          Ontdek binnen enkele seconden hoeveel geld jij terug krijgt van de overheid.
        </p>
      </div>
    </header>
  );
}
