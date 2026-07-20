export type ToolCategory = 'convert' | 'edit' | 'security' | 'scan' | 'ai';

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string; // lucide icon name
  color: string; // tailwind bg color class for icon bg
  isAI?: boolean;
};

export const tools: Tool[] = [
  // CONVERT
  {
    slug: 'pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.',
    category: 'convert',
    icon: 'Presentation',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
    category: 'convert',
    icon: 'Table2',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
    category: 'convert',
    icon: 'FileText',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF',
    description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
    category: 'convert',
    icon: 'Monitor',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Make Excel spreadsheets easy to read by converting them to PDF.',
    category: 'convert',
    icon: 'Sheet',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    category: 'convert',
    icon: 'Image',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
    category: 'convert',
    icon: 'ImagePlus',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'html-to-pdf',
    title: 'HTML to PDF',
    description: 'Convert webpages in HTML to PDF. Paste the URL and convert it with a click.',
    category: 'convert',
    icon: 'Globe',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'pdf-to-pdfa',
    title: 'PDF to PDF/A',
    description: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.',
    category: 'convert',
    icon: 'Archive',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },
  {
    slug: 'pdf-to-markdown',
    title: 'PDF to Markdown',
    description: 'Convert PDF documents to clean Markdown format for editing and publishing.',
    category: 'convert',
    icon: 'FileCode',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400'
  },

  // EDIT & ORGANIZE
  {
    slug: 'edit-pdf',
    title: 'Edit PDF',
    description: 'Add text, images, shapes or freehand annotations to a PDF document.',
    category: 'edit',
    icon: 'PenLine',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  },
  {
    slug: 'organize-pdf',
    title: 'Organize PDF',
    description: 'Sort pages, delete or add pages to your PDF document at your convenience.',
    category: 'edit',
    icon: 'LayoutGrid',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  },
  {
    slug: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate your PDFs the way you need them. You can rotate multiple PDFs at once!',
    category: 'edit',
    icon: 'RotateCw',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  },
  {
    slug: 'crop-pdf',
    title: 'Crop PDF',
    description: 'Crop margins of PDF documents or select specific areas, then apply the changes.',
    category: 'edit',
    icon: 'Crop',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  },
  {
    slug: 'page-numbers',
    title: 'Page Numbers',
    description: 'Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.',
    category: 'edit',
    icon: 'Hash',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  },
  {
    slug: 'watermark',
    title: 'Watermark',
    description: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.',
    category: 'edit',
    icon: 'Stamp',
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
  },

  // SECURITY
  {
    slug: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
    category: 'security',
    icon: 'Lock',
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
  },
  {
    slug: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
    category: 'security',
    icon: 'Unlock',
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
  },
  {
    slug: 'redact-pdf',
    title: 'Redact PDF',
    description: 'Redact text and graphics to permanently remove sensitive information from a PDF.',
    category: 'security',
    icon: 'EyeOff',
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
  },
  {
    slug: 'sign-pdf',
    title: 'Sign PDF',
    description: 'Sign yourself or request electronic signatures from others.',
    category: 'security',
    icon: 'PenTool',
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
  },

  // SCAN & REPAIR
  {
    slug: 'scan-to-pdf',
    title: 'Scan to PDF',
    description: 'Capture document scans from your mobile device and send them instantly to your browser.',
    category: 'scan',
    icon: 'ScanLine',
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
  },
  {
    slug: 'ocr-pdf',
    title: 'OCR PDF',
    description: 'Easily convert scanned PDF into searchable and selectable documents.',
    category: 'scan',
    icon: 'ScanText',
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
  },
  {
    slug: 'repair-pdf',
    title: 'Repair PDF',
    description: 'Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.',
    category: 'scan',
    icon: 'Wrench',
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
  },
  {
    slug: 'compare-pdf',
    title: 'Compare PDF',
    description: 'Show a side-by-side document comparison and easily spot changes between different file versions.',
    category: 'scan',
    icon: 'GitCompare',
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
  },
  {
    slug: 'pdf-forms',
    title: 'PDF Forms',
    description: 'Create, fill and submit PDF forms digitally. Save time on paperwork.',
    category: 'scan',
    icon: 'ClipboardList',
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
  },

  // AI TOOLS
  {
    slug: 'ai-summarizer',
    title: 'AI Summarizer',
    description: 'Instantly summarize any PDF document with AI. Get key insights in seconds.',
    category: 'ai',
    icon: 'Sparkles',
    color: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    isAI: true
  },
  {
    slug: 'translate-pdf',
    title: 'Translate PDF',
    description: 'Translate your PDF into 40+ languages using AI while preserving the original formatting.',
    category: 'ai',
    icon: 'Languages',
    color: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    isAI: true
  }
];
