import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setError("Digite um e-mail válido."); return; }
    setError(""); setOk(true); setEmail("");
  };
  return (
    <section className="py-16">
      <div className="container-store">
        <div className="rounded-2xl bg-surface p-8 text-center md:p-14">
          <h2 className="text-3xl uppercase text-primary md:text-4xl">Faça parte do time Force</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">Receba novidades, lançamentos e ofertas especiais diretamente no seu e-mail.</p>
          {ok ? (
            <p className="mt-6 inline-flex items-center gap-2 font-semibold text-leaf" role="status"><CheckCircle2 className="h-5 w-5" />Inscrição demonstrativa realizada com sucesso!</p>
          ) : (
            <form onSubmit={submit} noValidate className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">E-mail</label>
              <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail"
                aria-invalid={!!error} className="h-12 flex-1 rounded-lg border bg-card px-4 outline-none focus:border-leaf" />
              <button className="h-12 rounded-lg bg-primary px-6 font-semibold uppercase text-primary-foreground hover:bg-leaf">Inscrever-se</button>
            </form>
          )}
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          <p className="mt-4 text-xs text-muted-foreground">Inscrição demonstrativa — nenhum e-mail é enviado.</p>
        </div>
      </div>
    </section>
  );
}
