import React, { useState, useEffect } from 'react';
import './ManageAccount.css';

const ManageAccount = () => {
  const [selectedOption, setSelectedOption] = useState('NIC');
  const [passwordInputs, setPasswordInputs] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [inputValue, setInputValue] = useState('');
  const [showDeactivatePopup, setShowDeactivatePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alerts, setAlerts] = useState([
    { id: 1, email: 'emilywhite@gmail.com', message: '5 missed appointments' },
    { id: 2, email: 'johnsmith@gmail.com', message: '7 missed appointments' },
  ]);
  const [showAlertPopup, setShowAlertPopup] = useState(null);

  const handleDeactivateClick = () => {
    setTimeout(() => {
      setShowDeactivatePopup(true);
    }, 1); // Show deactivate popup after 1 millisecond
  };

  const handleSaveClick = () => {
    // Validation based on selectedOption
    if (selectedOption === 'NIC') {
      if (inputValue === '') {
        setErrorMessage('NIC cannot be empty.');
        return;
      }
      if (inputValue.length === 10 && inputValue[inputValue.length - 1].toLowerCase() !== 'v') {
        setErrorMessage("For NIC of length 10, the last character must be 'v'.");
        return;
      }
      if (inputValue.length === 12 && !/^\d{12}$/.test(inputValue)) {
        setErrorMessage('For NIC of length 12, all characters must be numeric.');
        return;
      }
      if (inputValue.length !== 10 && inputValue.length !== 12) {
        setErrorMessage('NIC must be either 10 or 12 characters long.');
        return;
      }
    } else if (selectedOption === 'UserName') {
      if (inputValue === '') {
        setErrorMessage('Username cannot be empty.');
        return;
      }
    } else if (selectedOption === 'Password') {
      const { currentPassword, newPassword, confirmPassword } = passwordInputs;
      if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
        setErrorMessage('Password fields cannot be empty.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('New Password and Confirm Password must match.');
        return;
      }
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
        setErrorMessage('Password must be strong (min 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character).');
        return;
      }
    }

    setErrorMessage(''); // Clear any error messages if validation passes
    setTimeout(() => {
      setShowSavePopup(true); // Show save popup after 1 millisecond
    }, 1);
  };

  useEffect(() => {
    if (showDeactivatePopup || showSavePopup) {
      const timer = setTimeout(() => {
        setShowDeactivatePopup(false);
        setShowSavePopup(false);
      }, 2000); // Hide both popups after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showDeactivatePopup, showSavePopup]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue(''); // Clear input field when changing option
    setPasswordInputs({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrorMessage(''); // Clear error message on option change
  };

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordInputs({
      ...passwordInputs,
      [name]: value,
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAlertClick = (alertId) => {
    setShowAlertPopup(alertId);
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== alertId));
      setShowAlertPopup(null);
    }, 2000); // Remove the alert after 2 seconds
  };

  return (
    <div className="manage-accounts">
      <div className="deactivate-account">
        <label>Deactivate Accounts</label>
        <input type="text" value="johnsmith@gmail.com" readOnly />
        <button className="deactivate-btn" onClick={handleDeactivateClick}>
          Deactivate
        </button>
        {showDeactivatePopup && (
          <div className="mt-4 p-4 text-black rounded shadow-md">
            Deactivated Successfully!
          </div>
        )}
      </div>

      <div className="edit-account">
        <label>Edit Accounts</label>
        <input type="text" value="emilywhite@gmail.com" readOnly />
        <div className="change">
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="NIC">Change NIC</option>
            <option value="UserName">Change User Name</option>
            <option value="Password">Change Password</option>
          </select>

          {/* Conditionally render inputs based on selectedOption */}
          {selectedOption === 'Password' ? (
            <>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordInputs.currentPassword}
                onChange={handlePasswordInputChange}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordInputs.newPassword}
                onChange={handlePasswordInputChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordInputs.confirmPassword}
                onChange={handlePasswordInputChange}
              />
            </>
          ) : (
            <input
              type="text"
              placeholder={selectedOption}
              value={inputValue}
              onChange={handleInputChange}
            />
          )}

          <button className="save-btn" onClick={handleSaveClick}>
            Save
          </button>
        </div>

        {errorMessage && (
          <div className="error-message mt-2 text-red-500">
            {errorMessage}
          </div>
        )}

        {showSavePopup && (
          <div className="mt-4 p-4 text-black rounded shadow-md">
            Saved Successfully!
          </div>
        )}
      </div>

      <div className="suspicious-activity-alerts">
        <label>Suspicious Activity Alerts</label>
        {alerts.map((alert) => (
          <div key={alert.id} className="alert">
            <span>{alert.email}</span>
            <span>{alert.message}</span>
            <button className="alert-btn" onClick={() => handleAlertClick(alert.id)}>
              Alert
            </button>
          </div>
        ))}
        {showAlertPopup && (
          <div className="mt-4 p-4 text-black rounded shadow-md">
            Alert Triggered Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
