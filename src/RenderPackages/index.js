/* eslint-disable react/display-name */
import React from 'react';
import Result from '../ResultCard';
import cuid from 'cuid';
import { taggedSum } from 'daggy';
import {AsyncStateHeaders as Heading, LoadingSpinnerWrapper} from '../shared/styled.components';
import {BounceLoader} from 'react-spinners';

const Packages = taggedSum('Package', {
  Initial: [],
  Empty: [],
  Pending: [],
  Failure: ['error'],
  Success: ['data']
});

const RenderPackages = ({packages}) => packages.cata({
  Initial: () => <Heading >Enter some text to search NPM.</Heading>,
  Pending: () =>
    <LoadingSpinnerWrapper>
      <BounceLoader color={'#2FC288'} />
    </LoadingSpinnerWrapper>,
  Empty: () => <Heading>Type in the input box to search the NPM registry.</Heading>,
  Failure: error => <Heading>There was an error retreiving your data. Please try your search again. || Error {error}</Heading>,
  Success: data => data.map(x => {
    console.log(x.package, x.package.author);
    return (<Result
      key={cuid()}
      author={x.package.author}
      name={x.package.name}
      data={x.package.keywords}
      date={new Date(x.package.date).getTime()}
      version={x.package.version}
      description={x.package.description}
      details={x.score.detail}
    />);
  })
});

export {
  Packages
};

export default RenderPackages;
