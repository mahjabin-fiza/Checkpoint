import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import {
  updatePassword,
  deleteUser,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Button2 from '../Button2';
import Button3 from '../Button3';
import Button1 from '../Button1';

function Settings() {
  const user = auth.currentUser;

  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ---------------------
  //  CHANGE USERNAME
  // ---------------------
  const handleNameChange = async () => {
    if (!newName.trim()) return alert('Name cannot be empty');

    try {
      const userDocRef = doc(db, 'users', user.uid);

      await updateDoc(userDocRef, {
        name: newName,
      });

      // Update localStorage so header reflects new name
      const localUser = JSON.parse(localStorage.getItem('user'));
      localUser.name = newName;
      localStorage.setItem('user', JSON.stringify(localUser));

      alert('Username updated successfully!');
    } catch (err) {
      alert('Failed to update username.');
      console.error(err);
    }
  };

  // ---------------------
  //  CHANGE PASSWORD
  // ---------------------
  const handlePasswordChange = async () => {
    if (!newPassword.trim()) return alert('Password cannot be empty');
    if (newPassword !== confirmPassword) return alert('Passwords do not match');

    try {
      await updatePassword(user, newPassword);

      alert('Password updated successfully!\nYou will be logged out now.');

      // Firebase logout
      await signOut(auth);

      // Clear user localStorage
      localStorage.removeItem('user');

      // Redirect to login
      window.location.href = '/signin';
    } catch (err) {
      alert('Failed to change password.\nYou may need to re-login.');
      console.error(err);
    }
  };

  // ---------------------
  //  DELETE ACCOUNT
  // ---------------------
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirmDelete) return;

    // Ask user for password again
    const password = window.prompt('Please re-enter your password to confirm:');

    if (!password) {
      alert('Password is required to delete your account.');
      return;
    }

    try {
      // 1️⃣ Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // 2️⃣ Delete Firestore user data
      await deleteDoc(doc(db, 'users', user.uid));

      // 3️⃣ Delete Firebase Auth user
      await deleteUser(user);

      // 4️⃣ Clear session
      localStorage.removeItem('user');

      alert('Account deleted successfully.');
      window.location.href = '/';
    } catch (err) {
      console.error(err);

      if (err.code === 'auth/wrong-password') {
        alert('Wrong password. Deletion failed.');
      } else {
        alert('Failed to delete account. Try logging in again.');
      }
    }
  };

  return (
    <div className="w-full h-full bg-white p-3 justify-between">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>

        <div className="flex flex-col gap-4 px-6">
          <div className="p-5 rounded-lg flex flex-col gap-1">
            <div>
              <h3 className="font-semibold">Change Username</h3>
            </div>
            <div className="flex gap-8">
              <div>
                <input
                  type="text"
                  placeholder="New Username"
                  className="p-2 w-full max-w-md border-b-2 border-black bg-white focus:outline-none focus:border-[#A88B68]"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="w-[100px]">
                <Button1 text="Update" onClick={handleNameChange} />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg flex flex-col gap-1">
            <div>
              <h3 className="font-semibold">Change Password</h3>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="p-2 w-full max-w-md border-b-2 border-black bg-white focus:outline-none focus:border-[#A88B68]"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="p-2 w-full max-w-md border-b-2 border-black bg-white focus:outline-none focus:border-[#A88B68]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end justify-end">
                <div className="w-[100px]">
                  <Button1 text="Change" onClick={handlePasswordChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 mt-16">
          <div className="p-5 rounded-lg flex items-end">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs text-red-700">Warning: This action cannot be undone.</p>
              </div>
              <div className="w-[120px]">
                <Button3 text="Delete Account" onClick={handleDeleteAccount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
