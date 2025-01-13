'use client';

import { useState, useTransition } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { signup } from '../login/actions';

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      startTransition(async () => {
        const result = await signup(formData);
        if (result?.error) {
          handleAuthError(result.error);
        } else {
          toast({
            title: "Registratie succesvol",
            description: "Je account is aangemaakt. Je kunt nu inloggen.",
          });
        }
      });
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleAuthError = (error: any) => {
    let message = 'Er is een onbekende fout opgetreden.';

    if (typeof error === 'string') {
      switch (error) {
        case 'User already registered':
          message = 'Dit e-mailadres is al geregistreerd.';
          break;
        case 'Invalid email':
          message = 'Voer een geldig e-mailadres in.';
          break;
        case 'Password is too short':
          message = 'Wachtwoord moet minimaal 6 karakters bevatten.';
          break;
        case 'Missing required fields':
          message = 'Vul alle verplichte velden in.';
          break;
      }
    }

    setError(message);
    toast({
      variant: "destructive",
      title: "Fout bij registreren",
      description: message,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-md rounded-lg">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#003b5c]" />
          <h2 className="mt-4 text-2xl font-extrabold text-gray-800">
            Maak een account aan
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Registreer je om toegang te krijgen tot jouw DUO-compensatie overzicht.
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                className="mt-1"
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
                className="mt-1"
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
                className="mt-1"
              />
              <p className="mt-1 text-sm text-gray-500">
                Minimaal 6 karakters
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#003b5c] hover:bg-[#002b4c] text-white"
            disabled={isPending}
          >
            {isPending ? 'Bezig met registreren...' : 'Registreer'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Heb je al een account?{' '}
            <a href="/login" className="font-medium text-[#003b5c] hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}