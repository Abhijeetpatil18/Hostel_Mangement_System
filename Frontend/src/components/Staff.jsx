import { useEffect, useState } from "react";
import axios from "axios";

function Staff() {
  const [Staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/Staff");
        console.log(data);
        setStaff(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div>
      <h2>Staff members</h2>
      <hr />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Staff.map(({ staff_id, name, position, contact_no, status }) => (
            <div
              key={staff_id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-slate-900">
                      {name}
                    </h2>
                    <p className="text-base font-medium text-slate-900 truncate">
                      ID : {staff_id}
                    </p>
                    <p className="text-sm text-slate-600 truncate">
                      {position}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={
                      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border " +
                      (status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : status === "Inactive"
                        ? "bg-slate-100 text-slate-700 border-slate-200"
                        : status === "On Leave"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-sky-50 text-sky-700 border-sky-200")
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={
                        "h-1.5 w-1.5 rounded-full " +
                        (status === "Active"
                          ? "bg-emerald-500"
                          : status === "Inactive"
                          ? "bg-slate-400"
                          : status === "On Leave"
                          ? "bg-amber-500"
                          : "bg-sky-500")
                      }
                    />
                    {status || "Unknown"}
                  </span>
                </div>

                {/* Body */}
                <div className="mt-3 space-y-1.5 text-sm">
                  <p className="text-slate-700">
                    Contact: <span className="font-medium">{contact_no}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
                    Details
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Staff;
