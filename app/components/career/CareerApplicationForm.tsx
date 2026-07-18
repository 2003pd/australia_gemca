"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send, Upload } from "lucide-react";
import { submitCareerApplicationAction } from "../../actions/careers";

export default function CareerApplicationForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setMessage("");
    setError("");

    const formData = new FormData(form);
    const result = await submitCareerApplicationAction(formData);

    if (result.success) {
      form.reset();
      setMessage("Application submitted successfully. GEMCA team will review your profile.");
    } else {
      setError(result.error || "Unable to submit application right now.");
    }

    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[24px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:p-5 md:rounded-[28px] md:p-6">
      <div className="mb-5">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#d4af37]">Apply Now</p>
        <h2 className="text-2xl font-black uppercase md:text-3xl">Upload your resume</h2>
      </div>

      {message ? (
        <div className="mb-4 flex gap-3 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-100">
          <CheckCircle2 className="shrink-0 text-green-300" size={19} />
          <p>{message}</p>
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-[#d4af37]" />
        <input name="phone" required placeholder="Phone" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-[#d4af37]" />
      </div>
      <input name="email" required type="email" placeholder="Email address" className="mt-4 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-[#d4af37]" />
      <select name="role" className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0a1f44] px-4 py-4 text-sm font-semibold text-white outline-none focus:border-[#d4af37]">
        <option value="Migration Case Coordinator">Migration Case Coordinator</option>
        <option value="Education Counsellor">Education Counsellor</option>
        <option value="Digital Client Experience Associate">Digital Client Experience Associate</option>
        <option value="General Career Interest">General Career Interest</option>
      </select>
      <textarea name="message" rows={4} placeholder="Short message" className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold leading-7 text-white placeholder-white/40 outline-none focus:border-[#d4af37]" />

      <label className="mt-4 flex cursor-pointer flex-col items-start gap-3 rounded-2xl border border-dashed border-white/20 bg-white/10 px-4 py-4 text-sm font-bold text-white/75 transition hover:border-[#d4af37]/60 min-[430px]:flex-row min-[430px]:items-center">
        <Upload className="text-[#d4af37]" size={18} />
        <span className="break-words">Choose resume PDF, DOC, or DOCX</span>
        <input name="resume" required type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" />
      </label>

      <button type="submit" disabled={pending} className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d4af37] px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Submitting..." : "Submit Application"}
        <Send size={15} />
      </button>
    </form>
  );
}
