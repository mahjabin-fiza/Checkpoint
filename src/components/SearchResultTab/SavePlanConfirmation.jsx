import React, { useState } from 'react';
import Button2 from '../Button2';

const SavePlanConfirmation = ({ isOpen, onClose, onSave, existingPlans = [], currentPlan }) => {
  const [step, setStep] = useState('choose'); // 'choose' | 'new' | 'update'
  const [tripTitle, setTripTitle] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [error, setError] = useState('');
  const plans = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Plan ${i + 1}`,
    days: '10 days left',
  }));

  if (!isOpen) return null;

  const handleSave = () => {
    if (step === 'new' && !tripTitle.trim()) {
      setError('Please enter a trip title');
      return;
    }

    if (step === 'new') {
      onSave({ ...currentPlan, title: tripTitle, id: `plan_${Date.now()}` });
    } else if (step === 'update' && selectedPlanId) {
      onSave({ ...currentPlan, updatePlanId: selectedPlanId });
    }

    setTripTitle('');
    setSelectedPlanId(null);
    setError('');
    setStep('choose');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="">
        {step === 'choose' && (
          <>
            <div className="w-[420px] bg-white px-3 p-1 rounded-lg shadow-lg">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setStep('choose');
                    setTripTitle('');
                    setSelectedPlanId(null);
                    onClose();
                  }}
                  className="text-xs hover:font-bold py-1"
                >
                  ✕
                </button>
              </div>
              <div className="bg-white flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-center">Save Plan</h2>
                </div>
                <div>
                  <p className="px-6 py-3 text-center font-semibold">
                    Do you want to create a new plan or update an existing one?
                  </p>
                </div>
                <div>
                  <div className="flex justify-between px-5 mb-4">
                    <div className="w-[130px]">
                      <Button2 text="New" onClick={() => setStep('new')} />
                    </div>
                    <div className="w-[130px]">
                      <Button2 text="Update" onClick={() => setStep('update')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 'new' && (
          <>
            <div className="w-[420px] bg-white px-3 p-1 rounded-lg shadow-lg">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setStep('choose');
                    setTripTitle('');
                    setSelectedPlanId(null);
                    onClose();
                  }}
                  className="text-xs hover:font-bold py-1"
                >
                  ✕
                </button>
              </div>
              <div className="bg-white flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-center">Create New Plan</h2>
                </div>
                <div className="flex flex-col px-6">
                  <div className="flex justify-between p-1">
                    <div className="font-bold">Title:</div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                  </div>
                  <div className="text-center font-semibold">
                    <input
                      type="text"
                      placeholder="Enter a trip title"
                      value={tripTitle}
                      onChange={(e) => setTripTitle(e.target.value)}
                      className="w-full p-2 border rounded mb-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between px-5 mb-4">
                  <div className="w-[130px]">
                    <Button2 text="Back" onClick={() => setStep('choose')} />
                  </div>
                  <div className="w-[130px]">
                    <Button2 text="Save" onClick={handleSave} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 'update' && (
          <>
            <div className="w-[640px] bg-white px-3 p-1 rounded-lg shadow-lg">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setStep('choose');
                    setTripTitle('');
                    setSelectedPlanId(null);
                    onClose();
                  }}
                  className="text-xs hover:font-bold py-1"
                >
                  ✕
                </button>
              </div>
              <div className="bg-white flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-center">Update Existing Plan</h2>
                </div>
                <div className="h-[320px] px-5">
                  <div className="w-full h-[320px] rounded overflow-y-auto">
                    <div className="flex flex-wrap gap-4">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className="w-44 h-24 bg-gray-100 flex-shrink-0 rounded-lg shadow p-3 flex flex-col justify-between scale-100 hover:scale-105 transition duration-300 ease-in-out"
                        >
                          <div className="font-semibold text-sm break-words">{plan.title}</div>
                          <div className="text-xs text-gray-500">{plan.days}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* {existingPlans.length === 0 ? (
                    <p>No saved plans available to update.</p>
                  ) : (
                    <select
                      value={selectedPlanId || ''}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full p-2 border rounded mb-4 focus:outline-none"
                    >
                      <option value="">Select a plan</option>
                      {existingPlans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  )} */}
                </div>

                <div className="flex justify-between px-5 mb-4">
                  <div className="w-[130px]">
                    <Button2 text="Back" onClick={() => setStep('choose')} />
                  </div>
                  <div className="w-[130px]">
                    <Button2 text="Save" onClick={handleSave} disabled={!selectedPlanId} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavePlanConfirmation;
