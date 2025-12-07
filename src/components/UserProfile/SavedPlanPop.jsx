import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function SavedPlanPop({ onClose }) {
  const { currentUser } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD PLANS
  useEffect(() => {
    const loadPlans = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const token = await currentUser.getIdToken();
        if (!token) throw new Error('No ID token found for current user');

        const res = await fetch('http://localhost:5001/api/get-plans', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();

        if (!json.ok) {
          console.error('Server error:', json.error);
          alert('Failed to load saved plans: ' + json.error);
          setLoading(false);
          return;
        }

        setPlans(json.plans);
      } catch (err) {
        console.error('LOAD PLANS ERROR:', err);
        alert('Error loading saved plans. Make sure you are logged in.');
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [currentUser]);

  // DELETE PLAN
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this trip plan permanently?')) return;

    try {
      const token = await currentUser.getIdToken();

      const res = await fetch(`/api/delete-plan/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (json.ok) {
        setPlans((prev) => prev.filter((p) => p.id !== id));
        alert('Plan deleted.');
      } else {
        alert('Delete failed.');
      }
    } catch (err) {
      console.error('DELETE ERROR:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[65%] h-[620px] p-4 rounded shadow-lg flex flex-col">
        <h1 className="text-xl font-bold text-center">Saved Plans</h1>

        {loading ? (
          <div className="flex items-center justify-center flex-1">Loading...</div>
        ) : plans.length === 0 ? (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            No saved plans found.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mt-4">
            {plans.map((p) => (
              <div
                key={p.id}
                className="p-3 mb-3 bg-gray-100 border rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm">
                    {p.from} → {p.to}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
                </div>

                <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedPlanPop;
