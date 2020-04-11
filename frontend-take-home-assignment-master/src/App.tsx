import * as React from 'react';
import Header from './components/header/header'
import Form from './components/form/form'

const App: React.FunctionComponent = () => {
  return (
  <div className='container'>
    <Header/>
    <Form/>
  </div>
  
  )
};

export default App;
