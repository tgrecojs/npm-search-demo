import React from 'react';
import { Footer } from './styled.components';
const FooterComponent = ({text = 'Created by Thomas Greco | 2019'}) => (
  <Footer>
    <h4>{text}</h4>
  </Footer>
);

export default FooterComponent;
