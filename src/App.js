import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/pages/home-page';
import LoginPage from './components/pages/login-page';
import RegisterPage from './components/pages/register-page';
import ArticlePage from './components/pages/article-page';
import SettingsPage from './components/pages/settings-page';
import NewArticlePage from './components/pages/new-article-page';
import ProfilePage from './components/pages/profile-page';
import EditArticlePage from './components/pages/edit-article-page';
import Header from './components/header';
import Footer from './components/footer';

import s from './App.module.sass'

function App() {
  return (
    <div className={s.wrapper}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <>
          <Header />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/article/:id" component={ArticlePage} />
          <Route path="/settings" component={SettingsPage} exact />
          <Route path="/new_article" component={NewArticlePage} exact />
          <Route path="/profile/:id" component={ProfilePage} />
          <Route path="/edit_article/:id" component={EditArticlePage} />
          <Footer />
        </>
        <Route render={() => <h1>404 Pege Not Found!</h1>} />
      </Switch>
    </div>
  );
}

export default App;
