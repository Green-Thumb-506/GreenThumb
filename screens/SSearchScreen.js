import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits} from 'react-instantsearch-dom';

export default class SSearchScreen extends React.Component {

    render() {
        return (
          <div className="ais-InstantSearch">
            <h1>Plant Search</h1>
            <InstantSearch indexName="Plants" searchClient={searchClient}>
              <div className="right-panel">
                <SearchBox />
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>
        );
      }

}
const searchClient = algoliasearch('17YYHSNIFA', '6ca37cfe1b276accf709c41aadf09417');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'


    },
});