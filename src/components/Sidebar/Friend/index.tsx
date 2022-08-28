import React from 'react';

import ExternalLink from '../../ExternalLink';

import { config } from '../../../../data';

import './index.scss';

const { friends = [] } = config;

const Friend: React.FC = () => (
  <div className="friend">
    <p>链接</p>
    {friends.map((friend: Record<string, any>) => (
      <ExternalLink href={friend.href} title={friend.title} key={friend.title} rel="noopener" />
    ))}
  </div>
);

export default Friend;
