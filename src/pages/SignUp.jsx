import FormSignUp from "../components/forms/FormSignUp";
import NavbarLogin from "../components/navbar/NavbarLogin";
import "./Login.css";

export default function SignUp() {
  return (
    <div className="login">
      <NavbarLogin />
      <FormSignUp />
    </div>
  );
}
