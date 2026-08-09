"use client";

import { useAuthContext } from "@/app/context/useAuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favorites">
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          {user ? (
            <>
              <span className="me-3">{user}</span>

              <button className="btn btn-outline-danger" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
