import React from "react";
import { UserAgentApplication } from "msal";
import classNames from "classnames";
import makeAnimated from 'react-select/animated';

import FormAsyncSelect, { FormAsyncSelectProps } from "./form-async-select";
import * as GraphService from '../../../services/microsoft-graph-service';

type SearchType = 'user' | 'group' | 'user-and-group';
type AdType = 'user' | 'group';
export interface FormAdPeoplePickerProps extends Omit<FormAsyncSelectProps, 'searchPromise'> {
  userAgent: UserAgentApplication
  searchType: 'user' | 'group' | 'user-and-group'
}

export interface AdSearchResult {
  identifier: string,
  displayName: string,
  type: AdType
}

const FormAdPeoplePicker: React.FC<FormAdPeoplePickerProps> = (props) => {

  const { className, searchType, userAgent, ...rest } = props;

  const classes = classNames({
    'form-ad-people-picker-select': true,
    [className!]: className !== undefined
  });

  async function searchAzureAd(inputValue: any) {
    var searchVal = inputValue.replace(/'/g, "''");

    let mappedResults: AdSearchResult[] = [];

    switch (searchType) {
      case 'user': {
        try {
          let searchResults = await GraphService.searchForPeople(userAgent, searchVal);
          mappedResults = mapResultsToOptions(searchResults.value, 'user');
        }
        catch (error) {
          console.log(error); //eslint-disable-line no-console
        }
        break;
      }
      case 'group': {
        try {
          let searchResults = await GraphService.searchForGroups(userAgent, searchVal);
          mappedResults = mapResultsToOptions(searchResults.value, 'group');
        }
        catch (error) {
          console.log(error); //eslint-disable-line no-console
        }
        break;
      }
      case 'user-and-group': {
        try {
          let searchResults = await Promise.all([GraphService.searchForPeople(userAgent, searchVal), GraphService.searchForGroups(userAgent, searchVal)]);
          mappedResults = mapResultsToOptions(searchResults[0].value, 'user').concat(mapResultsToOptions(searchResults[1].value, 'group'));
        }
        catch (error) {
          console.log(error); //eslint-disable-line no-console
        }
        break;
      }
      default:
        break;
    }

    return mappedResults;
  }

  const mapResultsToOptions = (results: any[], type: SearchType) => {

    let mappedResults: AdSearchResult[] = [];

    if (type === 'user') {
      results.forEach((result: any) => {
        const mappedResult: AdSearchResult = {
          identifier: result.mail,
          displayName: result.displayName,
          type: 'user'
        };
        mappedResults.push(mappedResult);
      });
    }
    if (type === 'group') {
      results.forEach((result: any) => {
        const mappedResult: AdSearchResult = {
          identifier: result.id,
          displayName: result.displayName,
          type: 'group'
        };
        mappedResults.push(mappedResult);
      });
    }

    return mappedResults;
  }

  const components = makeAnimated();
  components.DropdownIndicator = null;

  return (
    <FormAsyncSelect
      isMulti
      components={components}
      className={classes}
      placeholder='Search for people...'
      getOptionLabel={(principal: any) => principal.displayName || principal.mail || principal.identifier}
      getOptionValue={(principal: any) => principal.identifier}
      searchPromise={searchAzureAd}
      {...rest}
    />
  );
}

export default FormAdPeoplePicker;