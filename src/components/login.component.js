import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <form>
        <h3>Redefinição de e-mail</h3>

        <p style={{ fontStyle: "italic", fontSize: 10 }}>
          Insira um e-mail para que possamos cadastrar sua conta na PageX
        </p>

        <div className="form-group">
          <input type="email" className="form-control" placeholder="E-mail" />
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          style={{ marginTop: 40 }}
        >
          Enviar
        </button>
      </form>
    );
  }
}
