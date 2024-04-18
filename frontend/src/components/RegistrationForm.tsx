import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type RegistrationInput = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

type RegistrationFormProps = {
  onSubmit: (input: RegistrationInput) => void;
  submitting: boolean;
};

export default function RegistrationForm({
  onSubmit,
  submitting,
}: RegistrationFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    onSubmit({
      email: form.email.value,
      username: form.username.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      password: form.password.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Register to enter the community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 max-w-xs max-w-xs">
              <Label htmlFor="username">Name</Label>
              <Input required id="username" placeholder="Your username" />
            </div>

            <div className="flex flex-col space-y-1.5 max-w-xs">
              <Label htmlFor="firstName">First Name</Label>
              <Input required id="firstName" placeholder="Your first name" />
            </div>
            <div className="flex flex-col space-y-1.5 max-w-xs">
              <Label htmlFor="lastName">Last Name</Label>
              <Input required id="lastName" placeholder="Your last name" />
            </div>
            <div className="flex flex-col space-y-1.5 max-w-xs">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5 max-w-xs">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                id="password"
                type="password"
                placeholder="Your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={submitting}>
            {submitting ? "Registering..." : "Join the community"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
