import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTE_DASHBOARD } from './routeConstants';
import { ConnectedDashboard } from './screens/Dashboard';

function Router({ history }) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path={ROUTE_DASHBOARD}>
                    <ConnectedDashboard />
                </Route>
                <Redirect to={ROUTE_DASHBOARD} />
            </Switch>
        </ConnectedRouter>
    );
}

Router.propTypes = {
    history: PropTypes.object.isRequired,
};

Router.defaultProps = {};

export default connect(null, null)(Router);
