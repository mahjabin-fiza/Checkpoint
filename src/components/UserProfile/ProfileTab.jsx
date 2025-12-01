import React, { useState, useEffect } from "react";
import Button2 from "../Button2";
import Button3 from "../Button3";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function ProfileTab() {
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    location: "",
  });
  const [backupInfo, setBackupInfo] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        setUserInfo({
          name: data.name || "",
          email: data.email || currentUser.email,
          location: data.location || "",
        });
      }
    };

    loadUserData();
  }, []);

  const handleEdit = () => {
    setBackupInfo(userInfo);
    setEdit(true);
  };

  const handleCancel = () => {
    setUserInfo(backupInfo);
    setEdit(false);
  };

  const handleDone = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userDocRef = doc(db, "users", currentUser.uid);

    try {
      await updateDoc(userDocRef, {
        name: userInfo.name,
        location: userInfo.location,
        email: userInfo.email,
      });

      // Update localStorage for header
      localStorage.setItem("user", JSON.stringify(userInfo));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }

    setEdit(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-10 justify-center">
      {/* Top section: avatar + name/email */}
      <div className="max-w-[350px] min-w-[250px] max-h-[115px] min-h-[80px] mb-4">
        <div className="flex w-full h-full gap-2 items-center">
          <div className="w-1/3">
            <div className="w-full aspect-square rounded-full bg-blue-200"></div>
          </div>
          <div className="flex flex-col w-2/3 px-2">
            <div>{userInfo.name}</div>
            <div className="font-bold">{userInfo.email}</div>
          </div>
        </div>
      </div>

      {/* Main profile fields */}
      <div className="w-full h-[70%] flex flex-col justify-between">
        <div className="flex flex-col px-10 py-6 gap-2 bg-gray-100 rounded-lg">

          {/* Name */}
          <div className="flex gap-4 items-center">
            <div>Name:</div>
            {edit ? (
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="w-full max-w-[300px] px-4 py-2 border-b-2 border-black bg-white focus:outline-none focus:border-[#A88B68]"
              />
            ) : (
              <div className="px-4 py-2">{userInfo.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="flex gap-4 items-center">
            <div>Email:</div>
            {edit ? (
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="w-full max-w-[300px] px-4 py-2 border-b-2 border-black bg-white focus:outline-none focus:border-[#A88B68]"
              />
            ) : (
              <div className="px-4 py-2">{userInfo.email}</div>
            )}
          </div>

          {/* Location */}
          <div className="flex gap-4 items-center">
            <div>Location:</div>
            {edit ? (
              <input
                type="text"
                value={userInfo.location}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, location: e.target.value })
                }
                className="w-full max-w-[285px] px-4 py-2 border-b-2 border-black bg-white focus:outline-none focus:border-[#A88B68]"
              />
            ) : (
              <div className="px-4 py-2">{userInfo.location}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {edit ? (
            <>
              <div className="w-[100px]">
                <Button3 text="Cancel" onClick={handleCancel} />
              </div>
              <div className="w-[100px]">
                <Button2 text="Done" onClick={handleDone} />
              </div>
            </>
          ) : (
            <div className="w-[100px]">
              <Button2 text="Edit" onClick={handleEdit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
