import React from 'react';
import { connect } from 'react-redux';
import './Alert.scss';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className="alert-container">
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      <p className="alert-icon"><i class="fas fa-exclamation-circle fa-3x"></i></p>
      <p className="alert-msg">{alert.msg}</p>
    </div>
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
