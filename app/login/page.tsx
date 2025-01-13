'use client';

import { useState, useTransition } from 'react';
import { login } from './actions';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    try {
      startTransition(async () => {
        const result = await login(formData);
        if (result?.error) {
          handleAuthError(result.error);
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
        case 'Invalid login credentials':
          message = 'Onjuiste e-mailadres of wachtwoord.';
          break;
        case 'Email not confirmed':
          message = 'Je e-mailadres is nog niet bevestigd. Check je inbox.';
          break;
        case 'Invalid email':
          message = 'Voer een geldig e-mailadres in.';
          break;
        case 'Password is too short':
          message = 'Wachtwoord moet minimaal 6 karakters bevatten.';
          break;
      }
    }

    setError(message);
    toast({
      variant: "destructive",
      title: "Fout bij inloggen",
      description: message,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-md rounded-lg">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#003b5c]" />
          <h2 className="mt-4 text-2xl font-extrabold text-gray-800">
            Welkom terug
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Log in om toegang te krijgen tot jouw DUO-compensatie overzicht.
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
                placeholder="Vul je wachtwoord in"
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#003b5c] hover:bg-[#002b4c] text-white"
            disabled={isPending}
          >
            {isPending ? 'Bezig met inloggen...' : 'Inloggen'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Nog geen account?{' '}
          <a href="/register" className="font-medium text-[#003b5c] hover:underline">
            Registreer hier
          </a>
        </p>
      </div>
    </div>
  );
}