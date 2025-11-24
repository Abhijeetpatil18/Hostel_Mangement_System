// Students.jsx
import { useEffect, useState, useRef } from "react";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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

  const addStudent = () => {
    setShowAdd(true);
  };

  if (error) return <p>{error}</p>;
  if (!students.length) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4" style={{ width: "900px" }}>
        <div className="bg-slate-200  border border-slate-700 rounded-xl shadow-sm overflow-hidden">
          <div class="container text-center">
            <div className="row align-items-start py-2">
              <div className="col-10 text-2xl">Students</div>

              <div class="col-2">
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => setShowAdd(true)}
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left border-1 ">
              <thead className="bg-slate-300 ">
                <tr>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    Student
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    Room
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    Course
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    State
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 ">
                {students.map((s) => (
                  <tr
                    key={s.student_id || s.room_id + "-" + s.name}
                    className="hover:bg-black/10 border-1 "
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
                        <span className="font-medium">{s.room_id}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {s.course ? (
                        <span className="text-black">
                          <span className="font-medium">{s.course}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-md font-medium border " +
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
                          className="text-sm text-black hover:text-slate-900 underline underline-offset-4"
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

      {showAdd && (
        <AddStudentModal
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            // call your API here
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}
export function AddStudentModal({ onClose, onSubmit }) {
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    course: "",
    city: "",
    state: "",
    room_id: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/students",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Added successfully`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // optional: use response data (e.g., created student)
      onSubmit?.(res.data);

      // close modal
      onClose();
    } catch (err) {
      console.error("Error saving student", err);
      // TODO: show error message in UI if you want
    }
    setShowAdd(false);
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
        aria-labelledby="add-student-title"
        aria-describedby="add-student-desc"
        className="w-full px-2 max-w-lg h-auto max-h-[80vh] overflow-y-auto rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
      >
        <header className="flex items-start justify-between p-3 border-b">
          <div>
            <h2
              id="add-student-title"
              className="text-xl font-semibold text-slate-900"
            >
              Add student
            </h2>
            <p id="add-student-desc" className="text-sm text-black">
              Enter basic contact and hostel details
            </p>
          </div>
          <button
            className="rounded-md p-2 text-black hover:bg-slate-100"
            onClick={onClose}
            aria-label="Close"
            data-autofocus
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Student full name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                type="tel"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Contact number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Course name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Room No
              </label>
              <input
                type="text"
                name="room_id"
                value={formData.room_id}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Room number"
              />
            </div>
          </div>

          <footer className="flex justify-end gap-3 pt-2 border-t">
            <button
              type="button"
              className="rounded-md px-4 py-2 text-slate-700 hover:bg-slate-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md px-4 py-2 bg-slate-900 text-white hover:bg-slate-800"
            >
              Save
            </button>
          </footer>
        </form>
      </section>
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
            <p id="profile-desc" className="text-sm text-black">
              Contact and hostel details
            </p>
          </div>
          <button
            className="rounded-md p-2 text-black hover:bg-slate-100"
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
              <dt className="text-md uppercase tracking-wide text-slate-500">
                Phone
              </dt>
              <dd className="text-slate-800">{data.contact_no || "_"}</dd>
            </div>
            <div>
              <dt className="text-md uppercase tracking-wide text-slate-500">
                Course
              </dt>
              <dd className="text-slate-800">{data.course || "—"}</dd>
            </div>
            {/* <div className="sm:col-span-2">
              <dt className="text-md uppercase tracking-wide text-slate-500">
                Address
              </dt>
              <dd className="text-slate-800">{data.address || "—"}</dd>
            </div> */}
            <div>
              <dt className="text-md uppercase tracking-wide text-slate-500">
                City
              </dt>
              <dd className="text-slate-800">{data.city || "—"}</dd>
            </div>
            <div>
              <dt className="text-md uppercase tracking-wide text-slate-500">
                State
              </dt>
              <dd className="text-slate-800">{data.state || "—"}</dd>
            </div>
            <div>
              <dt className="text-md uppercase tracking-wide text-slate-500">
                Room No:
              </dt>
              <dd className="text-slate-800">{data.room_id || "—"}</dd>
            </div>
            {/* <div>
              <dt className="text-md uppercase tracking-wide text-slate-500">
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
