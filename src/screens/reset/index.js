import React, { useState } from "react";
import "./reset.css";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

import logo from "../../assets/pagex_logo.png";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Reset() {
  const { register, handleSubmit, watch, errors } = useForm();

  const [isTokenInvalid, setisTokenInvalid] = useState(false);
  const [isMailValid, setisMailValid] = useState(false);

  let query = useQuery();
  const token = query.get("token");

  if (!token) {
    alert("Link inválido, redirecionanto para o login do PageX");
    return (window.location.href = "https://app.pagex.com.br/");
  }

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email: data.email }),
    };

    // "http://localhost:3030/api/v1/customers/change-email",
    fetch(
      "https://landingi.herokuapp.com/api/v1/customers/change-email",
      requestOptions
    ).then((data) => {
      if (data.status === 404) {
        setisTokenInvalid(true);
        return;
      }

      if (data.status === 400) {
        setisMailValid(true);
        return;
      }

      alert("Sucesso, verifique o e-mail cadastrado na hotmart");
      return (window.location.href = "https://app.pagex.com.br/");
    });
  };

  return (
    <div className="reset-container">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container d-flex justify-content-center">
          <Link className="navbar-brand" to={"/sign-in"}>
            <img src={logo} alt="PageX" style={{ height: 60 }} />
          </Link>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Redefinição de e-mail</h3>

            <p style={{ fontStyle: "italic", fontSize: 10 }}>
              Insira um e-mail para que possamos cadastrar sua conta na PageX
            </p>

            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="E-mail"
                ref={register({ required: true })}
              />
              {errors.exampleRequired && (
                <span className="error-input">
                  O campo e-mail é obrigatório
                </span>
              )}

              {isTokenInvalid && (
                <span className="error-input">
                  Link expirado e/ou inválido.
                </span>
              )}

              {isMailValid && (
                <span className="error-input">
                  O e-mail é inválido ou temporário ou já está sendo utilizado
                  pela plataforma.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              style={{ marginTop: 40 }}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
