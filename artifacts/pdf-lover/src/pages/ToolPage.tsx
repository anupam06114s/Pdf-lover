import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, File, CheckCircle2, Download, AlertCircle } from 'lucide-react';
import { tools } from '@/data/tools';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import NotFound from './not-found';

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find((t) => t.slug === slug);
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  if (!tool) {
    return <NotFound />;
  }

  // @ts-ignore
  const IconComponent = LucideIcons[tool.icon] || LucideIcons.FileQuestion;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setIsSuccess(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsSuccess(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // Simulate network delay / processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  const resetState = () => {
    setSelectedFile(null);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 flex flex-col">
      <div className="container mx-auto px-4 max-w-4xl flex-1 flex flex-col">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all tools
        </Link>

        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn("w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6", tool.color)}
          >
            <IconComponent className="w-8 h-8" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{tool.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-card border border-border rounded-3xl shadow-lg p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "w-full max-w-xl aspect-[4/3] md:aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all relative z-10",
                  dragActive ? "border-primary bg-primary/5 scale-105" : "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                data-testid="upload-zone"
              >
                <div className="p-4 bg-background rounded-full shadow-sm mb-4">
                  <Upload className={cn("w-8 h-8 transition-colors", dragActive ? "text-primary" : "text-muted-foreground")} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Drag & drop your file here</h3>
                <p className="text-muted-foreground mb-6">or click to browse files</p>
                
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleChange}
                  data-testid="file-input"
                  accept={tool.category === 'scan' ? "image/*,.pdf" : ".pdf"}
                />
                <label 
                  htmlFor="file-upload"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 cursor-pointer transition-all hover:shadow-md hover:shadow-primary/20 active:scale-95"
                >
                  Select File
                </label>
                <p className="text-xs text-muted-foreground mt-4">Supports files up to 100MB</p>
              </motion.div>

            ) : isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md text-center py-12 z-10"
              >
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <svg className="animate-spin w-full h-full text-primary/20" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <IconComponent className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Processing your file...</h3>
                <p className="text-muted-foreground">This usually takes just a few seconds.</p>
              </motion.div>

            ) : isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md text-center py-10 z-10"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { type: "spring", damping: 12 } }}
                  className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full mx-auto flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Task Complete!</h3>
                <p className="text-muted-foreground mb-8">Your file has been successfully processed.</p>
                
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download File
                  </button>
                  <button 
                    onClick={resetState}
                    className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Process another file
                  </button>
                </div>
              </motion.div>

            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md bg-background border border-border rounded-2xl p-6 shadow-sm z-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <File className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-full transition-colors"
                    title="Remove file"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </button>
                </div>

                <button 
                  onClick={processFile}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                  data-testid="process-button"
                >
                  Process File
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
