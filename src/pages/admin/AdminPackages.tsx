import { useState, useRef } from "react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import {
  ChevronDown, ChevronUp, Edit3, Check, X, Plus, Trash2,
  GripVertical, Save, RotateCcw
} from "lucide-react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { Package, Segment } from "@/data/packages";

// ── Inline editable field ─────────────────────────────────────
const Field = ({
  label, value, onChange, type = "text", multiline = false
}: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; multiline?: boolean;
}) => (
  <div>
    <label className="block text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">{label}</label>
    {multiline ? (
      <textarea
        value={String(value)}
        onChange={e => onChange(e.target.value)}
        rows={2}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
      />
    ) : (
      <input
        type={type}
        value={String(value)}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
    )}
  </div>
);

// ── Segment row with drag handle ──────────────────────────────
const SegmentRow = ({
  seg, onUpdate, onRemove, editing
}: {
  seg: Segment; onUpdate: (s: Segment) => void; onRemove: () => void; editing: boolean;
}) => {
  if (!editing) return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg">
      <GripVertical size={14} className="text-border shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-foreground">{seg.label || <em className="text-muted-foreground">Sans titre</em>}</span>
        <span className="text-xs text-muted-foreground ml-2">{seg.duration}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-background border border-border rounded-xl p-3 space-y-2">
      <div className="flex items-center gap-2">
        <GripVertical size={15} className="text-muted-foreground cursor-grab active:cursor-grabbing shrink-0" />
        <div className="flex-1 grid grid-cols-2 gap-2">
          <input
            value={seg.label}
            onChange={e => onUpdate({ ...seg, label: e.target.value })}
            placeholder="Titre (ex: Chanteur 1)"
            className="bg-card border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            value={seg.duration}
            onChange={e => onUpdate({ ...seg, duration: e.target.value })}
            placeholder="Durée (ex: 45 min)"
            className="bg-card border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button onClick={onRemove} className="p-1 rounded-lg hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition shrink-0">
          <Trash2 size={13} />
        </button>
      </div>
      <input
        value={seg.description}
        onChange={e => onUpdate({ ...seg, description: e.target.value })}
        placeholder="Description"
        className="w-full bg-card border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
};

// ── Single package card ───────────────────────────────────────
const PackageCard = ({ pkg }: { pkg: Package }) => {
  const { updatePackage } = useAdminData();
  const [open,    setOpen]    = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState<Package>(pkg);
  const [saved,   setSaved]   = useState(false);

  const save = () => {
    updatePackage(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const cancel = () => { setDraft(pkg); setEditing(false); };

  const updateSeg = (i: number, seg: Segment) => {
    const segs = [...draft.segments];
    segs[i] = seg;
    setDraft(d => ({ ...d, segments: segs }));
  };
  const removeSeg = (i: number) =>
    setDraft(d => ({ ...d, segments: d.segments.filter((_, idx) => idx !== i) }));
  const addSeg = () =>
    setDraft(d => ({ ...d, segments: [...d.segments, { id: `seg${Date.now()}`, label: "", duration: "", description: "" }] }));

  const badgeColor = pkg.id === "silver" ? "bg-slate-400/20 text-slate-300" :
                     pkg.id === "bronze" ? "bg-amber-700/20 text-amber-500" :
                     pkg.id === "gold"   ? "bg-yellow-400/20 text-yellow-400" :
                                           "bg-cyan-400/20 text-cyan-400";

  return (
    <div className={`bg-card border rounded-2xl overflow-hidden transition-all ${editing ? "border-primary/50 shadow-gold" : "border-border"}`}>
      {/* Header row */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        onClick={() => !editing && setOpen(o => !o)}
      >
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor}`}>{pkg.name}</span>
        <span className="flex-1 text-sm font-semibold text-foreground">{draft.basePrice.toLocaleString()} DT</span>
        {saved && <span className="text-xs text-emerald-400 font-medium">✓ Sauvegardé</span>}
        {!editing && (
          <span className="text-muted-foreground">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </button>

      <AnimatePresence>
        {(open || editing) && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-4 py-4 space-y-4">
              {/* Action bar */}
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button onClick={save} className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-xl py-2 text-xs font-semibold hover:opacity-90 transition active:scale-95">
                      <Save size={13} /> Sauvegarder
                    </button>
                    <button onClick={cancel} className="flex items-center justify-center gap-1.5 bg-secondary border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition">
                      <X size={13} /> Annuler
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 bg-secondary border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition">
                    <Edit3 size={13} /> Modifier
                  </button>
                )}
              </div>

              {editing ? (
                <>
                  {/* Basic fields */}
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Prix (DT)" value={draft.basePrice} onChange={v => setDraft(d => ({ ...d, basePrice: Number(v) }))} type="number" />
                    <Field label="Chanteurs" value={draft.singers} onChange={v => setDraft(d => ({ ...d, singers: Number(v) }))} type="number" />
                    <Field label="Musiciens" value={draft.musicians} onChange={v => setDraft(d => ({ ...d, musicians: Number(v) }))} type="number" />
                  </div>
                  <Field label="Description" value={draft.description} onChange={v => setDraft(d => ({ ...d, description: v }))} multiline />

                  {/* Segments with drag-to-reorder */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Programme de la soirée</p>
                      <p className="text-[10px] text-muted-foreground">Glissez pour réordonner</p>
                    </div>
                    <Reorder.Group
                      axis="y"
                      values={draft.segments}
                      onReorder={segs => setDraft(d => ({ ...d, segments: segs }))}
                      className="space-y-2"
                    >
                      {draft.segments.map((seg, i) => (
                        <Reorder.Item key={seg.id} value={seg} className="list-none">
                          <SegmentRow
                            seg={seg}
                            editing={editing}
                            onUpdate={s => updateSeg(i, s)}
                            onRemove={() => removeSeg(i)}
                          />
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                    <button onClick={addSeg} className="mt-2 flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Plus size={13} /> Ajouter un segment
                    </button>
                  </div>
                </>
              ) : (
                /* Read-only view */
                <div className="space-y-2">
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">{pkg.musicians} musiciens</span>
                    <span className="text-muted-foreground">{pkg.singers} chanteurs</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{pkg.description}</p>
                  <div className="space-y-1 pt-1">
                    {pkg.segments.map((seg, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[9px] flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-foreground">{seg.label}</span>
                        <span className="text-muted-foreground ml-auto">{seg.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────
const AdminPackages = () => {
  const { packages } = useAdminData();
  return (
    <div className="space-y-3">
      <div>
        <h1 className="font-serif text-xl font-bold text-foreground">Packages</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Touchez un package pour le modifier</p>
      </div>
      {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
    </div>
  );
};

export default AdminPackages;
