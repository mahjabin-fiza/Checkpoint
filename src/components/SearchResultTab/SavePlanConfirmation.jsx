import React, { useState, useEffect } from 'react';
import Button2 from '../Button2';
import { getAuth } from 'firebase/auth';

const SavePlanConfirmation = ({ isOpen, onClose, onSave, currentPlan }) => {
  const [step, setStep] = useState('choose');
  const [tripTitle, setTripTitle] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [error, setError] = useState('');

  const [fetchedPlans, setFetchedPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansError, setPlansError] = useState(null);

  const daysLeftText = (plan) => {
    if (!plan?.start) return '—';
    const start = new Date(plan.start);
    const now = new Date();
    const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) return `${diffDays} days left`;
    if (diffDays === 1) return `1 day left`;
    if (diffDays === 0) return `Starts today`;
    return `Started ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  };

  const fetchPlansFromServer = async () => {
    setPlansLoading(true);
    setPlansError(null);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Not signed in');
      const token = await user.getIdToken();

      const res = await fetch('http://localhost:5001/api/get-plans', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json().catch(async (err) => {
        // handle invalid/json error
        const txt = await res.text().catch(() => '');
        throw new Error('Invalid JSON response from server: ' + txt);
      });

      if (!json.ok) {
        throw new Error(json.error || 'Failed to load plans');
      }

      setFetchedPlans(json.plans || []);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
      setPlansError(err.message || String(err));
      setFetchedPlans([]);
    } finally {
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    if (step === 'update') {
      fetchPlansFromServer();
      setSelectedPlanId(null);
    }
  }, [step, isOpen]);

  if (!isOpen) {
    return null;
  }

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
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div>
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
                    <div className="flex flex-wrap">
                      {plansLoading ? (
                        <div className="p-4 text-gray-500">Loading plans...</div>
                      ) : plansError ? (
                        <div className="p-4 text-red-500">Error: {plansError}</div>
                      ) : fetchedPlans.length === 0 ? (
                        <div className="p-4 text-gray-500">No saved plans to update.</div>
                      ) : (
                        fetchedPlans.map((plan) => {
                          const isSelected = String(plan.id) === String(selectedPlanId);
                          return (
                            <div className="p-2">
                              <button
                                key={plan.id}
                                type="button"
                                onClick={() => setSelectedPlanId(plan.id)}
                                className={`w-44 h-28 bg-white border rounded-lg shadow p-4 flex flex-col justify-between transition transform scale-100 hover:scale-105 focus:outline-none ${
                                  isSelected
                                    ? 'scale-105 ring-2 ring-gray-600 border-blue-200'
                                    : 'border-gray-200'
                                }`}
                              >
                                <div className="w-full items-start">
                                  <div className="font-semibold text-sm break-words text-left">
                                    {plan.title || 'Untitled'}
                                  </div>
                                </div>

                                <div className="w-full flex justify-between items-start">
                                  <div className="text-xs text-gray-800 text-left">
                                    {plan.from ? `${plan.to || '—'}` : ''}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    ({daysLeftText(plan)})
                                  </div>
                                </div>
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
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
