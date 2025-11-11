// Students.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/students");
        setStudents(data);
      } catch (err) {
        setError("Failed to load students");
      }
    };
    fetchStudents();
  }, []);

  const viewProfile = (s) => handleOpenProfile(s);

  const handleOpenProfile = async (student) => {
    console.log(student);
    try {
      setLoadingProfile(true);
      const id = student.student_id;
      // match backend field
      const { data } = await axios.get(
        `http://localhost:5000/api/students/${id}`
      );
      // console.log(data);
      setSelected(data);
      // setSelected({
      //   student_id: student.student_id,
      //   name: student.name,
      //   room_id: student.room_id,
      //   state: student.state,
      //   course: student.course,
      //   contact_no: student.contact_no,
      //   city: student.city,
      // });
      setOpen(true);
    } catch (err) {
      console.error("Failed to load student", err);
      // fallback to row data if API fails

      setOpen(true);
    } finally {
      setLoadingProfile(false);
    }
  };

  const closeProfile = () => {
    setOpen(false);
    setSelected(null);
  };

  if (error) return <p>{error}</p>;
  if (!students.length) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4" style={{ width: "900px" }}>
        <div className="bg-slate-200  border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-white/60">
            <h2
              className="text-base font-semibold text-slate-900"
              style={{
                fontStyle: "inherit",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Students
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left ">
              <thead className="bg-slate-200 ">
                <tr>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Student
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Room
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Course
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    State
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 ">
                {students.map((s) => (
                  <tr
                    key={s.student_id || s.room_id + "-" + s.name}
                    className="hover:bg-white/60 border "
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold shrink-0">
                          {(s.name || "?").slice(0, 1).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-slate-900 font-medium truncate">
                            {s.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-slate-700">
                        Room <span className="font-medium">{s.room_id}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {s.course ? (
                        <span className="text-slate-700">
                          <span className="font-medium">{s.course}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border " +
                          (s.state === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : s.state === "On Leave"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : s.state === "Inactive"
                            ? "bg-slate-100 text-slate-700 border-slate-200"
                            : "bg-sky-50 text-sky-700 border-sky-200")
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={
                            "h-1.5 w-1.5 rounded-full " +
                            (s.state === "Active"
                              ? "bg-emerald-500"
                              : s.state === "On Leave"
                              ? "bg-amber-500"
                              : s.state === "Inactive"
                              ? "bg-slate-400"
                              : "bg-sky-500")
                          }
                        />
                        {s.state || "Unknown"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
                          onClick={() => viewProfile(s)}
                        >
                          View profile
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && selected && (
        <ProfileModal
          data={{ ...selected, loading: loadingProfile }}
          onClose={closeProfile}
        />
      )}
    </div>
  );
}

export function ProfileModal({ data, onClose }) {
  console.log(data);
  const dialogRef = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    setTimeout(
      () => dialogRef.current?.querySelector("[data-autofocus]")?.focus(),
      0
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={closeOnBackdrop}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        aria-describedby="profile-desc"
        className="w-full px-2  max-w-lg h-auto max-h-[80vh] overflow-y-auto rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
      >
        <header className="flex items-start justify-between p-1 border-b">
          <div>
            <h2
              id="profile-title"
              className="text-xl font-semibold text-slate-900"
            >
              Student profile
            </h2>
            <p id="profile-desc" className="text-sm text-slate-600">
              Contact and hostel details
            </p>
          </div>
          <button
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
            onClick={onClose}
            aria-label="Close"
            data-autofocus
          >
            ✕
          </button>
        </header>

        <div className="p-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold">
              {data.name?.[0] || "?"}
            </div>
            <div>
              <div className="text-lg font-medium text-slate-900">
                {data.name}
              </div>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Phone
              </dt>
              <dd className="text-slate-800">{data.contact_no || "_"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Course
              </dt>
              <dd className="text-slate-800">{data.course || "—"}</dd>
            </div>
            {/* <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Address
              </dt>
              <dd className="text-slate-800">{data.address || "—"}</dd>
            </div> */}
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                City
              </dt>
              <dd className="text-slate-800">{data.city || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                State
              </dt>
              <dd className="text-slate-800">{data.state || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Room No:
              </dt>
              <dd className="text-slate-800">{data.room_id || "—"}</dd>
            </div>
            {/* <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Guardian
              </dt>
              <dd className="text-slate-800">{data.guardian || "—"}</dd>
            </div> */}
          </dl>
        </div>

        <footer className="flex justify-end gap-3 p-2 border-t">
          <button
            className="rounded-md px-4 py-2 text-slate-700 hover:bg-slate-100"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}

export default Students;
