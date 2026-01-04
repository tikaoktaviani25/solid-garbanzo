import { Vulnerability, VulnerabilityType, ScanProfile } from "@/types";

const vulnerabilityDatabase: Record<VulnerabilityType, Vulnerability[]> = {
  "SQL Injection": [
    {
      id: "sql-1",
      type: "SQL Injection",
      severity: "critical",
      title: "SQL Injection in login form",
      description: "The login form is vulnerable to SQL injection attacks. User input is not properly sanitized, allowing attackers to bypass authentication or extract sensitive data.",
      url: "/login",
      recommendation: "Use parameterized queries or prepared statements. Implement input validation and sanitization. Use ORM frameworks with built-in protection.",
      cwe: "CWE-89",
      cvss: 9.8,
      evidence: "Payload: ' OR '1'='1' -- resulted in successful authentication bypass",
    },
    {
      id: "sql-2",
      type: "SQL Injection",
      severity: "high",
      title: "SQL Injection in search functionality",
      description: "Search parameter is vulnerable to SQL injection, potentially exposing database contents.",
      url: "/search?q=test",
      recommendation: "Implement parameterized queries and input validation for all search parameters.",
      cwe: "CWE-89",
      cvss: 8.6,
      evidence: "Payload: test' UNION SELECT NULL-- returned database error",
    },
  ],
  "XSS": [
    {
      id: "xss-1",
      type: "XSS",
      severity: "high",
      title: "Reflected XSS in search parameter",
      description: "User input from search parameter is reflected in the page without proper encoding, allowing script injection.",
      url: "/search",
      recommendation: "Encode all user input before rendering. Implement Content Security Policy (CSP). Use modern frameworks with automatic XSS protection.",
      cwe: "CWE-79",
      cvss: 7.3,
      evidence: "Payload: <script>alert('XSS')</script> executed successfully",
    },
    {
      id: "xss-2",
      type: "XSS",
      severity: "medium",
      title: "Stored XSS in comment section",
      description: "Comments are stored and displayed without sanitization, allowing persistent XSS attacks.",
      url: "/comments",
      recommendation: "Sanitize and encode all user-generated content. Implement CSP headers.",
      cwe: "CWE-79",
      cvss: 6.5,
      evidence: "Malicious script stored in database and executed on page load",
    },
  ],
  "CSRF": [
    {
      id: "csrf-1",
      type: "CSRF",
      severity: "medium",
      title: "Missing CSRF protection on forms",
      description: "Forms lack CSRF tokens, making them vulnerable to cross-site request forgery attacks.",
      url: "/profile/update",
      recommendation: "Implement CSRF tokens for all state-changing operations. Use SameSite cookie attribute.",
      cwe: "CWE-352",
      cvss: 6.5,
    },
  ],
  "Security Headers": [
    {
      id: "header-1",
      type: "Security Headers",
      severity: "medium",
      title: "Missing security headers",
      description: "Important security headers are missing: X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Content-Security-Policy.",
      url: "/",
      recommendation: "Add security headers: X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Strict-Transport-Security: max-age=31536000, Content-Security-Policy with appropriate directives.",
      cwe: "CWE-693",
      cvss: 5.3,
    },
  ],
  "SSL/TLS": [
    {
      id: "ssl-1",
      type: "SSL/TLS",
      severity: "low",
      title: "Weak SSL/TLS configuration",
      description: "Server supports older TLS versions (TLS 1.0, TLS 1.1) and weak cipher suites.",
      url: "/",
      recommendation: "Disable TLS 1.0 and 1.1. Use TLS 1.2 or higher. Configure strong cipher suites only.",
      cwe: "CWE-326",
      cvss: 4.3,
    },
  ],
  "Information Disclosure": [
    {
      id: "info-1",
      type: "Information Disclosure",
      severity: "info",
      title: "Server version disclosure",
      description: "Server header reveals version information that could aid attackers.",
      url: "/",
      recommendation: "Remove or obfuscate server version information from headers.",
      cwe: "CWE-200",
      cvss: 3.7,
    },
    {
      id: "info-2",
      type: "Information Disclosure",
      severity: "low",
      title: "Directory listing enabled",
      description: "Directory listing is enabled, exposing file structure.",
      url: "/uploads/",
      recommendation: "Disable directory listing in web server configuration.",
      cwe: "CWE-548",
      cvss: 4.3,
    },
  ],
  "Directory Traversal": [
    {
      id: "dir-1",
      type: "Directory Traversal",
      severity: "high",
      title: "Path traversal in file download",
      description: "File download functionality is vulnerable to path traversal attacks.",
      url: "/download?file=document.pdf",
      recommendation: "Validate and sanitize file paths. Use whitelist of allowed files. Implement proper access controls.",
      cwe: "CWE-22",
      cvss: 7.5,
    },
  ],
  "Authentication": [
    {
      id: "auth-1",
      type: "Authentication",
      severity: "high",
      title: "Weak password policy",
      description: "Password policy allows weak passwords (minimum 4 characters, no complexity requirements).",
      url: "/register",
      recommendation: "Implement strong password policy: minimum 12 characters, complexity requirements, password history.",
      cwe: "CWE-521",
      cvss: 7.5,
    },
  ],
  "Authorization": [
    {
      id: "authz-1",
      type: "Authorization",
      severity: "critical",
      title: "Broken access control",
      description: "Users can access other users' data by manipulating URL parameters.",
      url: "/user/profile?id=123",
      recommendation: "Implement proper authorization checks. Validate user permissions server-side.",
      cwe: "CWE-639",
      cvss: 9.1,
    },
  ],
  "File Upload": [
    {
      id: "upload-1",
      type: "File Upload",
      severity: "critical",
      title: "Unrestricted file upload",
      description: "File upload functionality allows uploading executable files without validation.",
      url: "/upload",
      recommendation: "Validate file types, extensions, and content. Store uploads outside web root. Implement virus scanning.",
      cwe: "CWE-434",
      cvss: 9.8,
    },
  ],
  "Command Injection": [
    {
      id: "cmd-1",
      type: "Command Injection",
      severity: "critical",
      title: "OS command injection",
      description: "User input is passed to system commands without sanitization.",
      url: "/tools/ping",
      recommendation: "Avoid system calls with user input. Use safe APIs. Implement strict input validation.",
      cwe: "CWE-78",
      cvss: 9.8,
    },
  ],
  "XXE": [
    {
      id: "xxe-1",
      type: "XXE",
      severity: "high",
      title: "XML External Entity injection",
      description: "XML parser is configured to process external entities, allowing XXE attacks.",
      url: "/api/xml",
      recommendation: "Disable external entity processing in XML parsers. Use JSON instead of XML when possible.",
      cwe: "CWE-611",
      cvss: 8.2,
    },
  ],
  "SSRF": [
    {
      id: "ssrf-1",
      type: "SSRF",
      severity: "high",
      title: "Server-Side Request Forgery",
      description: "Application fetches remote resources based on user input without validation.",
      url: "/fetch?url=http://example.com",
      recommendation: "Validate and whitelist allowed URLs. Implement network segmentation. Block internal IP ranges.",
      cwe: "CWE-918",
      cvss: 8.6,
    },
  ],
  "Broken Access Control": [
    {
      id: "bac-1",
      type: "Broken Access Control",
      severity: "critical",
      title: "Insecure direct object reference",
      description: "Application exposes direct references to internal objects without access control.",
      url: "/api/documents/12345",
      recommendation: "Implement proper authorization checks. Use indirect references. Validate user permissions.",
      cwe: "CWE-639",
      cvss: 9.1,
    },
  ],
};

export function generateVulnerabilities(
  baseUrl: string,
  profile: ScanProfile
): Vulnerability[] {
  const vulnerabilities: Vulnerability[] = [];
  
  profile.checks.forEach((checkType) => {
    const vulns = vulnerabilityDatabase[checkType] || [];
    vulns.forEach((vuln) => {
      vulnerabilities.push({
        ...vuln,
        id: `${vuln.id}-${Date.now()}-${Math.random()}`,
        url: `${baseUrl}${vuln.url}`,
      });
    });
  });

  // Randomize which vulnerabilities are found (simulate real scanning)
  return vulnerabilities.filter(() => Math.random() > 0.3);
}
