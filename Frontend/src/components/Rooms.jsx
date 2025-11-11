// Rooms.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [openRoom, setOpenRoom] = useState(null); // selected room for modal

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/rooms");
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const handleDetails = (room) => setOpenRoom(room);
  const close = () => setOpenRoom(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4" style={{ width: "900px" }}>
        <div className="bg-slate-200 border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-center underline font-semibold text-slate-900">
              Rooms
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-slate-200">
                <tr>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Room
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Capacity
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Status
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rooms.map((r) => (
                  <tr key={r.room_id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="text-slate-900 font-medium">
                        {r.room_number}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-700">{r.capacity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border " +
                          (r.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : r.status === "Occupied"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-slate-50 text-slate-700 border-slate-200")
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={
                            "h-1.5 w-1.5 rounded-full " +
                            (r.status === "Available"
                              ? "bg-emerald-500"
                              : r.status === "Occupied"
                              ? "bg-rose-500"
                              : "bg-slate-400")
                          }
                        />
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                          onClick={() => handleDetails(r)}
                        >
                          Details
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
          `http://localhost:5000/api/rooms/${room.room_id}/students`
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
            <p id="room-desc" className="text-sm text-slate-600">
              Capacity {room.capacity} • Status {room.status}
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
                      <div className="text-xs text-slate-600 truncate">
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
            <p className="text-slate-600">No students allocated.</p>
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

export default Rooms;
