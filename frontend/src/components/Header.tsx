import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};
type HeaderProps = {
  user: User | null;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex justify-between mb-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Domain Driven Design
      </h1>
      {user ? (
        <small className="text-sm font-medium leading-none">
          {user.username}
        </small>
      ) : (
        <Link className={buttonVariants({ variant: "outline" })} to="/register">
          Register
        </Link>
      )}
    </header>
  );
};

export default Header;
