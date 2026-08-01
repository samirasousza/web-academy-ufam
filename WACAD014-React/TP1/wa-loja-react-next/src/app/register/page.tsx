"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface formularioRegister {
  name: string,
  email: string,
  confirmEmail: string,
  password: string
}

export default function Register() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formularioRegister>();

  const onSubmit:  SubmitHandler<formularioRegister> = (data) => {
    console.log("dados:", data);
    router.push("/")
  }

  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   confirmEmail: "",
  //   password: "",
  // });

  // const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = target;

  //   setForm({
  //     ...form,
  //     [id]: value,
  //   });
  // };

  // function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   console.log("dados:", form);
  //   router.push("/")
  // }

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  aria-describedby="name"
                  required
                  // value={form.name}
                  // onChange={handleChange}
                  {...register("name", { required: true})}
                />
                {errors.name?.type == "required" && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
              </div>

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
                  // value={form.email}
                  // onChange={handleChange}
                  {...register("email", { required: true})}
                />
                {errors.email?.type == "required" && (
                  <span className="text-danger">Esse campo é obrigatório</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmEmail" className="form-label">
                  Confirmar email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="confirmEmail"
                  aria-describedby="confirmEmail"
                  required
                  // value={form.confirmEmail}
                  // onChange={handleChange}
                  {...register("confirmEmail", { required: true})}
                />
                {errors.confirmEmail?.type == "required" && (
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
                  // value={form.password}
                  // onChange={handleChange}
                  {...register("password", { required: true, minLength: 6})}
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
                  Confirmar cadastro
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/login" className="btn btn-link">
                  já possuo cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
