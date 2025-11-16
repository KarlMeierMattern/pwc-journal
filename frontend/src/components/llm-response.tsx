import type { JournalSummary } from "@/hooks/use-agent";
import { useState } from "react";
import { Copy } from "lucide-react";

export const LLMResponse = ({
  response,
  isLoading,
}: {
  response?: JournalSummary;
  isLoading: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    if (!response) return;

    // Combine all text fields into a single string
    const textToCopy = [
      "Summary:\n" + response.summary,
      "Key Themes:\n" + response.keyThemes.join(", "),
      "Insights:\n" + response.insights.join("\n"),
      "Framework:\n" +
        Object.entries(response.framework)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n"),
    ].join("\n\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!response) {
    return (
      <div className="text-stone-600 text-sm text-center py-8 bg-stone-100/80">
        Click "Get summary" to analyse your journal entries.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-gray-500 text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 font-geist text-stone-600 bg-stone-100/80">
      <div className="flex justify-end items-center space-x-2">
        <Copy
          className={`w-5 h-5 cursor-pointer transition ${
            copied ? "text-stone-400" : "text-stone-600"
          }`}
          onClick={handleCopyAll}
        />
        {copied && <span className="text-sm text-stone-400">Copied!</span>}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-stone-800 mb-2">Summary</h3>
        <p className="text-gray-700 leading-relaxed">{response.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-stone-800 mb-2">
          Key Themes
        </h3>
        <div className="flex flex-wrap gap-2">
          {response.keyThemes.map((theme, index) => (
            <span
              key={index}
              className="bg-custom-orange-dark text-white px-3 py-1 rounded-full text-sm"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-stone-800 mb-2">Insights</h3>
        <ul className="space-y-2">
          {response.insights.map((insight, index) => (
            <li key={index} className="text-gray-700 flex items-start">
              <span className="text-black mr-2 mt-1">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-stone-800 mb-2">
          PwC Evolved Professional Framework
        </h3>
        <ul className="space-y-3">
          {Object.entries(response.framework).map(([key, value]) => (
            <li key={key}>
              <p className="font-medium text-stone-800 capitalize">{key}</p>
              <p className="text-stone-700 mt-1">{value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-stone-500 border-t pt-4">
        <p>
          Analysed {response.entryCount} entries from {response.dateRange.from}{" "}
          to {response.dateRange.to}
        </p>
      </div>
    </div>
  );
};
