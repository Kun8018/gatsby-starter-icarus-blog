import React from 'react';

import PropTypes from 'prop-types';

type ExternalLinkProps = {
  href: string;
  title: string;
  target?: string;
  className?: string;
  rel?: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, title, target, className, rel }) => (
  <a href={href} rel={rel} target={target} className={className}>
    {title}
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  target: PropTypes.string,
  className: PropTypes.string,
  rel: PropTypes.string,
};

ExternalLink.defaultProps = {
  target: '_blank',
  className: '',
  rel: 'external nofollow noopener',
};

export default ExternalLink;
