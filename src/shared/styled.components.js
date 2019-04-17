import React from 'react';
import styled from '@emotion/styled';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import matchSorter from 'match-sorter';
import facepaint from 'facepaint';

const breakpoints = [576, 768, 992, 1200];

const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));


const AsyncStateHeaders = styled('h2')({
  textAlign: 'center'
}, props => ({
  ...props,
  background: props => props.bg

}));

const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.width ? props.width : '100%'};
`;
const itemToString = i => (i ? i.name : '');
const Item = styled('li')(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    height: 'auto',
    textAlign: 'left',
    borderTop: 'none',
    lineHeight: '1em',
    color: 'rgba(0,0,0,.87)',
    fontSize: '1rem',
    textTransform: 'none',
    fontWeight: '400',
    boxShadow: 'none',
    padding: '.8rem 1.1rem',
    whiteSpace: 'normal',
    wordWrap: 'normal'
  },
  ({isActive, isSelected}) => {
    const styles = [];
    if (isActive) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        background: 'rgba(0,0,0,.03)'
      });
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700'
      });
    }
    return styles;
  },
);
const onAttention = '&:hover, &:focus';
const Input = styled('input')(
  {
    width: '100%', // full width - icon width/2 - border
    fontSize: 14,
    wordWrap: 'break-word',
    fontFamily: '\'Antic Slab\',serif',
    textSpacing: '.05rem',
    lineHeight: '1em',
    outline: 0,
    whiteSpace: 'normal',
    minHeight: '2em',
    background: '#fff',
    display: 'inline-block',
    padding: '1em 2em 1em 1em',
    color: 'rgba(0,0,0,.87)',
    boxShadow: 'none',
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '.30rem',
    transition: 'box-shadow .1s ease,width .1s ease',
    [onAttention]: {
      borderColor: '#96c8da',
      boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)'
    }
  },
  ({isOpen}) =>
    isOpen
      ? {
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        [onAttention]: {
          boxShadow: 'none'
        }
      }
      : null,
);

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  justify-content: flex-start;
`;

const Card = styled.div`
  color: ${props => props.theme.colors.primaryTwo};
  background: ${props => props.theme.colors.primaryOne};
  width: ${props => (props.width ? props.width : '80%')};
  max-width: ${props => (props.mWidth ? props.mWidth : 'auto')};
  display: flex;
  margin: 10px;
  border: 2px solid white;
  justify-content: space-between;
  padding: 10px;
`;

const BaseMenu = styled('ul')(
  {
    padding: 0,
    marginTop: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    maxHeight: '20rem',
    overflowY: 'auto',
    overflowX: 'hidden',
    outline: '0',
    transition: 'opacity .1s ease',
    borderRadius: '0 0 .28571429rem .28571429rem',
    boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
    borderColor: '#96c8da',
    borderTopWidth: '0',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid'
  },
  ({isOpen}) => ({
    border: isOpen ? null : 'none'
  }),
);

const Menu = React.forwardRef((props, ref) => <BaseMenu ref={ref} {...props} />);

const ControllerButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer',
  width: 47,
  display: 'flex',
  flexDirection: 'column',
  height: '140px',
  justifyContent: 'center',
  alignItems: 'center'
});

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  );
}



const ratingBackgrounds = (props) => {
  switch (props) {
    case 'maintenance': return '#af0515';
    case 'quality': return '#E3355C';
    case 'popularity': return '#070D18';
    default: return '#2FC288';
  }
};

const StyledLabel = styled.button`
  color: ${props => props.theme.colors.primaryTwo};
  background: ${props => ratingBackgrounds(props.type)};
  padding: 5px;
  border-radius: 4px;
  width: ${props => (props.width ? props.width : 'auto')};
  margin: 5px;
`;
const Footer = styled.footer`
  text-align: ${props => props.theme.footerText.align};
  background: ${props => props.theme.colors.secondaryThree};
`;
const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px;
`;

export {
  AsyncStateHeaders,
  ArrowIcon,
  breakpoints,
  Card,
  ControllerButton,
  itemToString,
  LoadingSpinnerWrapper,
  css,
  FlexCol,
  Footer,
  Input,
  Item,
  Label,
  Menu,
  mq,
  StyledLabel,
  TagsList,
  XIcon
};
