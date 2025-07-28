import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText, File, Image, Music, Video, Archive, CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/_layout/downloads")({
  component: FileDownloadTest,
});

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  sizeBytes: number;
  description: string;
  icon: any;
  downloadUrl: string;
}

function FileDownloadTest() {
  const [downloadStatus, setDownloadStatus] = useState<Record<string, 'idle' | 'downloading' | 'completed'>>({});

  const mockFiles: FileItem[] = [
    {
      id: "sample-text",
      name: "sample-document.txt",
      type: "Text Document",
      size: "2.5 KB",
      sizeBytes: 2560,
      description: "Sample text file with Lorem ipsum content",
      icon: FileText,
      downloadUrl: "#download-text",
    },
    {
      id: "sample-json",
      name: "data-export.json",
      type: "JSON Data",
      size: "5.2 KB",
      sizeBytes: 5324,
      description: "JSON file containing structured test data",
      icon: File,
      downloadUrl: "#download-json",
    },
    {
      id: "sample-csv",
      name: "users-list.csv",
      type: "CSV Spreadsheet",
      size: "8.7 KB",
      sizeBytes: 8912,
      description: "CSV file with sample user data",
      icon: FileText,
      downloadUrl: "#download-csv",
    },
    {
      id: "sample-image",
      name: "test-image.png",
      type: "PNG Image",
      size: "125 KB",
      sizeBytes: 128000,
      description: "Sample PNG image for testing",
      icon: Image,
      downloadUrl: "#download-image",
    },
    {
      id: "sample-pdf",
      name: "report.pdf",
      type: "PDF Document",
      size: "342 KB",
      sizeBytes: 350208,
      description: "Sample PDF document with test content",
      icon: FileText,
      downloadUrl: "#download-pdf",
    },
    {
      id: "sample-audio",
      name: "audio-sample.mp3",
      type: "MP3 Audio",
      size: "1.2 MB",
      sizeBytes: 1258291,
      description: "Short audio clip for testing",
      icon: Music,
      downloadUrl: "#download-audio",
    },
    {
      id: "sample-video",
      name: "video-clip.mp4",
      type: "MP4 Video",
      size: "5.8 MB",
      sizeBytes: 6082560,
      description: "Sample video file for download testing",
      icon: Video,
      downloadUrl: "#download-video",
    },
    {
      id: "sample-archive",
      name: "archive-files.zip",
      type: "ZIP Archive",
      size: "2.3 MB",
      sizeBytes: 2411724,
      description: "ZIP archive containing multiple test files",
      icon: Archive,
      downloadUrl: "#download-zip",
    },
  ];

  const handleDownload = async (file: FileItem) => {
    setDownloadStatus(prev => ({ ...prev, [file.id]: 'downloading' }));

    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      // Create and trigger download
      const content = generateFileContent(file);
      const blob = new Blob([content], { type: getContentType(file.type) });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadStatus(prev => ({ ...prev, [file.id]: 'completed' }));
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, [file.id]: 'idle' }));
    }
  };

  const generateFileContent = (file: FileItem): string => {
    switch (file.type) {
      case "Text Document":
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
      case "JSON Data":
        return JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          data: { users: 100, files: 25, downloads: 500 },
          version: "1.0.0"
        }, null, 2);
      case "CSV Spreadsheet":
        return "Name,Email,Age,City\nJohn Doe,john@example.com,30,New York\nJane Smith,jane@example.com,25,Los Angeles\nBob Johnson,bob@example.com,35,Chicago";
      default:
        return `Mock content for ${file.name}\nGenerated on: ${new Date().toLocaleString()}\nFile size: ${file.size}\nType: ${file.type}`;
    }
  };

  const getContentType = (fileType: string): string => {
    switch (fileType) {
      case "JSON Data": return "application/json";
      case "CSV Spreadsheet": return "text/csv";
      case "Text Document": return "text/plain";
      default: return "application/octet-stream";
    }
  };

  const getTotalSize = () => {
    const totalBytes = mockFiles.reduce((sum, file) => sum + file.sizeBytes, 0);
    return (totalBytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Download className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold" data-testid="downloads-heading">
            File Download Test Center
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test automated file downloads with various file types and sizes. Perfect for validating 
          Playwright download capabilities and file handling automation.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{mockFiles.length}</div>
          <div className="text-sm text-muted-foreground">Total Files</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{getTotalSize()}</div>
          <div className="text-sm text-muted-foreground">Total Size</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {Object.values(downloadStatus).filter(s => s === 'completed').length}
          </div>
          <div className="text-sm text-muted-foreground">Downloaded</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {new Set(mockFiles.map(f => f.type)).size}
          </div>
          <div className="text-sm text-muted-foreground">File Types</div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Downloads</h2>
          <Button 
            variant="outline"
            onClick={() => setDownloadStatus({})}
            data-testid="reset-downloads"
          >
            Reset Status
          </Button>
        </div>

        <div className="grid gap-4">
          {mockFiles.map((file) => {
            const Icon = file.icon;
            const status = downloadStatus[file.id] || 'idle';
            
            return (
              <div 
                key={file.id} 
                className="border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                data-testid={`download-item-${file.id}`}
              >
                <div className="p-3 rounded-lg bg-muted">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 
                      className="font-semibold truncate"
                      data-testid={`file-name-${file.id}`}
                    >
                      {file.name}
                    </h3>
                    {status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span data-testid={`file-type-${file.id}`}>{file.type}</span>
                    <span data-testid={`file-size-${file.id}`}>{file.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {file.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleDownload(file)}
                    disabled={status === 'downloading'}
                    data-testid={`download-button-${file.id}`}
                    variant={status === 'completed' ? 'outline' : 'default'}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {status === 'downloading' ? 'Downloading...' : 
                     status === 'completed' ? 'Download Again' : 'Download'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="border rounded-lg p-6 bg-muted/30">
        <h3 className="text-lg font-semibold mb-4">Bulk Download Options</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <Button 
            variant="outline" 
            className="w-full"
            data-testid="download-all-small"
            onClick={() => {
              const smallFiles = mockFiles.filter(f => f.sizeBytes < 10000);
              smallFiles.forEach(file => handleDownload(file));
            }}
          >
            Download Small Files (&lt;10KB)
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            data-testid="download-all-documents"
            onClick={() => {
              const docFiles = mockFiles.filter(f => f.type.includes('Document') || f.type.includes('Data'));
              docFiles.forEach(file => handleDownload(file));
            }}
          >
            Download All Documents
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            data-testid="download-all-media"
            onClick={() => {
              const mediaFiles = mockFiles.filter(f => f.type.includes('Image') || f.type.includes('Audio') || f.type.includes('Video'));
              mediaFiles.forEach(file => handleDownload(file));
            }}
          >
            Download All Media
          </Button>
        </div>
      </div>

    </div>
  );
}