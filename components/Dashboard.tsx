"use client";

import { ScanStatistics } from "@/types";

interface DashboardProps {
  statistics: ScanStatistics;
}

export default function Dashboard({ statistics }: DashboardProps) {
  const totalVulns = statistics.totalVulnerabilities;
  const criticalPercentage = totalVulns > 0 ? (statistics.criticalCount / totalVulns) * 100 : 0;
  const highPercentage = totalVulns > 0 ? (statistics.highCount / totalVulns) * 100 : 0;
  const mediumPercentage = totalVulns > 0 ? (statistics.mediumCount / totalVulns) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
        <div className="text-purple-300 text-sm mb-2">Total Scans</div>
        <div className="text-4xl font-bold text-white mb-1">{statistics.totalScans}</div>
        <div className="text-purple-400 text-xs">
          {statistics.completedScans} completed
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
        <div className="text-red-300 text-sm mb-2">Total Vulnerabilities</div>
        <div className="text-4xl font-bold text-white mb-1">
          {statistics.totalVulnerabilities}
        </div>
        <div className="text-red-400 text-xs">
          {statistics.criticalCount} critical
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-md rounded-xl p-6 border border-orange-500/30">
        <div className="text-orange-300 text-sm mb-2">High Severity</div>
        <div className="text-4xl font-bold text-white mb-1">{statistics.highCount}</div>
        <div className="text-orange-400 text-xs">
          {highPercentage.toFixed(1)}% of total
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30">
        <div className="text-yellow-300 text-sm mb-2">Medium Severity</div>
        <div className="text-4xl font-bold text-white mb-1">{statistics.mediumCount}</div>
        <div className="text-yellow-400 text-xs">
          {mediumPercentage.toFixed(1)}% of total
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-white font-semibold mb-4">Vulnerability Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-red-300">Critical</span>
              <span className="text-white">{statistics.criticalCount}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${criticalPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-orange-300">High</span>
              <span className="text-white">{statistics.highCount}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${highPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-yellow-300">Medium</span>
              <span className="text-white">{statistics.mediumCount}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all"
                style={{ width: `${mediumPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-300">Low</span>
              <span className="text-white">{statistics.lowCount}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: `${totalVulns > 0 ? (statistics.lowCount / totalVulns) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Info</span>
              <span className="text-white">{statistics.infoCount}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gray-500 h-2 rounded-full transition-all"
                style={{
                  width: `${totalVulns > 0 ? (statistics.infoCount / totalVulns) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
