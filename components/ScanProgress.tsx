"use client";

import { ScanResult } from "@/types";

interface ScanProgressProps {
  scan: ScanResult;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
}

export default function ScanProgress({ scan, onPause, onResume, onStop }: ScanProgressProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{scan.url}</h3>
          <p className="text-purple-300 text-sm">
            Started: {scan.startTime.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {scan.status === "scanning" && onPause && (
            <button
              onClick={onPause}
              className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-all"
            >
              Pause
            </button>
          )}
          {scan.status === "paused" && onResume && (
            <button
              onClick={onResume}
              className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all"
            >
              Resume
            </button>
          )}
          {(scan.status === "scanning" || scan.status === "paused") && onStop && (
            <button
              onClick={onStop}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {scan.status === "scanning" && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-purple-300 mb-2">
              <span>Progress: {scan.progress}%</span>
              <span>
                {scan.pagesScanned} / {scan.totalPages} pages
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 relative"
                style={{ width: `${scan.progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            <span className="text-purple-300">Scanning in progress...</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-purple-400">Vulnerabilities Found</div>
              <div className="text-2xl font-bold text-white">
                {scan.vulnerabilities.length}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-purple-400">Scan Profile</div>
              <div className="text-lg font-semibold text-white">
                {scan.scanProfile.name}
              </div>
            </div>
          </div>
        </div>
      )}

      {scan.status === "paused" && (
        <div className="flex items-center space-x-3 text-yellow-300">
          <div className="w-6 h-6 flex items-center justify-center">⏸</div>
          <span>Scan paused at {scan.progress}%</span>
        </div>
      )}
    </div>
  );
}
