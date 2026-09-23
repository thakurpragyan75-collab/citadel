import { useEffect, useState } from "react";
import { useCitadel } from "@/store";

export function useHydrated() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const done = () => setOk(true);
    if (useCitadel.persist.hasHydrated()) {
      done();
      return;
    }
    return useCitadel.persist.onFinishHydration(done);
  }, []);
  return ok;
}
