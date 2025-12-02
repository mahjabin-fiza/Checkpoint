import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserPlanDetails from "./UserPlanDetails"; // import your popup component

export default function SavedTab() {
  const { currentUser } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // track which plan's details are open

  const loadPlans = async () => {
    setLoading(true);
    try {
      if (!currentUser) return setPlans([]);
      const token = await currentUser.getIdToken();
      const res = await fetch("http://localhost:5001/api/get-plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.ok) setPlans(json.plans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, [currentUser]);

  const handleDelete = async (planId) => {
  if (!window.confirm("Are you sure you want to delete this plan?")) return;

  try {
    if (!currentUser) throw new Error("Not signed in");
    const token = await currentUser.getIdToken();

    const res = await fetch(`http://localhost:5001/api/delete-plan/${encodeURIComponent(planId)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // helpful debug logs
    if (!res.ok) {
      const txt = await res.text().catch(() => "[no body]");
      console.error("DELETE /api/delete-plan failed", res.status, txt);
      alert("Error deleting plan. See console for details.");
      return;
    }

    const json = await res.json();
    if (json.ok) {
      // remove from local state
      setPlans((prev) => prev.filter((p) => p.id !== planId));
      alert("Plan deleted.");
    } else {
      console.error("delete returned ok:false", json);
      alert("Error deleting plan: " + (json.error || "server error"));
    }
  } catch (err) {
    console.error("DELETE ERROR:", err);
    alert("Could not delete plan. See console for details.");
  }
};


  if (!currentUser)
    return <div className="p-8 text-center">Sign in to see saved plans.</div>;
  if (loading)
    return <div className="p-8 text-center">Loading saved plans...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Saved Budget Plans</h1>

      <div className="w-full h-[400px] p-4 rounded overflow-y-auto">
        <div className="flex flex-wrap gap-4">
          {plans.length === 0 ? (
            <p className="text-gray-500">You have no saved plans yet.</p>
          ) : (
            plans.map((plan) => {
              const daysLeft = plan.start
                ? Math.max(
                    0,
                    Math.ceil(
                      (new Date(plan.start) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                  )
                : null;

              return (
                <div
                  key={plan.id}
                  className="w-44 bg-gray-100 rounded-lg shadow p-4 flex flex-col justify-between hover:scale-105 transition duration-300 ease-in-out relative"
                >
                  {/* Details button at top left */}
                  <button
                    className="absolute top-2 left-2 text-blue-600 text-xs underline"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    Details
                  </button>

                  {/* Card content */}
                  <div className="mt-4">
                    <p className="font-semibold text-sm break-words">{plan.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {plan.from} → {plan.to}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Saved: {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : "—"}
                    </p>
                    {daysLeft !== null && (
                      <p className="text-xs text-gray-700 mt-1">{daysLeft} days left</p>
                    )}
                  </div>

                  {/* Delete button at bottom right */}
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-red-600 text-xs underline"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Show popup if a plan is selected */}
      {selectedPlan && (
        <UserPlanDetails
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}



