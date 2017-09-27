import React from 'react';
import * as Ons from 'react-onsenui'; 

export default class Header extends React.Component {
  render (){
    return (
    <div>
      <Ons.Toolbar>
        <div className='center'>Buttons</div>
        <div className='right'>
          <Ons.ToolbarButton>
            <Ons.Icon icon="ion-navicon, material:md-menu"></Ons.Icon>
          </Ons.ToolbarButton>
        </div>
      </Ons.Toolbar>
      
    </div>
    )
  }
}

