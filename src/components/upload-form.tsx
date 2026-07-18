"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UPLOAD_ENDPOINT, UPLOAD_CONFIGURED } from "@/lib/upload-config";

export interface RiderOption {
  value: string; // slug
  label: string; // name
  team: string; // current team ("" if none)
}

const inputCls =
  "h-11 w-full rounded-md border border-line bg-cream px-3 text-sm text-ink outline-none transition-colors placeholder:text-greige focus:border-ink";

const MAX_DIM = 900; // px — longest edge after downscale
const JPEG_QUALITY = 0.85;
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // reject raw files over 15MB

export function UploadForm({
  riders,
  teams,
}: {
  riders: RiderOption[];
  teams: string[];
}) {
  const [riderSlug, setRiderSlug] = useState("");
  const [riderName, setRiderName] = useState("");
  const [team, setTeam] = useState("");
  const [instagram, setInstagram] = useState("");
  const [preview, setPreview] = useState<string | null>(null); // resized data URL
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "submitting" | "done" | "error">("idle");

  function onPickRider(value: string, label: string) {
    setRiderSlug(value);
    setRiderName(label);
    // Prefill the team with the rider's known team, if any.
    const r = riders.find((x) => x.value === value);
    if (r && r.team && r.team.toUpperCase() !== "NA") setTeam(r.team);
  }

  async function onFile(file: File | undefined) {
    setFileError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileError("Please choose an image file (JPG or PNG).");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setFileError("That image is over 15 MB — please pick a smaller one.");
      return;
    }
    setStatus("processing");
    try {
      const dataUrl = await downscaleImage(file);
      setPreview(dataUrl);
      setStatus("idle");
    } catch {
      setFileError("Couldn't read that image. Try a different file.");
      setStatus("idle");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!riderSlug || !preview) return;
    if (!UPLOAD_CONFIGURED) return;

    setStatus("submitting");
    try {
      const payload = {
        riderSlug,
        riderName,
        team: team.trim(),
        instagram: instagram.trim().replace(/^@/, ""),
        filename: `${riderSlug}.jpg`,
        mimeType: "image/jpeg",
        imageBase64: preview.split(",")[1],
      };
      // Apps Script Web Apps don't return CORS headers, so we can't read the
      // response — send as a "simple" request and treat no-throw as success.
      await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-line bg-cream p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember/10 text-2xl text-ember">
          ✓
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">Photo received!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-greige">
          Thanks, {riderName}. Your photo has been submitted for review and will
          appear on your rider profile once the BBCh team approves it.
        </p>
        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setRiderSlug("");
              setRiderName("");
              setTeam("");
              setInstagram("");
              setPreview(null);
              setStatus("idle");
            }}
          >
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  const canSubmit = !!riderSlug && !!preview && status !== "submitting" && status !== "processing";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {!UPLOAD_CONFIGURED && (
        <div className="rounded-md border border-yellow-deep/40 bg-yellow/10 px-4 py-3 text-sm text-ink">
          <strong>Setup needed:</strong> the upload endpoint isn&apos;t configured
          yet. Add your Google Apps Script URL in{" "}
          <code className="rounded bg-ink/5 px-1">src/lib/upload-config.ts</code>{" "}
          to enable submissions.
        </div>
      )}

      {/* RIDER — must be chosen from the real list */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Your name <span className="text-ember">*</span>
        </label>
        <Combobox
          options={riders}
          value={riderSlug}
          placeholder="Start typing your name…"
          onSelect={onPickRider}
          onClear={() => {
            setRiderSlug("");
            setRiderName("");
          }}
        />
        <p className="mt-1.5 text-xs text-greige">
          Pick your name from the list. Can&apos;t find it?{" "}
          <a href="/contact" className="text-ember hover:underline">
            Contact us
          </a>{" "}
          — you may not be in our records yet.
        </p>
      </div>

      {/* TEAM — search existing, or add if not listed */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Team</label>
        <Combobox
          options={teams.map((t) => ({ value: t, label: t, team: "" }))}
          value={team}
          placeholder="Search for your team…"
          allowCustom
          onSelect={(_v, label) => setTeam(label)}
          onClear={() => setTeam("")}
        />
        <p className="mt-1.5 text-xs text-greige">
          Search for your team. Not listed? Type it and choose &ldquo;Add&rdquo;.
          Leave blank if you ride independently.
        </p>
      </div>

      {/* INSTAGRAM (optional) */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Instagram handle <span className="text-greige">(optional)</span>
        </label>
        <input
          className={inputCls}
          placeholder="@yourhandle"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>

      {/* PHOTO */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Profile photo <span className="text-ember">*</span>
        </label>
        <div className="flex items-center gap-4">
          <label className="flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-line bg-cream text-center text-xs text-greige transition-colors hover:border-ember">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
            ) : status === "processing" ? (
              "Processing…"
            ) : (
              "Choose photo"
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          <div className="text-xs leading-relaxed text-greige">
            A clear, front-facing headshot works best.
            <br />
            JPG or PNG. We&apos;ll resize it automatically.
          </div>
        </div>
        {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your photo. Please try again.
        </p>
      )}

      <div>
        <Button type="submit" variant="yellow" disabled={!canSubmit}>
          {status === "submitting" ? "Submitting…" : "Submit photo"}
        </Button>
        <p className="mt-3 text-xs text-greige">
          By submitting, you agree that BBCh may use this photo on your public
          rider profile. Photos are reviewed before they appear.
        </p>
      </div>
    </form>
  );
}

/* ---------------- Searchable combobox ---------------- */

function Combobox({
  options,
  value,
  placeholder,
  allowCustom = false,
  onSelect,
  onClear,
}: {
  options: RiderOption[];
  value: string;
  placeholder?: string;
  allowCustom?: boolean;
  onSelect: (value: string, label: string) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the input text in sync when a value is set from outside (e.g. prefill).
  useEffect(() => {
    if (value) {
      const match = options.find((o) => o.value === value);
      setQuery(match ? match.label : value);
    } else {
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, 30);
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 40);
  }, [query, options]);

  const exactMatch = options.some(
    (o) => o.label.toLowerCase() === query.trim().toLowerCase()
  );
  const showCustom = allowCustom && query.trim().length > 1 && !exactMatch;

  return (
    <div ref={wrapRef} className="relative">
      <input
        className={inputCls}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (value) onClear();
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      {open && (results.length > 0 || showCustom) && (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-md border border-line bg-cream py-1 shadow-lg">
          {results.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-ink hover:bg-ember-50"
                onClick={() => {
                  onSelect(o.value, o.label);
                  setQuery(o.label);
                  setOpen(false);
                }}
              >
                <span>{o.label}</span>
                {o.team && o.team.toUpperCase() !== "NA" && (
                  <span className="shrink-0 text-xs text-greige">{o.team}</span>
                )}
              </button>
            </li>
          ))}
          {showCustom && (
            <li>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-ember hover:bg-ember-50"
                onClick={() => {
                  const v = query.trim();
                  onSelect(v, v);
                  setOpen(false);
                }}
              >
                <span aria-hidden="true">＋</span> Add &ldquo;{query.trim()}&rdquo;
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/* ---------------- Image downscale ---------------- */

function downscaleImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas context"));
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image load error"));
    };
    img.src = url;
  });
}
