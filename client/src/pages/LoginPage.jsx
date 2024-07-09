import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import Logo from "../assets/logo.png";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center ">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <img src={Logo} alt="" />
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Write your email"
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
            {...register("email", { required: true })}
          />
          <p>{errors.email?.message}</p>
          <Input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p>{errors.password?.message}</p>

          <button className="w-56 bg-blue-600 rounded-lg h-10">
            Iniciar Sesión
          </button>
        </form>
        <footer className="text-white">Universidad César Vallejo - 2024</footer>
      </Card>
    </div>
  );
}
