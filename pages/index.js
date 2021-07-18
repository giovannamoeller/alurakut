// npx create-next-app --example with-styled-components

import { MainGrid } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AluraKutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useState, useEffect } from "react";

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img className="image" src={`https://github.com/${githubUser}.png`} alt="" />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home(props) {

  const [followers, setFollowers] = useState([]);

  const [comunidades, setComunidades] = useState([]);
  
  useEffect(() => {
    
    fetch(`https://api.github.com/users/${props.githubUser}/followers`)
    .then((response) => response.json())
      .then((data) => {
        setFollowers(data);
      });

      const token = process.env.NEXT_PUBLIC_CMS_TOKEN;

      fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: "{ allComunidades { title id link imageUrl } }",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setComunidades(res.data.allComunidades);
        })  
        .catch((error) => {
          console.log(error);
        });
  }, []);

  function handleFormSubmit(event) {

    event.preventDefault();

    const formulario = new FormData(event.target);

    const novaComunidade = {
      title: formulario.get("title"),
      imageUrl: formulario.get("image") || "http://placehold.it/300x300.png",
      link: formulario.get("url"),
    };

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaComunidade)
    }).then(async (response) => {
      const dados = await response.json();
    })

    setComunidades([...comunidades, novaComunidade]);
  }

  return (
    <>
      <AlurakutMenu user={props.githubUser}></AlurakutMenu>
      <MainGrid>
        <div className="profile" style={{ gridArea: "profile" }}>
          <ProfileSidebar githubUser={props.githubUser} />
        </div>

        <div className="welcome" style={{ gridArea: "welcome" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet confiavel={3} sexy={3} legal={3} recados={100} />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={() => handleFormSubmit(event)}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Qual o link para sua comunidade?"
                  type="text"
                  name="url"
                  aria-label="Qual vai ser o link para sua comunidade"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  type="text"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="relations" style={{ gridArea: "relations" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={comunidade.link}>
                      <img src={comunidade.imageUrl}></img>
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({followers.length})
            </h2>
            <ul>
              {followers.slice(0, 6).map((follower) => {
                return (
                  <li key={follower.login}>
                    <a href={follower.html_url}>
                      <img src={follower.avatar_url} />
                      <span>{follower.login}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}


export async function getServerSideProps(context) {

  const cookieToken = nookies.get(context).USER_TOKEN;

  console.log(cookieToken)
  
  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
    headers: {
      Authorization: cookieToken
    }
  })
  .then(response => response.json());

  console.log(isAuthenticated)
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const { githubUser } = jwt.decode(cookieToken);

  return {
    props: {
      githubUser
    },
  }
}