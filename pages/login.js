import React, { useState } from "react";
import { useRouter } from "next/router";
import nookies from 'nookies';

export default function LoginScreen() {
  const router = useRouter();
  const [user, setUser] = useState('giovannamoeller');

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch('https://alurakut.vercel.app/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ githubUser: user })
    }).then(async (response) => {
        const data = await response.json();
        const token = data.token;
        nookies.set(null, 'USER_TOKEN', token, {
            path: '/', // toda URL da aplicação
            maxAge: 604800, // data de validade
        });
        router.push("/");
    })
  }

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleFormSubmit}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)} />
            {user.length === 0 ? 'Preencha o campo' : ''}
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
