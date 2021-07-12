import styled from 'styled-components';

export const MainGrid = styled.main`
  padding: 16px;
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  gap: 10px;

  .profile {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  
  @media (min-width: 860px) {
    max-width: 1100px;
    display: grid;
    grid-template-areas: "profile welcome relations";
    // grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;