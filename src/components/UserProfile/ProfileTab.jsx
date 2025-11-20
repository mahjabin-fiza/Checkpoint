import React from 'react';
import Button2 from '../Button2';
import Button3 from '../Button3';
import { useState } from 'react';

function ProfileTab() {
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'fiza',
    email: 'email@gmail.com',
    phone: '019020101',
    location: 'Location',
  });
  const [backupInfo, setBackupInfo] = useState({});

  const handleEdit = () => {
    setBackupInfo(userInfo);
    setEdit(true);
  };

  const handleCancel = () => {
    setUserInfo(backupInfo);
    setEdit(false);
  };

  const handleDone = () => {
    setEdit(false);
  };

  return (
    <>
      <div class="w-full h-full flex flex-col bg-white p-10 justify-center">
        <div class="max-w-[350px] min-w-[250px] max-h-[115px] min-h-[80px] mb-4">
          <div className="flex w-full h-full gap-2 items-center">
            <div className="w-1/3">
              <div className="w-full aspect-square rounded-full bg-blue-200"></div>
            </div>
            <div className="flex flex-col w-2/3 px-2">
              <div className="">{userInfo.name}</div>
              <div className="font-bold">{userInfo.email}</div>
            </div>
          </div>
        </div>

        <div class="w-full h-[70%] flex flex-col justify-between">
          <div className="flex flex-col px-10 py-6 gap-2 bg-gray-100 rounded-lg">
            <div className="flex gap-4 items-center">
              <div>Name :</div>
              {edit ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className={`w-full max-w-[300px] px-4 py-2 border-0 border-b-2 border-black bg-white rounded-t-lg focus:outline-none focus:border-[#A88B68] focus:ring-0`}
                />
              ) : (
                <div
                  className={`px-4 py-2 border-0 border-b-2 border-transparent`}
                >
                  {userInfo.name}
                </div>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <div>Email : </div>
              {edit ? (
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className={`w-full max-w-[300px] px-4 py-2 border-0 border-b-2 border-black bg-white rounded-t-lg focus:outline-none focus:border-[#A88B68] focus:ring-0`}
                />
              ) : (
                <div
                  className={`px-4 py-2 border-0 border-b-2 border-transparent`}
                >
                  {userInfo.email}
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <div>Phone: </div>
              {edit ? (
                <input
                  type="text"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className={`w-full max-w-[300px] px-4 py-2 border-0 border-b-2 border-black bg-white rounded-t-lg focus:outline-none focus:border-[#A88B68] focus:ring-0`}
                />
              ) : (
                <div
                  className={`px-4 py-2 border-0 border-b-2 border-transparent`}
                >
                  {userInfo.phone}
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <div>Location: </div>
              {edit ? (
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, location: e.target.value })
                  }
                  className={`w-full max-w-[285px] px-4 py-2 border-0 border-b-2 border-black bg-white rounded-t-lg focus:outline-none focus:border-[#A88B68] focus:ring-0`}
                />
              ) : (
                <div
                  className={`px-4 py-2 border-0 border-b-2 border-transparent`}
                >
                  {userInfo.location}
                </div>
              )}
            </div>
          </div>
          <div class="flex justify-end gap-3">
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
    </>
  );
}

export default ProfileTab;
