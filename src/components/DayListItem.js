import React from 'react';

export default function DaListItem(props) {
  return (
    <li onClick={()=> props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}