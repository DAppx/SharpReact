/**
 * Created by chengdi on 2016/12/10.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class AntdMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {current: 'test'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  jsx_Login() {
    if (this.props.loginState && this.props.loginState.loggedIn)
      return  <li><Link to="/logOut">loginOut</Link></li>;
    else
      return <li><Link to="/login">login</Link></li>
  }
  render() {
    return (
      <Menu onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
      >
        <Menu.Item key="home">
         <Link to="/"> <Icon type="mail" />Home</Link>
        </Menu.Item>
        <Menu.Item key="about" >
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="test" >
          <Link to="/test"><Icon type="pause-circle-o" />Test</Link>
        </Menu.Item>
        <Menu.Item key="posts" >
          <Link to="/posts">React-RouterV4</Link>
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />Saga Examples</span>}>
          <MenuItemGroup title="basic">
            <Menu.Item key="basic:1"><Link to="/example"><Icon type="check" />Example github 1</Link></Menu.Item>
            <Menu.Item key="basic:2"><Link to="/User/DAppx"><Icon type="clock-circle" />Saga Example2</Link></Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="complex">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu title={<span><Icon type="setting" />AntdDesign Examples</span>}>
          <MenuItemGroup title="basic">
            <Menu.Item key="basic:1">Example </Menu.Item>
            <Menu.Item key="basic:2">Example </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="complex">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">login</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default AntdMenu;
