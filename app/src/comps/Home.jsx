import React from 'react';
import {Header, Footer, Content} from './index';


export default class Home extends React.Component {
  render (){
    return (
      <div>
        <Header/>
        <hr/>
        <Content/>
        <hr/>
        <Footer/>
      </div>
    )
  }
}
