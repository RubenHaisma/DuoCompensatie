// components/HandigeLinks.tsx

import React from 'react';

interface Link {
  href: string;
  title: string;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
}

interface HandigeLinksProps {
  links: Link[];
}

const HandigeLinks: React.FC<HandigeLinksProps> = ({ links }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Handige Links</h2>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 group transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className={`flex-shrink-0 w-10 h-10 ${link.bgColor} rounded-lg flex items-center justify-center group-hover:bg-opacity-80 transition-colors`}
              >
                {link.icon}
              </span>
              <span className="ml-3 flex-grow font-medium text-gray-900">{link.title}</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HandigeLinks;
