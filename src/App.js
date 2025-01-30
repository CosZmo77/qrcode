import { QRCodeSVG } from "qrcode.react";
import React, { useState, useRef } from "react";

const App = () => {
  const [text, setText] = useState("");
  const qrRef = useRef(); // Create ref for QR code container

  const handleDownload = () => {
    if (!text) return; // Don't download if no text

    // Get SVG element
    const svg = qrRef.current.querySelector("svg");

    // Serialize SVG to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    // Create Blob and URL
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // Create temporary link
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg"; // Default filename
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="container">
        <h1>QR Code Generator</h1>
        <div ref={qrRef}>
          <QRCodeSVG value={text} />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Your Text"
        />
        <button onClick={handleDownload} disabled={!text}>
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default App;
