import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

const KEY = "force-favorites";

interface FavValue {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string, name?: string) => void;
}

export const FavoritesContext = createContext<FavValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(ids)); }, [ids, loaded]);

  const toggle = useCallback((id: string, name?: string) => {
    setIds((prev) => {
      const on = prev.includes(id);
      toast(on ? "Removido dos favoritos" : "Adicionado aos favoritos", { description: name });
      return on ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, []);

  const value = useMemo(() => ({ ids, has: (id: string) => ids.includes(id), toggle }), [ids, toggle]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
