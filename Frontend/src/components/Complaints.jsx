import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ studentID: "", description: "" });

  // NEW: dropdown state
  const [openMenuId, setOpenMenuId] = useState(null);
  const rootRef = useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const fetchComplaints = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/complaints");
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/complaints", form);
      close();
      setForm({ studentID: "", description: "" });
      await fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  // NEW: close dropdown on outside click and Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenuId(null);
    const onDocClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpenMenuId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  // NEW: update status handler
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/complaints/${id}`, {
        status: newStatus,
      });
      setOpenMenuId(null);
      await fetchComplaints();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div ref={rootRef}>
      <div>
        <div className="row w-250">
          <div className="col-10 text-center text-2xl rounded-2xl bg-orange-50">
            Complaints
          </div>
          <div className="col-2 ">
            <button
              type="button"
              className="btn btn-success rounded-2xl"
              onClick={open}
            >
              Add new
            </button>
          </div>
        </div>
      </div>
      <hr />

      <div className="grid gap-4 sm:grid-cols-2 ">
        {complaints.map(
          ({ Complaint_id, student_name, description, status }) => (
            <article
              key={Complaint_id}
              className="bg-orange-100 border border-slate-200 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {Complaint_id}
                  </p>
                </div>
                <span
                  className={
                    "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium " +
                    (status === "Open"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : status === "In Progress"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : status === "Resolved"
                      ? "bg-sky-50 text-sky-700 border border-sky-200"
                      : "bg-slate-50 text-slate-700 border border-slate-200")
                  }
                >
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (status === "Open"
                        ? "bg-emerald-500"
                        : status === "In Progress"
                        ? "bg-amber-500"
                        : status === "Resolved"
                        ? "bg-sky-500"
                        : "bg-slate-400")
                    }
                  />
                  {status}
                </span>
              </div>

              <div className="mt-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 text-xl">Student Name:</span>
                  <span className="text-slate-900 italic font-bold">
                    {student_name}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-slate-700 line-clamp-3">{description}</p>

              <div className="mt-4 flex items-center justify-between">
                <button className="text-slate-600 hover:text-slate-900 text-sm underline underline-offset-4">
                  View details
                </button>

                {/* Update dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 inline-flex items-center gap-1"
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === Complaint_id}
                    aria-controls={`update-menu-${Complaint_id}`}
                    onClick={() =>
                      setOpenMenuId((prev) =>
                        prev === Complaint_id ? null : Complaint_id
                      )
                    }
                  >
                    Update
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        d="M5.5 7.5L10 12l4.5-4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>

                  {openMenuId === Complaint_id && (
                    <div
                      id={`update-menu-${Complaint_id}`}
                      role="menu"
                      className="absolute right-0 mt-2 w-44 rounded-md border border-slate-200 bg-white shadow-lg"
                    >
                      <button
                        role="menuitem"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                        onClick={() =>
                          handleUpdateStatus(Complaint_id, "Resolved")
                        }
                      >
                        Resolved
                      </button>
                      <button
                        role="menuitem"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                        onClick={() =>
                          handleUpdateStatus(Complaint_id, "In-pending")
                        }
                      >
                        In‑pending
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        )}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-complaint-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 1050,
          }}
          onClick={close}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              width: "100%",
              maxWidth: 520,
              padding: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 id="add-complaint-title" style={{ margin: 0 }}>
                Add Complaint
              </h3>
              <button
                onClick={close}
                aria-label="Close"
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "grid", gap: 12, marginTop: 12 }}
            >
              <label style={{ display: "grid", gap: 6 }}>
                <span>studentID</span>
                <input
                  name="studentID"
                  value={form.studentID}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span>Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="form-control"
                />
              </label>

              <div
                style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={close}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaints;
