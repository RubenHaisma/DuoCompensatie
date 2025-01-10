import React, { useState } from 'react';

interface Reminder {
  date: string;
  description: string;
}

export default function DeadlineReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      date: '2024-01-31',
      description: 'Deadline om compensatie aan te vragen voor niet-gebruikte OV-kaart.',
    },
    {
      date: '2024-04-01',
      description: 'Belastingaangifte: Controleer of je renteaftrek kunt toepassen.',
    },
    {
      date: '2024-12-31',
      description: 'Eindejaarsoverzicht: Plan extra aflossingen om rente te besparen.',
    },
  ]);

  // State for new reminder input
  const [newReminder, setNewReminder] = useState<Reminder>({
    date: '',
    description: '',
  });

  const handleAddReminder = () => {
    // Validate input before adding
    if (!newReminder.date || !newReminder.description) {
      alert('Vul een datum en beschrijving in!');
      return;
    }

    setReminders((prev) => [...prev, newReminder]); // Add the new reminder
    setNewReminder({ date: '', description: '' }); // Clear input fields
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800">Belangrijke Deadlines</h3>
      <p className="text-gray-600 mt-2">Mis geen cruciale deadlines voor compensatie of belastingvoordelen.</p>

      {/* Display the reminders */}
      <ul className="mt-4 space-y-3">
        {reminders.map((reminder, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
          >
            <span className="text-gray-700 font-medium">{reminder.description}</span>
            <span className="text-blue-600 font-bold">{reminder.date}</span>
          </li>
        ))}
      </ul>

      {/* Add new reminder section */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-800">Nieuwe Deadline Toevoegen</h4>
        <div className="mt-4 space-y-2">
          <input
            type="date"
            name="date"
            value={newReminder.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Datum"
          />
          <input
            type="text"
            name="description"
            value={newReminder.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Beschrijving"
          />
          <button
            onClick={handleAddReminder}
            className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Voeg Deadline Toe
          </button>
        </div>
      </div>
    </div>
  );
}
