"use client";

import { useState } from "react";
import { ScanProfile } from "@/types";
import { scanProfiles } from "@/lib/scanProfiles";

interface ScannerFormProps {
  onStartScan: (url: string, profile: ScanProfile) => void;
}

export default function ScannerForm({ onStartScan }: ScannerFormProps) {
  const [targetUrl, setTargetUrl] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<ScanProfile>(scanProfiles[1]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetUrl) {
      onStartScan(targetUrl, selectedProfile);
      setTargetUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-purple-300 mb-2 font-semibold text-lg">
          Target URL
        </label>
        <input
          type="url"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-purple-300 mb-2 font-semibold text-lg">
          Scan Profile
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scanProfiles.slice(0, 3).map((profile) => (
            <button
              key={profile.name}
              type="button"
              onClick={() => setSelectedProfile(profile)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedProfile.name === profile.name
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-purple-500/20 bg-white/5 hover:border-purple-500/50"
              }`}
            >
              <div className="font-semibold text-white mb-1">{profile.name}</div>
              <div className="text-sm text-purple-300">{profile.description}</div>
              <div className="text-xs text-purple-400 mt-2">
                {profile.checks.length} checks • Depth: {profile.depth} • {profile.timeout}s timeout
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
      >
        {showAdvanced ? "Hide" : "Show"} Advanced Options
      </button>

      {showAdvanced && (
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-purple-300 mb-2 text-sm">
              Scan Depth: {selectedProfile.depth}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={selectedProfile.depth}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  depth: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-purple-300 mb-2 text-sm">
              Timeout: {selectedProfile.timeout}s
            </label>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={selectedProfile.timeout}
              onChange={(e) =>
                setSelectedProfile({
                  ...selectedProfile,
                  timeout: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!targetUrl}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/30"
      >
        Start Scan
      </button>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">Selected Profile Checks:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedProfile.checks.map((check) => (
            <span
              key={check}
              className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded"
            >
              {check}
            </span>
          ))}
        </div>
      </div>
    </form>
  );
}
