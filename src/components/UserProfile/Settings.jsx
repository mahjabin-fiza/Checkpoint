import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { 
  updatePassword, 
  deleteUser, 
  signOut, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from "firebase/auth";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Button2 from "../Button2";
import Button3 from "../Button3";

function Settings() {
  const user = auth.currentUser;

  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------------------
  //  CHANGE USERNAME
  // ---------------------
  const handleNameChange = async () => {
    if (!newName.trim()) return alert("Name cannot be empty");

    try {
      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, {
        name: newName,
      });

      // Update localStorage so header reflects new name
      const localUser = JSON.parse(localStorage.getItem("user"));
      localUser.name = newName;
      localStorage.setItem("user", JSON.stringify(localUser));

      alert("Username updated successfully!");
    } catch (err) {
      alert("Failed to update username.");
      console.error(err);
    }
  };

  // ---------------------
  //  CHANGE PASSWORD
  // ---------------------
  const handlePasswordChange = async () => {
    if (!newPassword.trim()) return alert("Password cannot be empty");
    if (newPassword !== confirmPassword)
      return alert("Passwords do not match");

    try {
      await updatePassword(user, newPassword);

      alert("Password updated successfully!\nYou will be logged out now.");

      // Firebase logout
      await signOut(auth);

      // Clear user localStorage
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/signin";

    } catch (err) {
      alert("Failed to change password.\nYou may need to re-login.");
      console.error(err);
    }
  };

  // ---------------------
  //  DELETE ACCOUNT
  // ---------------------
  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account? This cannot be undone."
  );
  if (!confirmDelete) return;

  // Ask user for password again
  const password = window.prompt("Please re-enter your password to confirm:");

  if (!password) {
    alert("Password is required to delete your account.");
    return;
  }

  try {
    // 1️⃣ Reauthenticate user
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // 2️⃣ Delete Firestore user data
    await deleteDoc(doc(db, "users", user.uid));

    // 3️⃣ Delete Firebase Auth user
    await deleteUser(user);

    // 4️⃣ Clear session
    localStorage.removeItem("user");

    alert("Account deleted successfully.");
    window.location.href = "/";
  } catch (err) {
    console.error(err);

    if (err.code === "auth/wrong-password") {
      alert("Wrong password. Deletion failed.");
    } else {
      alert("Failed to delete account. Try logging in again.");
    }
  }
};


  return (
    <div className="w-full h-full bg-white p-10">
      <h2 className="text-2xl font-bold mb-5">Settings</h2>

      {/* CHANGE USERNAME */}
      <div className="mb-8 p-5 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Change Username</h3>
        <input
          type="text"
          placeholder="New Username"
          className="border p-2 rounded w-full max-w-md"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="mt-3 w-[120px]">
          <Button2 text="Update" onClick={handleNameChange} />
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="mb-8 p-5 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded w-full max-w-md"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded w-full max-w-md mt-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="mt-3 w-[150px]">
          <Button2 text="Change Password" onClick={handlePasswordChange} />
        </div>
      </div>

      {/* DELETE ACCOUNT */}
      <div className="mb-8 p-5 bg-red-100 border border-red-300 rounded-lg">
        <h3 className="font-semibold text-red-600 mb-2">Delete Account</h3>
        <p className="text-sm text-red-700">
          Warning: This action cannot be undone.
        </p>
        <div className="mt-3 w-[150px]">
          <Button3 text="Delete Account" onClick={handleDeleteAccount} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
