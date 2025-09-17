// components/SettingsForm.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function SettingsForm() {
  const [form, setForm] = useState({
    storeName: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You can send this data to your backend here
    console.log('Form submitted:', form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="storeName">Store Name</Label>
          <Input id="storeName" name="storeName" value={form.storeName} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="address">Store Address</Label>
          <Input id="address" name="address" value={form.address} onChange={handleChange} />
        </div>
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  )
}
