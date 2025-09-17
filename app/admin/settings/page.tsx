// app/settings/page.tsx

import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-500">Manage your profile and store preferences</p>
      </div>
      <SettingsForm />
    </div>
  )
}
