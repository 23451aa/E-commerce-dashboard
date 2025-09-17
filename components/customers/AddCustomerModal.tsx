"use client";
import { useState } from "react";

export default function AddCustomerModal({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  const [form, setForm] = useState({ username: "", email: "", totalOrders: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setLoading(false);
    onAdd();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[540px] p-6">
        <h3 className="text-xl font-semibold mb-4">Add Customer</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full border px-3 py-2 rounded" />
          <input required placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border px-3 py-2 rounded" />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Total Orders" type="number" value={form.totalOrders} onChange={e => setForm({ ...form, totalOrders: Number(e.target.value) })} className="w-full border px-3 py-2 rounded" />
            <input placeholder="Total Spent" step="0.01" type="number" value={form.totalSpent} onChange={e => setForm({ ...form, totalSpent: Number(e.target.value) })} className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading ? 'Adding...' : 'Add Customer'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}