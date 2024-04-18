import { RegistrationInput } from "@/components/RegistrationForm";
import axios from "axios";

export default async function registerUser(userData: RegistrationInput) {
  try {
    const response = await axios.post<{
      success: boolean;
      message: string;
      data: {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    }>("http://localhost:3000/users/new", userData);

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message as string,
      data: null,
    };
  }
}
