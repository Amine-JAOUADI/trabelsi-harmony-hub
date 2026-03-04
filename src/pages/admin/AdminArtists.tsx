import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Edit3, Save, X, Plus, Trash2, User, Star as StarIcon, Crown, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { Singer, Star } from "@/data/packages";

// ── Confirm delete dialog ─────────────────────────────────────
const ConfirmDelete = ({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4"
    onClick={onCancel}>
    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }}
      className="bg-card border border-border rounded-2xl p-5 w-full max-w-sm"
      onClick={e => e.stopPropagation()}>
      <p className="text-sm font-semibold text-foreground mb-1">Supprimer "{name}" ?</p>
      <p className="text-xs text-muted-foreground mb-4">Cette action est irréversible.</p>
      <div className="flex gap-2">
        <button onClick={onConfirm} className="flex-1 bg-red-500 text-white rounded-xl py-2.5 text-sm font-semibold active:scale-95 transition">Supprimer</button>
        <button onClick={onCancel}  className="flex-1 bg-secondary border border-border rounded-xl py-2.5 text-sm text-foreground active:scale-95 transition">Annuler</button>
      </div>
    </motion.div>
  </motion.div>
);

// ── Singer card ───────────────────────────────────────────────
const SingerCard = ({ singer }: { singer: Singer }) => {
  const { updateSinger, removeSinger } = useAdminData();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(singer);
  const [confirmDel, setConfirmDel] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateSinger(draft); setEditing(false);
    setSaved(true); setTimeout(() => setSaved(false), 1800);
  };
  const cancel = () => { setDraft(singer); setEditing(false); };

  return (
    <>
      <div className={`bg-card border rounded-xl p-3.5 transition-all ${editing ? "border-primary/50" : "border-border"}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <User size={15} className="text-muted-foreground" />
          </div>

          {editing ? (
            <div className="flex-1 space-y-2 min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <input value={draft.name} onChange={e => setDraft(d => ({...d, name: e.target.value}))}
                  placeholder="Nom" className="bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={draft.specialty} onChange={e => setDraft(d => ({...d, specialty: e.target.value}))}
                  placeholder="Spécialité" className="bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none">
                  <input type="checkbox" checked={draft.isPremium} onChange={e => setDraft(d => ({...d, isPremium: e.target.checked}))}
                    className="accent-primary w-3.5 h-3.5" />
                  Premium
                </label>
                {draft.isPremium && (
                  <div className="flex items-center gap-1">
                    <input type="number" value={draft.premiumPrice}
                      onChange={e => setDraft(d => ({...d, premiumPrice: Number(e.target.value)}))}
                      className="w-20 bg-background border border-border rounded-lg px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                    <span className="text-xs text-muted-foreground">DT</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{singer.name}</p>
              <p className="text-xs text-muted-foreground">{singer.specialty}</p>
              {singer.isPremium && (
                <span className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full mt-0.5">
                  <Crown size={8} /> +{singer.premiumPrice} DT
                </span>
              )}
            </div>
          )}

          <div className="flex gap-1 shrink-0">
            {editing ? (
              <>
                {saved
                  ? <span className="p-1.5 text-emerald-400"><Check size={15} /></span>
                  : <button onClick={save} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"><Save size={13} /></button>
                }
                <button onClick={cancel} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition"><X size={13} /></button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition"><Edit3 size={13} /></button>
                <button onClick={() => setConfirmDel(true)} className="p-1.5 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition"><Trash2 size={13} /></button>
              </>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {confirmDel && <ConfirmDelete name={singer.name} onConfirm={() => removeSinger(singer.id)} onCancel={() => setConfirmDel(false)} />}
      </AnimatePresence>
    </>
  );
};

// ── Star card ─────────────────────────────────────────────────
const StarCard = ({ star }: { star: Star }) => {
  const { updateStar, removeStar } = useAdminData();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(star);
  const [confirmDel, setConfirmDel] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateStar(draft); setEditing(false);
    setSaved(true); setTimeout(() => setSaved(false), 1800);
  };
  const cancel = () => { setDraft(star); setEditing(false); };

  return (
    <>
      <div className={`bg-card border rounded-xl p-3.5 transition-all ${editing ? "border-primary/50" : "border-border"}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <StarIcon size={14} className="text-primary" />
          </div>
          {editing ? (
            <div className="flex-1 space-y-2 min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <input value={draft.name} onChange={e => setDraft(d => ({...d, name: e.target.value}))}
                  placeholder="Nom" className="bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <div className="flex items-center gap-1">
                  <input type="number" value={draft.price} onChange={e => setDraft(d => ({...d, price: Number(e.target.value)}))}
                    className="flex-1 bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="text-xs text-muted-foreground shrink-0">DT</span>
                </div>
              </div>
              <input value={draft.description} onChange={e => setDraft(d => ({...d, description: e.target.value}))}
                placeholder="Description" className="w-full bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          ) : (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{star.name}</p>
              <p className="text-xs text-muted-foreground truncate">{star.description}</p>
              <p className="text-xs font-bold text-primary mt-0.5">{star.price.toLocaleString()} DT</p>
            </div>
          )}
          <div className="flex gap-1 shrink-0">
            {editing ? (
              <>
                {saved
                  ? <span className="p-1.5 text-emerald-400"><Check size={15} /></span>
                  : <button onClick={save} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"><Save size={13} /></button>
                }
                <button onClick={cancel} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition"><X size={13} /></button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition"><Edit3 size={13} /></button>
                <button onClick={() => setConfirmDel(true)} className="p-1.5 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition"><Trash2 size={13} /></button>
              </>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {confirmDel && <ConfirmDelete name={star.name} onConfirm={() => removeStar(star.id)} onCancel={() => setConfirmDel(false)} />}
      </AnimatePresence>
    </>
  );
};

// ── Add singer form ───────────────────────────────────────────
const AddSingerForm = ({ onClose }: { onClose: () => void }) => {
  const { addSinger } = useAdminData();
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [premiumPrice, setPremiumPrice] = useState(0);

  const submit = () => {
    if (!name.trim()) return;
    addSinger({ id: `s${Date.now()}`, name, specialty, photo: "", isPremium, premiumPrice });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="bg-card border border-border w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5 space-y-3"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-center mb-1"><div className="w-10 h-1 bg-border rounded-full sm:hidden" /></div>
        <p className="font-serif text-base font-bold text-foreground">Ajouter un chanteur</p>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom complet"
          className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        <input value={specialty} onChange={e => setSpecialty(e.target.value)} placeholder="Spécialité (ex: Oriental)"
          className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
          <input type="checkbox" checked={isPremium} onChange={e => setIsPremium(e.target.checked)} className="accent-primary w-4 h-4" />
          Chanteur premium
        </label>
        {isPremium && (
          <div className="flex items-center gap-2">
            <input type="number" value={premiumPrice} onChange={e => setPremiumPrice(Number(e.target.value))} placeholder="Prix"
              className="flex-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            <span className="text-sm text-muted-foreground">DT</span>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button onClick={submit} className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:opacity-90 transition active:scale-95">Ajouter</button>
          <button onClick={onClose} className="flex-1 bg-secondary border border-border rounded-xl py-2.5 text-sm text-foreground transition active:scale-95">Annuler</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Add star form ─────────────────────────────────────────────
const AddStarForm = ({ onClose }: { onClose: () => void }) => {
  const { addStar } = useAdminData();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const submit = () => {
    if (!name.trim()) return;
    addStar({ id: `st${Date.now()}`, name, description, photo: "", price });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="bg-card border border-border w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5 space-y-3"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-center mb-1"><div className="w-10 h-1 bg-border rounded-full sm:hidden" /></div>
        <p className="font-serif text-base font-bold text-foreground">Ajouter une star</p>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom de l'artiste"
          className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description courte"
          className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        <div className="flex items-center gap-2">
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Prix"
            className="flex-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          <span className="text-sm text-muted-foreground">DT</span>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={submit} className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:opacity-90 transition active:scale-95">Ajouter</button>
          <button onClick={onClose} className="flex-1 bg-secondary border border-border rounded-xl py-2.5 text-sm text-foreground transition active:scale-95">Annuler</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main page ─────────────────────────────────────────────────
const AdminArtists = () => {
  const { singers, stars } = useAdminData();
  const [tab, setTab] = useState<"singers" | "stars">("singers");
  const [addingSinger, setAddingSinger] = useState(false);
  const [addingStar, setAddingStar]     = useState(false);

  return (
    <div className="space-y-3">
      <h1 className="font-serif text-xl font-bold text-foreground">Artistes</h1>

      {/* Tab + add button */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 bg-card border border-border rounded-xl p-1 flex-1">
          <button onClick={() => setTab("singers")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition ${tab === "singers" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            <User size={13} /> Chanteurs ({singers.length})
          </button>
          <button onClick={() => setTab("stars")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition ${tab === "stars" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            <StarIcon size={13} /> Stars ({stars.length})
          </button>
        </div>
        <button
          onClick={() => tab === "singers" ? setAddingSinger(true) : setAddingStar(true)}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-xl px-3 py-2.5 text-xs font-semibold hover:opacity-90 transition active:scale-95 shrink-0"
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {tab === "singers" && singers.map(s => <SingerCard key={s.id} singer={s} />)}
        {tab === "stars"   && stars.map(s => <StarCard key={s.id} star={s} />)}
      </div>

      <AnimatePresence>
        {addingSinger && <AddSingerForm onClose={() => setAddingSinger(false)} />}
        {addingStar   && <AddStarForm   onClose={() => setAddingStar(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminArtists;
