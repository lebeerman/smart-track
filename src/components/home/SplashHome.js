import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class SplashHome extends React.Component {
    render() {
      return (
        <div className="splash">
          <div className="slug">
            {/* BREAK OUT TITLE COMPONENT */}
            <h1>SMART TRAK</h1>
            <p>Set your aim and hit your targets</p>
          </div>
          <Link to="/register">CREATE AN ACCOUNT</Link>
          <a href="javascript:void(0)" onClick={this.props.auth.login}>
            SIGN IN
          </a>
          <div>
            <h3>Why set goals with Smart Trak?</h3>
            <ul>
              <li>Goals guide your focus and steer behavior.</li>
              <li>Goal setting promotes self-mastery.</li>
              <li>Goals sustain momentum.</li>
            </ul>
          </div>
        </div>
      );
    }
  }
);
