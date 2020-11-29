import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <div style={{marginTop:'0.2rem'}}>
    <Menu style={{background:'#ff9999'}} mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="Subscription">
      <a href="/Subscription">Subscriptions</a>
    </Menu.Item>
  
  </Menu>
  </div>
  )
}

export default LeftMenu