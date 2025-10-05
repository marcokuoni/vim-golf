import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrJoin({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border">
      <QRCodeCanvas value={url} size={128} includeMargin />
      <div>
        <div className="text-sm text-gray-500">Beitreten via QR</div>
        <div className="font-mono text-lg break-all">{url}</div>
      </div>
    </div>
  );
}
