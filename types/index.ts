export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";
export type ScanStatus = "pending" | "scanning" | "completed" | "failed" | "paused";
export type VulnerabilityType = 
  | "SQL Injection"
  | "XSS"
  | "CSRF"
  | "Security Headers"
  | "SSL/TLS"
  | "Information Disclosure"
  | "Directory Traversal"
  | "Authentication"
  | "Authorization"
  | "File Upload"
  | "Command Injection"
  | "XXE"
  | "SSRF"
  | "Broken Access Control";

export interface Vulnerability {
  id: string;
  type: VulnerabilityType;
  severity: SeverityLevel;
  title: string;
  description: string;
  url: string;
  recommendation: string;
  cwe?: string;
  cvss?: number;
  evidence?: string;
}

export interface ScanResult {
  id: string;
  url: string;
  status: ScanStatus;
  vulnerabilities: Vulnerability[];
  startTime: Date;
  endTime?: Date;
  progress: number;
  pagesScanned: number;
  totalPages: number;
  scanProfile: ScanProfile;
}

export interface ScanProfile {
  name: string;
  description: string;
  checks: VulnerabilityType[];
  depth: number;
  timeout: number;
}

export interface ScanStatistics {
  totalScans: number;
  completedScans: number;
  totalVulnerabilities: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  infoCount: number;
}
