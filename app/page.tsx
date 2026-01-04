"use client";

import { useState, useEffect } from "react";
import { ScanResult, ScanProfile, ScanStatistics } from "@/types";
import { generateVulnerabilities } from "@/lib/mockScanner";
import ScannerForm from "@/components/ScannerForm";
import ScanProgress from "@/components/ScanProgress";
import ScanResults from "@/components/ScanResults";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [activeTab, setActiveTab] = useState<"scanner" | "results" | "dashboard">("scanner");
  const [statistics, setStatistics] = useState<ScanStatistics>({
    totalScans: 0,
    completedScans: 0,
    totalVulnerabilities: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    infoCount: 0,
  });

  // Load scans from localStorage on mount
  useEffect(() => {
    const savedScans = localStorage.getItem("vulnscanner_scans");
    if (savedScans) {
      const parsed = JSON.parse(savedScans);
      const scansWithDates = parsed.map((scan: ScanResult) => ({
        ...scan,
        startTime: new Date(scan.startTime),
        endTime: scan.endTime ? new Date(scan.endTime) : undefined,
      }));
      setScans(scansWithDates);
    }
  }, []);

  // Save scans to localStorage whenever they change
  useEffect(() => {
    if (scans.length > 0) {
      localStorage.setItem("vulnscanner_scans", JSON.stringify(scans));
    }
    updateStatistics();
  }, [scans]);

  const updateStatistics = () => {
    const stats: ScanStatistics = {
      totalScans: scans.length,
      completedScans: scans.filter((s) => s.status === "completed").length,
      totalVulnerabilities: 0,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      infoCount: 0,
    };

    scans.forEach((scan) => {
      scan.vulnerabilities.forEach((vuln) => {
        stats.totalVulnerabilities++;
        switch (vuln.severity) {
          case "critical":
            stats.criticalCount++;
            break;
          case "high":
            stats.highCount++;
            break;
          case "medium":
            stats.mediumCount++;
            break;
          case "low":
            stats.lowCount++;
            break;
          case "info":
            stats.infoCount++;
            break;
        }
      });
    });

    setStatistics(stats);
  };

  const startScan = (url: string, profile: ScanProfile) => {
    const newScan: ScanResult = {
      id: Date.now().toString(),
      url,
      status: "scanning",
      vulnerabilities: [],
      startTime: new Date(),
      progress: 0,
      pagesScanned: 0,
      totalPages: profile.depth * 10,
      scanProfile: profile,
    };

    setScans([newScan, ...scans]);
    setActiveTab("results");

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScans((prevScans) => {
        const scan = prevScans.find((s) => s.id === newScan.id);
        if (!scan || scan.status !== "scanning") {
          clearInterval(progressInterval);
          return prevScans;
        }

        const newProgress = Math.min(scan.progress + Math.random() * 15, 100);
        const newPagesScanned = Math.floor((newProgress / 100) * scan.totalPages);

        return prevScans.map((s) =>
          s.id === newScan.id
            ? { ...s, progress: newProgress, pagesScanned: newPagesScanned }
            : s
        );
      });
    }, 500);

    // Complete scan after timeout
    setTimeout(() => {
      clearInterval(progressInterval);
      const vulnerabilities = generateVulnerabilities(url, profile);

      setScans((prevScans) =>
        prevScans.map((scan) =>
          scan.id === newScan.id
            ? {
                ...scan,
                status: "completed",
                vulnerabilities,
                endTime: new Date(),
                progress: 100,
                pagesScanned: scan.totalPages,
              }
            : scan
        )
      );
    }, profile.timeout * 100);
  };

  const pauseScan = (scanId: string) => {
    setScans((prevScans) =>
      prevScans.map((scan) =>
        scan.id === scanId && scan.status === "scanning"
          ? { ...scan, status: "paused" }
          : scan
      )
    );
  };

  const resumeScan = (scanId: string) => {
    setScans((prevScans) =>
      prevScans.map((scan) =>
        scan.id === scanId && scan.status === "paused"
          ? { ...scan, status: "scanning" }
          : scan
      )
    );
  };

  const stopScan = (scanId: string) => {
    setScans((prevScans) =>
      prevScans.map((scan) =>
        scan.id === scanId
          ? { ...scan, status: "failed", endTime: new Date() }
          : scan
      )
    );
  };

  const deleteScan = (scanId: string) => {
    setScans((prevScans) => prevScans.filter((scan) => scan.id !== scanId));
  };

  const exportScan = (scanId: string, format: "json" | "csv" | "pdf") => {
    const scan = scans.find((s) => s.id === scanId);
    if (!scan) return;

    if (format === "json") {
      const dataStr = JSON.stringify(scan, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `scan-${scan.id}.json`;
      link.click();
    } else if (format === "csv") {
      const headers = ["Type", "Severity", "Title", "URL", "CWE", "CVSS"];
      const rows = scan.vulnerabilities.map((v) => [
        v.type,
        v.severity,
        v.title,
        v.url,
        v.cwe || "",
        v.cvss?.toString() || "",
      ]);
      const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
      const dataBlob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `scan-${scan.id}.csv`;
      link.click();
    } else if (format === "pdf") {
      alert("PDF export would require a PDF generation library. JSON and CSV exports are available.");
    }
  };

  const clearAllScans = () => {
    if (confirm("Are you sure you want to delete all scan history?")) {
      setScans([]);
      localStorage.removeItem("vulnscanner_scans");
    }
  };

  const activeScan = scans.find((s) => s.status === "scanning" || s.status === "paused");
  const completedScans = scans.filter((s) => s.status === "completed" || s.status === "failed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VulnScanner Pro</h1>
                <p className="text-sm text-purple-300">Advanced Web Vulnerability Scanner</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <div className="text-sm text-purple-300">Total Scans</div>
                <div className="text-xl font-bold text-white">{statistics.totalScans}</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-sm text-purple-300">Vulnerabilities</div>
                <div className="text-xl font-bold text-white">
                  {statistics.totalVulnerabilities}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab("scanner")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "scanner"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/10 text-purple-300 hover:bg-white/20"
            }`}
          >
            Scanner
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "results"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/10 text-purple-300 hover:bg-white/20"
            }`}
          >
            Results ({scans.length})
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                : "bg-white/10 text-purple-300 hover:bg-white/20"
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Scanner Tab */}
        {activeTab === "scanner" && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold text-white mb-6">Start New Scan</h2>
            <ScannerForm onStartScan={startScan} />
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div className="space-y-6">
            {activeScan && (
              <ScanProgress
                scan={activeScan}
                onPause={() => pauseScan(activeScan.id)}
                onResume={() => resumeScan(activeScan.id)}
                onStop={() => stopScan(activeScan.id)}
              />
            )}

            {completedScans.length === 0 && !activeScan && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-purple-500/20 text-center">
                <p className="text-purple-300 text-lg">
                  No scans yet. Start your first scan!
                </p>
              </div>
            )}

            {completedScans.length > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Scan History</h3>
                  <button
                    onClick={clearAllScans}
                    className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    Clear All
                  </button>
                </div>
                {completedScans.map((scan) => (
                  <ScanResults
                    key={scan.id}
                    scan={scan}
                    onExport={(format) => exportScan(scan.id, format)}
                    onDelete={() => deleteScan(scan.id)}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Security Dashboard</h2>
            <Dashboard statistics={statistics} />

            {scans.length === 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-purple-500/20 text-center">
                <p className="text-purple-300 text-lg">
                  No data available. Run some scans to see statistics.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-purple-500/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-purple-300 text-sm">
              VulnScanner Pro - Advanced Web Vulnerability Scanner © 2026
            </p>
            <div className="flex space-x-4 text-sm text-purple-400">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>{scans.length} Total Scans</span>
              <span>•</span>
              <span>{statistics.totalVulnerabilities} Vulnerabilities Found</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
