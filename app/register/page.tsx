'use client';

import { useState, useTransition } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signup } from '../login/actions';

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await signup(formData);
      } catch (e: any) {
        setError(e.message || 'Er is iets misgegaan.');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-md rounded-lg">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-4 text-2xl font-extrabold text-gray-800">
            Maak een account aan
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Registreer je om toegang te krijgen tot jouw DUO-compensatie overzicht.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Gebruikersnaam
              </label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Vul je gebruikersnaam in"
                required
                minLength={3}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mailadres
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Vul je e-mailadres in"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Wachtwoord
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Maak een veilig wachtwoord"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isPending}>
            {isPending ? 'Bezig met registreren...' : 'Registreer'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Heb je al een account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}