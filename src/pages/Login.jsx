import FormLogin from "../components/forms/FormLogin";
import NavbarLogin from "../components/navbar/NavbarLogin";
import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <NavbarLogin />
      <FormLogin />
    </div>
  );
}
