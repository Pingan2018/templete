import React, { Suspense, Component } from 'react';
import './App.css';
import MySider from './components/MySider'
import { HashRouter, Route, Switch } from "react-router-dom";
import { routeConfig } from './config'
import ErrorBoundary from './components/ErrorBoundary'
import { Layout } from 'antd';
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <HashRouter>
            <Layout style={{ minHeight: '100vh' }}>
              <MySider />
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}></Header>
                <Content
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                  }}
                >
                  <Switch>
                    {
                      routeConfig.map(com => {
                        return <Route exact key={com.name} path={com.path} component={com.component} />
                      })
                    }
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </HashRouter>
        </Suspense>
      </ErrorBoundary>
    );
  }

}

export default App;
