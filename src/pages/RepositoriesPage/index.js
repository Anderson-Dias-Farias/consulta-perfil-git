import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Filter from './Filter';
import Profile from './Profile';
import Repositories from './Repositories';
import { getLAngesFrom, getUser, getRepos } from '../../services/api';

import { Container, Sidebar, Main, Loading } from './styles';

const RepositoriesPage = () => {
  const { login } = useParams();
  const [user, setUser] = useState();
  const [repositories, setRepositories] = useState();
  const [languages, setLanguages] = useState();
  const [currentlanguage, setCurrentLanguage] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const [userResponse, repositoriesResponse] = await Promise.all([
        getUser(login),
        getRepos(login),
      ]);
      setUser(userResponse.data);
      setRepositories(repositoriesResponse.data);
      setLanguages(getLAngesFrom(repositoriesResponse.data));
      setloading(false);
    };
    loadData();
  }, []);

  const onFilterClick = (language) => {
    setCurrentLanguage(language);
  };

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }

  return (
    <Container>
      <Sidebar>
        <Profile user={user} />
        <Filter
          languages={languages}
          currentLanguage={currentlanguage}
          onClick={onFilterClick}
        />
      </Sidebar>
      <Main>
        <Repositories
          repositories={repositories}
          currentLanguage={currentlanguage}
        />
      </Main>
    </Container>
  );
};

export default RepositoriesPage;
