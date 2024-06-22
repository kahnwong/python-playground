import { useStore } from "../store";

import { Button } from "./ui/button";
import { Replace, Download, Upload, Play } from "lucide-react";

interface TopNavProps {
  handleRunCode: () => Promise<void>;
}

export function TopNav({ handleRunCode }: TopNavProps) {
  const { code, setDirection, direction } = useStore();

  function handleChangeDirection() {
    setDirection(direction === "vertical" ? "horizontal" : "vertical");
  }

  function downloadCode() {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "code.py";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function shareCode() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", btoa(code));
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${urlParams.toString()}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
    navigator.clipboard.writeText(newUrl);
  }

  return (
    <section className="flex gap-2 justify-between p-2">
      <div className="flex gap-2 justify-center items-center grow">
        <Button onClick={handleRunCode} variant="secondary">
          <Play className="h-5 w-5" />
          <span className="ml-2">Run</span>
        </Button>
        <Button variant="outline" onClick={handleChangeDirection}>
          <Replace className="h-5 w-5" />
          <span className="ml-2">Direction</span>
        </Button>
        <Button variant="outline" onClick={downloadCode}>
          <Download className="h-5 w-5" />
          <span className="ml-2">Download</span>
        </Button>
        <Button variant="outline" onClick={shareCode}>
          <Upload className="h-5 w-5" />
          <span className="ml-2">Share</span>
        </Button>
      </div>
    </section>
  );
}