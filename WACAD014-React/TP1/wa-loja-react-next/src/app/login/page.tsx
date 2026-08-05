"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface formularioLogin {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
}

export default function Login() {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formularioLogin>();

  const onSubmit: SubmitHandler<formularioLogin> = (data) => {
    console.log("dados:", data);
    router.push("/");
  };

  // function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   console.log("dados:", email, password);
  //   router.push("/");
  // }

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>{" "}
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
                  required
                  // value={email}
                  // onChange={(event) => setEmail(event.target.value)}
                  {...register("email", { required: true })}
                />
                {errors.email?.type == "required" && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  required
                  // value={password}
                  // onChange={(event) => setPassword(event.target.value)}
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password?.type == "required" && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
                {errors.password?.type == "minLength" && (
                  <span className="text-danger">Mínimo de 6 caracteres</span>
                )}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Entrar
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/register" className="btn btn-link">
                  não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
