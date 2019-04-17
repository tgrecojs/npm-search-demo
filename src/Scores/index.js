/* eslint-disable no-magic-numbers */
import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {StyledLabel, mq} from '../shared/styled.components';
import {string, number} from 'prop-types';

const Scores = ({
  ratingType = '',
  ratingValue = 0,
  decimalPlace = 2,
  bg,
  type,
  width = '35%'
}) => {
  Scores.propTypes = {
    ratingType: string,
    ratingValue: number,
    decimalPlace: number,
    bg: string,
    type: string,
    width: string
  };
  const roundRating = ratingValue.toFixed(decimalPlace);
  return (
    <StyledLabel
      type={ratingType}
      css={mq({
        width: ['100%', '200px']
      })}
    >
      <span>
        {ratingType} score: {roundRating}
      </span>
    </StyledLabel>
  );
};



export default Scores;
