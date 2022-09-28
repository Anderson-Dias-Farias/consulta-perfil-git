import React, { useState } from 'react';

import { MdSearch } from 'react-icons/md';

import { Container, LogoGit, Titlie, Form, Input, Button } from './styles';

import gitHublogo from '../../assets/images/github-logo.svg';

const MainPage = () => {
  const [login, setlogin] = useState();

  return (
    <Container>
      <LogoGit src={gitHublogo} alt="API Github" />
      <Titlie>API Github</Titlie>
      <Form>
        <Input
          placeholder="Usuario"
          value={login}
          onChange={(event) => {
            setlogin(event.target.value);
          }}
        />
        <Button to={`/${login}/repositories`}>
          <MdSearch size={42} />
        </Button>
      </Form>
    </Container>
  );
};
export default MainPage;
