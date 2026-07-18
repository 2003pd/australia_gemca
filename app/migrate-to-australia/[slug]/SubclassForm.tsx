"use client";

import { useState } from "react";
import { addLeadAction } from "../../actions/leads";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

interface SubclassFormProps {
  subclass: string;
  visaTitle: string;
}

export default function SubclassForm({ subclass, visaTitle }: SubclassFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Submission States
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");
    setSuccess(false);

    const today = new Date().toISOString().split("T")[0];
    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      phone,
      pathway: `${visaTitle} (${subclass})`,
      status: "New" as const,
      date: today,
      notes: message || `User interested in ${visaTitle} (${subclass}). Please provide assessment.`
    };

    try {
      const response = await addLeadAction(newLead);
      if (response.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setError(response.error || "Failed to submit inquiry to the server.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6 text-center text-green-200 space-y-3 animate-fade-in">
        <CheckCircle className="mx-auto text-green-400" size={32} />
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Inquiry Lodged Successfully</h3>
        <p className="text-xs text-green-200/70 leading-5">
          Your profile has been saved to our SQL database. One of our education or migration consultants will review your points criteria and reach out shortly.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-2 text-xs font-bold uppercase tracking-wider text-white underline hover:text-[#d4af37] transition-colors"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200 leading-5">
          <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={16} />
          <p>{error}</p>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma"
          required
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder-white/20 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none"
        />
      </div>

      {/* Email Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. rahul@example.com"
            required
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder-white/20 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +61 498 765 432"
            required
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder-white/20 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none"
          />
        </div>
      </div>

      {/* Message Input */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-wider text-white/60">Consultation Notes (Optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="List your age, points count, English test scores (IELTS/PTE), or general queries..."
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder-white/20 transition-all focus:border-[#d4af37] focus:bg-white/[0.06] focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-50 text-black font-black uppercase tracking-widest text-xs py-3.5 rounded-lg transition-colors cursor-pointer"
      >
        {pending ? (
          <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
        ) : (
          <>
            Lodge Inquiry
            <Send size={12} />
          </>
        )}
      </button>
    </form>
  );
}
