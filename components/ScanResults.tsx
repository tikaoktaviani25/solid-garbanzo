"use client";

import { ScanResult } from "@/types";
import VulnerabilityCard from "./VulnerabilityCard";
import { useState } from "react";

interface ScanResultsProps {
  scan: ScanResult;
  onExport?: (format: "json" | "csv" | "pdf") => void;
  onDelete?: () => void;
}

export default function ScanResults({ scan, onExport, onDelete }: ScanResultsProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"severity" | "type">("severity");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scanning":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      case "paused":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };

  const filteredVulnerabilities = scan.vulnerabilities
    .filter((v) => filterSeverity === "all" || v.severity === filterSeverity)
    .sort((a, b) => {
      if (sortBy === "severity") {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return a.type.localeCompare(b.type);
    });

  const severityCounts = {
    critical: scan.vulnerabilities.filter((v) => v.severity === "critical").length,
    high: scan.vulnerabilities.filter((v) => v.severity === "high").length,
    medium: scan.vulnerabilities.filter((v) => v.severity === "medium").length,
    low: scan.vulnerabilities.filter((v) => v.severity === "low").length,
    info: scan.vulnerabilities.filter((v) => v.severity === "info").length,
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{scan.url}</h3>
          <p className="text-purple-300 text-sm">
            Started: {scan.startTime.toLocaleString()}
            {scan.endTime && ` • Completed: ${scan.endTime.toLocaleString()}`}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`font-semibold text-lg ${getStatusColor(scan.status)}`}>
            {scan.status.toUpperCase()}
          </span>
        </div>
      </div>

      {scan.status === "completed" && scan.vulnerabilities.length > 0 && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(severityCounts).map(([severity, count]) => (
              <button
                key={severity}
                onClick={() => setFilterSeverity(filterSeverity === severity ? "all" : severity)}
                className={`p-3 rounded-lg text-center transition-all ${
                  filterSeverity === severity
                    ? "bg-purple-500/30 ring-2 ring-purple-500"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-xs text-purple-300 uppercase">{severity}</div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-purple-300 text-sm mr-2">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "severity" | "type")}
                  className="bg-white/10 text-white px-3 py-1 rounded border border-purple-500/30 focus:outline-none focus:border-purple-500"
                >
                  <option value="severity">Severity</option>
                  <option value="type">Type</option>
                </select>
              </div>
              {filterSeverity !== "all" && (
                <button
                  onClick={() => setFilterSeverity("all")}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {onExport && (
                <>
                  <button
                    onClick={() => onExport("json")}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-all text-sm"
                  >
                    Export JSON
                  </button>
                  <button
                    onClick={() => onExport("csv")}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition-all text-sm"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => onExport("pdf")}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-all text-sm"
                  >
                    Export PDF
                  </button>
                </>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="px-3 py-1 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-all text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Vulnerability List */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">
              Showing {filteredVulnerabilities.length} of {scan.vulnerabilities.length}{" "}
              vulnerabilities
            </h4>
            {filteredVulnerabilities.map((vuln) => (
              <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
            ))}
          </div>
        </div>
      )}

      {scan.status === "completed" && scan.vulnerabilities.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-green-400 text-xl font-semibold">No vulnerabilities found!</p>
          <p className="text-purple-300 text-sm mt-2">
            The target appears to be secure based on the selected scan profile.
          </p>
        </div>
      )}

      {scan.status === "failed" && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-red-400 text-xl font-semibold">Scan Failed</p>
          <p className="text-purple-300 text-sm mt-2">
            Unable to complete the scan. Please check the target URL and try again.
          </p>
        </div>
      )}
    </div>
  );
}
