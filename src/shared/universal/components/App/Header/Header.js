/*       */

import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import { WEBSITE_DESCRIPTION } from '../../../constants';

function Header() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <Logo />
      <h2>React, Redux, Redux-saga, Modules , AntDesign, Universally</h2>
      <strong>{WEBSITE_DESCRIPTION}</strong>

      <Menu />
    </div>
  );
}

export default Header;
