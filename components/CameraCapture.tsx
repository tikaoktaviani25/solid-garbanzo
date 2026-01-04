'use client';

import { useState, useRef } from 'react';

interface CameraCaptureProps {
  onImageCapture: (file: File, previewUrl: string) => void;
  isAnalyzing: boolean;
}

export default function CameraCapture({ onImageCapture, isAnalyzing }: CameraCaptureProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    onImageCapture(file, previewUrl);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10 scale-105'
            : 'border-gray-600 hover:border-purple-400 bg-gray-800/50'
        } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={isAnalyzing}
        />

        <div className="flex flex-col items-center gap-6">
          {/* Camera Icon */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {isAnalyzing ? 'Analyzing Image...' : 'Snap or Upload a Product'}
            </h3>
            <p className="text-gray-400 mb-4">
              Take a photo or upload an image to find products and compare prices
            </p>
          </div>

          {/* Upload Button */}
          {!isAnalyzing && (
            <button
              onClick={handleButtonClick}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Choose Image
            </button>
          )}

          {/* Loading Spinner */}
          {isAnalyzing && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-300">Processing your image...</span>
            </div>
          )}

          {/* Supported Formats */}
          <p className="text-sm text-gray-500 mt-4">
            Supports: JPG, PNG, WEBP, GIF
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="text-3xl mb-2">🔍</div>
          <h4 className="font-semibold text-white mb-1">AI Recognition</h4>
          <p className="text-sm text-gray-400">Advanced AI identifies products instantly</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="text-3xl mb-2">💰</div>
          <h4 className="font-semibold text-white mb-1">Price Comparison</h4>
          <p className="text-sm text-gray-400">Compare prices across multiple stores</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="text-3xl mb-2">⚡</div>
          <h4 className="font-semibold text-white mb-1">Instant Results</h4>
          <p className="text-sm text-gray-400">Get matches in seconds</p>
        </div>
      </div>
    </div>
  );
}
