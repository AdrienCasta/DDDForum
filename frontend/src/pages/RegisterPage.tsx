import registerUser from "@/api/registerUser";
import Layout from "@/components/Layout";
import RegistrationForm, {
  RegistrationInput,
} from "@/components/RegistrationForm";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { toast } = useToast();
  const { setUser } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (userData: RegistrationInput) => {
    setSubmitting(true);

    const response = await registerUser(userData);

    setSubmitting(false);

    toast({
      title: response.success
        ? "User registered successfully"
        : "Uh oh! Something went wrong.",
      description: response.message,
    });

    if (response.success) {
      setUser(response.data);
      navigate("/");
    }
  };

  return (
    <Layout>
      <RegistrationForm onSubmit={handleSubmit} submitting={submitting} />
    </Layout>
  );
}
