import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[60vh]">
      {/* Hero */}
      <section
        style={{
          padding: "48px 16px",
          background:
            "linear-gradient(135deg, rgb(147 179 211), rgb(241 169 169))",
          borderBottom: "1px solid rgb(229, 231, 235)",
          borderRadius: "20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>Hostel Management System</h1>
          <p
            style={{
              marginTop: 10,
              color: "black",
              maxWidth: 780,
              fontSize: "20px",
            }}
          >
            Manage rooms, bookings, complaints, fees, mess, housekeeping, and
            reports from a single dashboard to streamline day‑to‑day hostel
            operations.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <Link to="students" className="btn btn-primary">
              Students
            </Link>
            <Link to="rooms" className="btn btn-primary">
              View Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ padding: "32px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>Key Features</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            <FeatureCard
              title="Room & Bed Management"
              desc="Track room capacity, occupancy, allocations, and housekeeping status with a clear overview."
            />
            <FeatureCard
              title="Bookings & Check‑ins"
              desc="Handle arrivals, departures, extensions, and group booking flows efficiently."
            />
            <FeatureCard
              title="Complaints & Maintenance"
              desc="Log issues per room, prioritize and track resolution with staff notifications."
            />
            <FeatureCard
              title="Fees & Payments"
              desc="Record fees, track dues/defaulters, and generate receipts or reminders."
            />
            <FeatureCard
              title="Mess / Cafeteria"
              desc="Publish menus, manage orders, and provide transparent monthly summaries."
            />
            <FeatureCard
              title="Reports & Analytics"
              desc="Generate occupancy, finance, and service reports to guide decisions."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,rgb(161 190 219), rgb(237 172 172))",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "40px 30px",
        fontSize: "18px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <h3 style={{ margin: 0, fontSize: 24, marginBottom: 15 }}>{title}</h3>
      <p style={{ margin: 12, color: "black", lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

export default Home;
