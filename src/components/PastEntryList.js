import React from 'react';
import PastEntry from './PastEntry';

import Style from 'style-it';

const PastEntryList = ({ entries }) => {
    let pastEntryNodes = entries.map(entry => {
      return (
        <PastEntry 
          date={ entry.date }
          uniqueID={ entry['_id'] } 
          value={ entry.value } 
          key={ entry['_id'] } />
      )
    })
    return (
        <Style>
            {`
                .pastEntryList {
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    border: 2px solid #fff;
                }
            `}
            <ul className="pastEntryList">
                { pastEntryNodes }
            </ul>
        </Style>
    )
}

export default PastEntryList;