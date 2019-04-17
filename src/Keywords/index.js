import React from 'react';
import {StyledLabel} from '../shared/styled.components';
import cuid from 'cuid';
import {array} from 'prop-types';

const Keywords = ({data}) => {
  Keywords.propTypes = {
    data: array
  };
  return data && data.length > 0
    ? data.map(x =>
      <StyledLabel
        key={cuid()}
      >{x}</StyledLabel>)
    : null;
};

export default Keywords;
