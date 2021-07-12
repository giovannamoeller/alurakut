// npx create-next-app --example with-styled-components

import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="" />
    </Box>
  )
}

export default function Home() {

  const githubUser = 'giovannamoeller';
  const pessoasFavoritas = ['juunegreiros', 'peas', 'marcobrunodev', 'giovannamoeller', 'felipefialho', 'diego3g'];

  return (
    <>
    <AlurakutMenu githubUser={githubUser}></AlurakutMenu>
    <MainGrid>
      <div className="profile" style={{gridArea: 'profile'}}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>

      <div className="welcome" style={{gridArea: 'welcome'}}>
        <Box>
          <h1 className="title">Bem Vindo(a)</h1>
          <OrkutNostalgicIconSet/>
        </Box>
      </div>

      <div className="relations" style={{gridArea: 'relations'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map(pessoa => {
              return (
                <li key={pessoa}>
                  <a href={`https://github.com/users/${pessoa}`}>
                    <img src={`https://github.com/${pessoa}.png`}></img>
                    <span>{pessoa}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
