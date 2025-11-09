import React, { useRef, useEffect, useState } from 'react';

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [landmark, setLandmark] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  const captureFrame = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append('file', blob, 'frame.png');

      const res = await fetch('http://localhost:8000/scan', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setLandmark(data.landmark);
      alert(`Detected landmark: ${data.landmark}`);
    }, 'image/png');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <video ref={videoRef} autoPlay muted className="w-80 rounded-lg border" />
      <button
        onClick={captureFrame}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold"
      >
        SCAN
      </button>
      {landmark && <p className="mt-4 font-semibold">Detected: {landmark}</p>}
    </div>
  );
}
