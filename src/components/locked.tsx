import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export function LockedGate() {
  return (
    <div className="rounded-lg border border-danger/40 bg-surface p-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-danger">Panic lock</p>
      <h2 className="mt-2 text-xl font-medium">This module is frozen</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">Panic wiped identity and revoked grants. Unlock from Panic to resume.</p>
      <Link to="/panic"><Button className="mt-5" variant="outline">Open Panic</Button></Link>
    </div>
  );
}
