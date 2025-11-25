// fees.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiArchiveIn } from "react-icons/bi";

function fees() {
  const [fees, setfees] = useState([]);
  const [openRoom, setOpenRoom] = useState(null); // selected room for modal

  useEffect(() => {
    fetchfees();
  }, []);
  const fetchfees = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/fees");
      setfees(data);
    } catch (err) {
      console.error(err);
    }
  };
  const updateFees = async (fees_id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/fees/${fees_id}`,
        { status }
      );
      if (data.success) {
        await fetchfees();
        console.log("updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetails = (room) => setOpenRoom(room);
  const close = () => setOpenRoom(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4" style={{ width: "900px" }}>
        <div className="bg-slate-200 border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-center underline font-semibold text-slate-900">
              Fees Details
            </h2>
          </div>

          <div className="overflow-x-auto border-t-1 ">
            <table className="min-w-full table-auto text-left border-1">
              <thead className="bg-slate-300">
                <tr>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black">
                    Name
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black">
                    Amount
                  </th>

                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black text-right">
                    Status
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black text-right">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {fees.map((r) => (
                  <tr key={r.room_id} className="hover:bg-black/10 border-1 ">
                    <td className="px-4 py-3 divide-slate-300">
                      <span className="text-slate-900 font-medium">
                        {r.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-700">{r.amount}</span>
                    </td>
                    <td className="px-4 py-3">{r.status}</td>
                    <td className="px-2 py-3 divide-slate-300">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary dropdown-toggle px-2 py-1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Status
                        </button>
                        <ul className="dropdown-menu">
                          {r.status === "Paid" ? (
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => updateFees(r.fee_id, "Pending")}
                              >
                                Pending{" "}
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => updateFees(r.fee_id, "Paid")}
                              >
                                Paid
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openRoom && <RoomDetailsModal room={openRoom} onClose={close} />}
    </>
  );
}

export function RoomDetailsModal({ room, onClose }) {
  const dialogRef = useRef(null);
  const [students, setStudents] = useState([]);

  // fetch students for this room (adjust API to your backend)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/fees/${room.room_id}/students`
        );
        if (active) setStudents(data || []);
      } catch (e) {
        if (active) setStudents([]);
      }
    })();
    return () => {
      active = false;
    };
  }, [room.room_id]);

  // a11y: focus, esc to close
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

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={onBackdrop}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-title"
        aria-describedby="room-desc"
        className="w-full max-w-2xl h-auto max-h-[50vh] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
      >
        <header className="flex items-start justify-between p-5 border-b">
          <div>
            <h2
              id="room-title"
              className="text-xl font-semibold text-slate-900"
            >
              Room {room.room_number}
            </h2>
            <p id="room-desc" className="text-sm text-black">
              Capacity {room.capacity} • Status {room.status}
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

        {/* Make only the body scrollable so header/footer remain fixed */}
        <div className="px-5 py-4 overflow-y-auto max-h-[calc(50vh-120px)]">
          {students.length ? (
            <ul className="space-y-3">
              {students.map((s) => (
                <li
                  key={s.id || s.student_id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold">
                      {(s.name || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-slate-900 font-medium truncate">
                        {s.name}
                      </div>
                      <div className="text-xs text-black truncate">
                        Course {s.course || "—"}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {s.phone || ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">No students allocated.</p>
          )}
        </div>

        <footer className="flex justify-end gap-3 p-5 border-t">
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

export default fees;
