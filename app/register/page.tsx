import { signup } from '../login/actions';
import { Beer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Beer className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start exchanging Any&apos;s with your friends
          </p>
        </div>

        <form action={signup} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                required
                minLength={3} // Optionally enforce a minimum length for usernames
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6} // Optionally enforce a minimum length for passwords
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
