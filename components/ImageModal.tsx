import React, { useState, useRef } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    imageName: string;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    imageUrl,
    imageName,
    onClose,
}) => {
    const [zoom, setZoom] = useState(1);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 4));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
    const handleResetZoom = () => setZoom(1);
    const handleFitToWindow = () => {
        if (!imageRef.current || !containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const imgWidth = imageRef.current.naturalWidth;
        const imgHeight = imageRef.current.naturalHeight;
        const fitZoom = Math.min(containerWidth / imgWidth, containerHeight / imgHeight) * 0.9;
        setZoom(Math.max(fitZoom, 0.5));
    };

    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) setZoom(Math.max(0.5, Math.min(value, 4)));
    };

    const blockEvent = (e: React.MouseEvent | React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {imageName}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Image Container */}
                <div ref={containerRef} className="relative overflow-hidden bg-gray-50 flex items-center justify-center" style={{ height: "400px" }}>
                    <div
                        className="protected-image-wrapper relative"
                        style={{
                            transform: `scale(${zoom})`,
                            transition: "transform 0.2s ease",
                        }}
                        onContextMenu={blockEvent}
                        onDragStart={blockEvent}
                    >
                        <img
                            ref={imageRef}
                            src={imageUrl}
                            alt={imageName}
                            draggable={false}
                            className="protected-image max-h-96 max-w-full object-contain"
                        />
                        <div className="protected-image-overlay absolute inset-0" onContextMenu={blockEvent} />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-gray-50 border-t border-gray-200">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleZoomOut}
                            disabled={zoom <= 0.5}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>

                        <input
                            type="number"
                            min="50"
                            max="400"
                            step="10"
                            value={(zoom * 100).toFixed(0)}
                            onChange={handleZoomChange}
                            className="w-16 px-2 py-2 text-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 font-medium">%</span>

                        <button
                            onClick={handleZoomIn}
                            disabled={zoom >= 4}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleResetZoom}
                            title="Reset zoom to 100%"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleFitToWindow}
                            title="Fit image to window"
                            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                        >
                            Fit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
