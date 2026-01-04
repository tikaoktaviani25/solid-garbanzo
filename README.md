# VulnScanner Pro - Advanced Web Vulnerability Scanner

A modern, robust, and feature-rich web vulnerability scanner built with Next.js, TypeScript, and Tailwind CSS. This is a professional browser-based alternative to Acunetix with advanced capabilities.

## 🚀 New Features

### Core Scanning Features
- **Multiple Scan Profiles**: Quick, Standard, Deep, and Custom scan configurations
- **Real-time Progress Tracking**: Live progress bars with page count and percentage
- **Scan Control**: Pause, Resume, and Stop scans mid-execution
- **14 Vulnerability Types**: Comprehensive detection including:
  - SQL Injection
  - Cross-Site Scripting (XSS)
  - CSRF
  - Security Headers
  - SSL/TLS Configuration
  - Information Disclosure
  - Directory Traversal
  - Authentication Issues
  - Authorization Issues
  - File Upload Vulnerabilities
  - Command Injection
  - XXE (XML External Entity)
  - SSRF (Server-Side Request Forgery)
  - Broken Access Control

### Advanced Features
- **Security Dashboard**: Real-time statistics and vulnerability distribution charts
- **Persistent Storage**: Scan history saved in browser localStorage
- **Export Capabilities**: Export scan results in JSON and CSV formats
- **Severity Filtering**: Filter vulnerabilities by severity level
- **Sorting Options**: Sort by severity or vulnerability type
- **Detailed Vulnerability Cards**: Expandable cards with:
  - CWE (Common Weakness Enumeration) codes
  - CVSS (Common Vulnerability Scoring System) scores
  - Evidence of exploitation
  - Detailed recommendations
  - Affected URLs

### User Experience
- **Beautiful Modern UI**: Gradient design with glassmorphism effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly dark color scheme
- **Smooth Animations**: Professional transitions and loading states
- **Intuitive Navigation**: Three-tab interface (Scanner, Results, Dashboard)

## 📊 Dashboard Features

- Total scans counter
- Completed scans tracking
- Total vulnerabilities found
- Severity breakdown (Critical, High, Medium, Low, Info)
- Visual distribution charts
- Percentage calculations

## 🎯 Scan Profiles

### Quick Scan
- Fast scan for common vulnerabilities
- 3 vulnerability checks
- Depth: 1 level
- Timeout: 30 seconds

### Standard Scan (Recommended)
- Comprehensive scan with balanced speed and coverage
- 7 vulnerability checks
- Depth: 3 levels
- Timeout: 60 seconds

### Deep Scan
- Thorough scan covering all vulnerability types
- 14 vulnerability checks
- Depth: 5 levels
- Timeout: 120 seconds

### Custom Scan
- Configure your own scan parameters
- Adjustable depth (1-10 levels)
- Adjustable timeout (10-300 seconds)

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI**: React 19
- **State Management**: React Hooks
- **Storage**: Browser localStorage

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Usage

1. **Start a Scan**
   - Navigate to the Scanner tab
   - Enter target URL (e.g., https://example.com)
   - Select a scan profile
   - Optionally adjust advanced settings
   - Click "Start Scan"

2. **Monitor Progress**
   - Switch to Results tab to see real-time progress
   - View pages scanned and percentage complete
   - Pause, resume, or stop scan as needed

3. **Review Results**
   - View vulnerability summary by severity
   - Filter and sort vulnerabilities
   - Expand cards for detailed information
   - Export results in JSON or CSV format

4. **Analyze Dashboard**
   - View overall security statistics
   - Track vulnerability trends
   - Monitor scan history

## 📁 Project Structure

```
vuln-scanner/
├── app/
│   ├── globals.css          # Global styles with animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── Dashboard.tsx        # Statistics dashboard
│   ├── ScannerForm.tsx      # Scan configuration form
│   ├── ScanProgress.tsx     # Real-time scan progress
│   ├── ScanResults.tsx      # Scan results display
│   └── VulnerabilityCard.tsx # Individual vulnerability card
├── lib/
│   ├── mockScanner.ts       # Vulnerability generation engine
│   └── scanProfiles.ts      # Scan profile configurations
├── types/
│   └── index.ts             # TypeScript type definitions
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── next.config.ts           # Next.js configuration
```

## 🔒 Security Features

- **CWE Mapping**: Each vulnerability mapped to CWE standards
- **CVSS Scoring**: Vulnerabilities rated with CVSS scores
- **Evidence Collection**: Proof of vulnerability exploitation
- **Remediation Guidance**: Detailed fix recommendations
- **Severity Classification**: 5-level severity system

## 🎨 UI/UX Features

- Gradient backgrounds (slate-900 → purple-900)
- Glassmorphism effects with backdrop blur
- Smooth transitions and animations
- Color-coded severity indicators
- Responsive grid layouts
- Sticky header navigation
- Loading states and spinners
- Empty state messages

## 📊 Export Formats

### JSON Export
Complete scan data including:
- Scan metadata
- All vulnerabilities
- Timestamps
- Scan profile used

### CSV Export
Spreadsheet-compatible format with:
- Vulnerability type
- Severity level
- Title and URL
- CWE and CVSS scores

## 🔄 Future Enhancements

- Real vulnerability scanning engine
- API integration for backend scanning
- PDF report generation
- Scheduled scans
- User authentication
- Team collaboration
- Custom scan profiles
- CI/CD pipeline integration
- Webhook notifications
- Compliance reporting (OWASP, PCI-DSS)

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the repository.

---

**VulnScanner Pro** - Professional Web Security Testing Made Easy
