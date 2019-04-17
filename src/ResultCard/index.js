import React from 'react';
import Keywords from '../Keywords';

/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import { TagsList,
  mq,
  FlexCol,
  Card
} from '../shared/styled.components';
import Scores from '../Scores';
const prettyMs = require('pretty-ms');

const parseAuthor = (author) => {
  console.log(author);
  switch (author) {
    case author.name: return author.name;
    case author.username: return author.username;
    case author.email: return author.email;
    default: return 'NPM User';
  }
};
const Result = ({
  name  = '@default/package',
  description = 'Default description being returned from /search/suggestion?={query} endpoint',
  version = '0.0.1',
  data = ['Default', 'related', 'keywords', 'related', 'to', 'package'],
  details = {
    first: '',
    second: ''
  },
  date = Date.now().getTime(),
  author,
  ...rest
} = {}) => {
  console.log('rest ==>', rest);
  return (
    <Card
      css={mq({
        width: ['95%', '90%'],
        flexDirection: ['column', 'row']
      })}>
      <FlexCol width="70%">
        <h2>{name}</h2>
        <p>{description}</p>
        <TagsList css={mq({
          width: ['100%']
        })}>
          <Keywords data={data} />
        </TagsList>
        {
          author && author.name
        } published • {version} : Days ago : {prettyMs(date)}
      </FlexCol>
      <FlexCol  css={mq({
        width: ['80%', '20%']
      })}>
        {Object.entries(details).map((d, key) => {
          const [first, second] = d;
          return <Scores key={key} ratingType={first} ratingValue={second} />;
        })}
      </FlexCol>
    </Card>
  );
};

export default Result
;
