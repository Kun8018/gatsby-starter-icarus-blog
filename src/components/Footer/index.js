import React from 'react';

import ExternalLink from '../ExternalLink';
import { config } from '../../../data';

import './index.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 text-center">
          <p className="architecture">
            Build with&nbsp;
            <ExternalLink href="https://www.gatsbyjs.org/" title="GatsbyJS" />
            &nbsp;and&nbsp;
            <ExternalLink href="https://reactjs.org/" title={`React ${React.version}`} />
            .&nbsp;Hosted on&nbsp;
            <ExternalLink href="https://www.netlify.com/" title="Netlify" />
            <br />
            The code is open source and available at&nbsp;
            <ExternalLink
              href="https://github.com/Kun8018/gatsby-starter-icarus-blog"
              title="kun/gatsby-starter-icarus-blog"
            />
          </p>
          <p className="copyright">
            Copyright&nbsp;
            <ExternalLink href="https://kunzhang.me/" title="&copy;Kun" />
            &nbsp;
            {config.title}
            {new Date().getFullYear()}
            &nbsp;Theme by Kun Zhang
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
