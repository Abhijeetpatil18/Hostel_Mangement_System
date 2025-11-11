import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/80 backdrop-blur-md bg-gradient-to-r f"
      style={{
        backgroundColor: "black",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-4"
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="h-14 flex items-center justify-between">
          {/* Left: App name */}
          <a
            href="/"
            className="text-base font-semibold text-slate-900"
            style={{
              textDecoration: "none",
              fontSize: "x-large",
              fontWeight: "700",
              backgroundColor: "black",
              color: "white",
              // size: "30px",
              fontHeight: "50px",
            }}
          >
            Hostel Management
          </a>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="px-3 py-1 text-lg  rounded-lg border border-slate-200/80 text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-colors"
              style={{
                textDecoration: "none",
                backgroundColor: "white",
              }}
            >
              Log out
            </a>
            <Link
              to="/register"
              className="px-3 py-1 text-lg  rounded-lg border border-slate-200/80 text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-colors"
              style={{
                textDecoration: "none",
                backgroundColor: "white",
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
