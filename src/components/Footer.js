import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InfoIcon from "@material-ui/icons/Info";

import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__socialLinks">
        <LinkedInIcon
          className="footer__socialLink"
          style={{ fontSize: 50 }}
          onClick={() =>
            (window.location.href =
              "https://www.linkedin.com/in/mohammedothman112/")
          }
        />
        <GitHubIcon
          className="footer__socialLink"
          style={{ fontSize: 45 }}
          onClick={() =>
            (window.location.href = "https://github.com/mohammedothman7")
          }
        />
        <InfoIcon
          className="footer__socialLink"
          style={{ fontSize: 50 }}
          onClick={() =>
            (window.location.href =
              "https://websitepolicies.com/policies/view/mDK8E19B")
          }
        />
      </div>

      <ul className="footer__links">
        <li className="footer__linkWrapper">Audio and Subtitles</li>
        <li className="footer__linkWrapper">Audio Description</li>
        <li className="footer__linkWrapper">Help Center</li>
        <li className="footer__linkWrapper">Media Center</li>
        <li className="footer__linkWrapper">Investor Relations</li>
        <li className="footer__linkWrapper">Jobs</li>
        <li className="footer__linkWrapper">Terms of Use</li>
        <li className="footer__linkWrapper">Privacy</li>
        <li className="footer__linkWrapper">Legal Notices</li>
        <li className="footer__linkWrapper">Cookie Preferences</li>
        <li className="footer__linkWrapper">Corporate Information</li>
        <li className="footer__linkWrapper">Contact Us</li>
      </ul>

      <div className="footer__copyright">&#169; 2021 Mohammed Nedal Othman</div>
    </div>
  );
}

export default Footer;
