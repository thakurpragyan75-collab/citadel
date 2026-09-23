import { Route, Routes } from "react-router-dom";
import { Shell } from "@/components/shell";
import { Overview } from "@/views/overview";
import { LeakView } from "@/views/leak-view";
import { TapView } from "@/views/tap-view";
import { WatchView } from "@/views/watch-view";
import { BeaconView } from "@/views/beacon-view";
import { TaxView } from "@/views/tax-view";
import { PanicView } from "@/views/panic-view";
import { LedgerView } from "@/views/ledger-view";

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Overview />} />
        <Route path="/leak" element={<LeakView />} />
        <Route path="/tap" element={<TapView />} />
        <Route path="/watch" element={<WatchView />} />
        <Route path="/beacon" element={<BeaconView />} />
        <Route path="/tax" element={<TaxView />} />
        <Route path="/panic" element={<PanicView />} />
        <Route path="/ledger" element={<LedgerView />} />
      </Route>
    </Routes>
  );
}
