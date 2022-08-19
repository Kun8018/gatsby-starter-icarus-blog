import React from 'react';

type TagProps = {
  name: string;
  count?: number | string;
};

const Tag: React.FC<TagProps> = ({ name, count }) => (
  <a href={`/tag/${name}`} className="header-tag">
    {name}
    &nbsp;
    {count}
  </a>
);

export default Tag;
