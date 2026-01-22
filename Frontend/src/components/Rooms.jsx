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

  const handleDetails = (room) => {
    setOpenRoom(room);
  };

  const close = () => setOpenRoom(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4" style={{ width: "900px" }}>
        <div className="bg-slate-200 border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-center underline font-semibold text-black border-0">
              Rooms
            </h2>
          </div>

          <div className="overflow-x-auto ">
            <table className="min-w-full table-auto text-left border-1">
              <thead className="bg-slate-300">
                <tr>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    Room
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    Capacity
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black">
                    Status
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-3 text-md font-semibold uppercase tracking-wide text-black text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rooms.map((r) => (
                  <tr key={r.room_id} className="hover:bg-black/10 border-1">
                    <td className="px-4 py-3">
                      <span className="text-black font-medium">
                        {r.room_id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-700">{r.capacity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-md font-medium border " +
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
                      <div className=" items-center justify-end gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary "
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
  const [details, setDetails] = useState({
    room_id: "",
    available: "",
    students: [],
  });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/rooms/${room.room_id}`
        );
        if (active) {
          // expected shape:
          // { room_id, capacity, students: [ { id, name, ... } ] }
          setDetails({
            room_id: data.room_id,
            available: data.available,
            students: data.students || [],
          });
        }
      } catch (e) {
        if (active) {
          setDetails((prev) => ({ ...prev, students: [] }));
        }
        console.error(e);
      }
    })();
    return () => {
      active = false;
    };
  }, [room.room_id]);

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
        className="w-full max-w-xl h-auto max-h-[50vh] overflow-hidden rounded-2xl bg-slate-200 shadow-xl ring-1 ring-black/5"
      >
        <header className="flex items-start justify-between p-5 border-b bg-slate-200">
          <div className="w-full">
            <h2
              id="room-title"
              className="text-lg font-semibold text-slate-900 mb-2"
            >
              Room Details
            </h2>
            <p id="room-desc" className="text-sm text-slate-700 mb-4">
              Room information and allocated students
            </p>

            <div className="mb-4">
              <p className="text-sm text-slate-900">
                <span className="font-semibold">Room No:</span>{" "}
                {details.room_id}
              </p>
              <p className="text-sm text-slate-900">
                <span className="font-semibold">Available:</span>{" "}
                {details.available}
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm text-slate-900 mb-1">
                Students:
              </p>
              {details.students && details.students.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-slate-900">
                  {details.students.map((student) => (
                    <li key={student.id || student.student_id || student.name}>
                      {student.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-700">
                  No students in this room.
                </p>
              )}
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}

export default Rooms;
