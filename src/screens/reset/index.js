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
    alert("Link inválido, redirecionando para o login do PageX");
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

      alert(
        "Sucesso! Seu acesso foi enviado em seu e-mail cadastrado na Hotmart"
      );
      return (window.location.href = "https://app.pagex.com.br/");
    });
  };

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <link
          rel="icon"
          href="https://app.pagex.com.br/assets/label/pagex.com.br/favicon/favicon.png"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>PageX</title>
        <link href="/static/css/2.1a02f21c.chunk.css" rel="stylesheet" />
        <link href="/static/css/main.9811f9f7.chunk.css" rel="stylesheet" />
      </head>
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
                Insira um e-mail para que possamos efetuar seu cadastro no PageX
                Builder.
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
                    O e-mail é inválido, repetido ou não pode ser utilizado na
                    plataforma. Favor inserir um novo endereço de e-mail.
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
    </>
  );
}

export default Reset;
