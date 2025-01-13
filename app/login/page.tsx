'use client';

import { login } from './actions';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      login(formData);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-md rounded-lg">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-4 text-2xl font-extrabold text-gray-800">
            Welkom terug
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Log in om toegang te krijgen tot jouw DUO-compensatie overzicht.
          </p>
        </div>

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
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isPending}
          >
            {isPending ? 'Bezig met inloggen...' : 'Inloggen'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Nog geen account?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:underline">
            Registreer hier
          </a>
        </p>
      </div>
    </div>
  );
}
