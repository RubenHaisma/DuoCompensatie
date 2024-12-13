import React from 'react';
import Image from 'next/image';

interface AdProps {
  companyName: string;
  tagline: string;
  description: string;
  logoSrc: string;
  link: string;
}

const Ad: React.FC<AdProps> = ({ companyName, tagline, description, logoSrc, link }) => {
  return (
    <div
      className="group relative w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-gray-800 hover:text-gray-900 no-underline"
      >
        {/* Logo */}
        <div className="relative w-full h-40 flex items-center justify-center">
          <Image
            src={logoSrc}
            alt={`${companyName} logo`}
            width={100}
            height={100}
            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800">{companyName}</h2>
          <p className="text-sm font-semibold text-blue-600 mt-2">{tagline}</p>
          <p className="text-sm text-gray-600 mt-4">{description}</p>
        </div>
      </a>
    </div>
  );
};

const AdComponent: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      <Ad
        companyName="Laava.nl"
        tagline="AI-oplossingen op maat"
        description="Bedrijven empoweren met innovatieve AI-technologie om processen te stroomlijnen en groei te stimuleren."
        logoSrc="/images/laava-logo.png" // Replace with actual path to logo
        link="https://laava.nl"
      />
      <Ad
        companyName="Digitalebouw.nl"
        tagline="Uw online aanwezigheid bouwen"
        description="Expert websiteontwerp en -ontwikkelingsservices, om uw online aanwezigheid impactvoller en gebruikersvriendelijker te maken."
        logoSrc="/images/digitalebouw-logo.png" // Replace with actual path to logo
        link="https://digitalebouw.nl"
      />
      <Ad
        companyName="Incubit.nl"
        tagline="Uw IT-partner in innovatie"
        description="Cutting-edge IT-oplossingen op maat gemaakt voor uw bedrijf, om efficiency en schaalbaarheid te verbeteren."
        logoSrc="/images/incubit-logo.png" // Replace with actual path to logo
        link="https://incubit.nl"
      />
    </div>
  );
};

export default AdComponent;
