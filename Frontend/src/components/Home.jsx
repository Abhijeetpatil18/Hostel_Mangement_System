import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[60vh]">
      {/* Hero */}
      <section
        style={{
          padding: "48px 16px",
          background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>Hostel Management System</h1>
          <p style={{ marginTop: 10, color: "#475569", maxWidth: 780 }}>
            Manage rooms, bookings, complaints, fees, mess, housekeeping, and
            reports from a single dashboard to streamline day‑to‑day hostel
            operations.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <Link to="/rooms" className="btn btn-primary">
              View Rooms
            </Link>
            <Link to="/complaints" className="btn btn-outline-secondary">
              Complaints
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ padding: "32px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Key Features</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
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
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 16,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <h3 style={{ margin: 0, fontSize: 18, marginBottom: 8 }}>{title}</h3>
      <p style={{ margin: 0, color: "#475569", lineHeight: 1.55 }}>{desc}</p>
    </div>
  );
}

export default Home;
