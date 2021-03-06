// This is the EntryList component which will render out multiple Entry components

import React, { Component } from 'react';
import Entry from './Entry';

import Style from 'style-it';

class EntryList extends Component {
  render() {
    // map through all the entries and return an entry item for each one
    let entryNodes = this.props.data.map(entry => {
      return (
        <Entry 
          time={ entry.time }
          uniqueID={ entry['_id'] } 
          onEntryDelete={ this.props.onEntryDelete }
          onEntryUpdate={ this.props.onEntryUpdate }
          meal={ entry.meal }
          value={ entry.value } 
          key={ entry['_id'] } />
      )
    })
    return (
      <Style>
        {`
          .container {
            border: 2px solid #fff;
            border-radius: .5em;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .completeDay {
            align-self: flex-end;
            margin-top: 1em;
            background-color: #68D286;
            border: none;
            padding: .5em 1em;
            font-size: .8em;
            text-transform: uppercase;
            color: white;
            cursor: pointer;
            margin-bottom: 1em;
            margin-right: 1em;
          }
        `}
        <div className="container">
          { entryNodes }
          {/* This is the complete day button */}
          <button 
            type="submit" 
            className="completeDay"
            onClick={ this.props.onCompleteDay }>Complete Day</button>
        </div>
      </Style>
    )
  }
}

export default EntryList;