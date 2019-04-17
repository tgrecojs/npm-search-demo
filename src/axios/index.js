/* eslint-disable new-cap */
import React from 'react';
import styled from '@emotion/styled';
import {jsx, css} from '@emotion/core';
import Downshift from 'downshift';
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  itemToString
} from '../shared/styled.components';
import Axios from './axios';
import axiosFetch from 'axios';
import RenderPackages, {Packages} from '../RenderPackages';
import {search as SearchAPI, suggestions as SuggestionAPI} from '../shared/api';

const npmEndpint = 'https://api.npms.io/v2/search/suggestions';

class AxiosExample extends React.Component {
  state = {
    packages: Packages.Initial
  }

  wrapList = (packages) => {
    const wrapperList = packages.length === 0
      ? Packages.Empty
      : Packages.Success(packages);

    return this.setState(state => ({
      ...state,
      packages: wrapperList }));
  }

  fetchItems = selection => {
    if (selection === '') return this.setState(state => ({...state, items: []}));
    console.log(SearchAPI);
    this.setState(state => ({...state, packages: Packages.Pending}));
    axiosFetch(`https://api.npms.io/v2/search?q=${selection}`)
      .then(res =>  this.wrapList(res.data.results))
      .catch(err => this.setState({ packages: Packages.Failure(err) }));
  }
  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50
        })}
      >
        <Downshift
          clearSelection={() => this.wrapList([])}
          onChange={selection =>
            selection === null
              ? this.wrapList([])
              : this.fetchItems(selection.name)
          }
          itemToString={item => (item ? item.name : '')}
        >
          {({
            inputValue,
            getInputProps,
            getLabelProps,
            getMenuProps,
            getItemProps,
            getToggleButtonProps,
            selectedItem,
            highlightedIndex,
            isOpen,
            onChange,
            clearSelection
          }) => {
            console.log(itemToString);
            return (
              <div {...css({width: 250, margin: 'auto', position: 'relative'})}>
                <Label {...getLabelProps()}>NPM Registry</Label>
                <div {...css({position: 'relative'})}>
                  <Input
                    {...getInputProps({
                      isOpen,
                      placeholder: 'Search packages'
                    })}
                  />
                  {selectedItem ? (
                    <ControllerButton
                      onClick={clearSelection}
                      aria-label="clear selection"
                    >
                      <XIcon />
                    </ControllerButton>
                  ) : (
                    <ControllerButton {...getToggleButtonProps()}>
                      <ArrowIcon isOpen={isOpen} />
                    </ControllerButton>
                  )}
                </div>
                <Menu {...getMenuProps({isOpen})}>
                  {(() => {
                    if (!isOpen) {
                      return null;
                    }

                    if (!inputValue) {
                      return (
                        <Item disabled>You have to enter a search query</Item>
                      );
                    }

                    return (
                      <Axios url={SuggestionAPI} params={{q: inputValue}}
                      >
                        {(response = {}) => {
                          console.log(response);
                          if (response.loading) {
                            return <Item disabled>Loading...</Item>;
                          }

                          if (response.error) {
                            return (
                              <Item disabled>Error! ${response.error}</Item>
                            );
                          }

                          if (!response.data) {
                            return <Item disabled>No repositories found</Item>;
                          }

                          return response.data
                            .filter((x, i) => i < 9)
                            .map(({id, package: item}, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <Item
                                    {...getItemProps({
                                      item,
                                      index,
                                      isActive: highlightedIndex === index,
                                      isSelected: selectedItem === item
                                    })}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between'
                                    }}
                                  >
                                    <span>
                                      <b>{item.name}</b> <br />{' '}
                                      {item.description}
                                    </span>
                                    <span>{item.version}</span>
                                  </Item>
                                </React.Fragment>
                              );
                            });
                        }}
                      </Axios>
                    );
                  })()}
                </Menu>
              </div>
            );
          }}
        </Downshift>
        <RenderPackages packages={this.state.packages} />
      </div>
    );
  }
}

export default AxiosExample;
