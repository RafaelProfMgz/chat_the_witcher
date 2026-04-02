"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Gradient orbs */}
      <div
        className="orb orb-purple"
        style={{ transition: "background 1s ease" }}
      />
      <div
        className="orb orb-blue"
        style={{ transition: "background 1s ease" }}
      />
      <div
        className="orb orb-blood"
        style={{ transition: "background 1s ease" }}
      />

      {/* Floating gold particles */}
      <div className="particles">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
    </div>
  );
}
