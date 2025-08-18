import type { JournalSummary } from "@/hooks/use-agent";

export const LLMResponse = ({
  response,
  isLoading,
}: {
  response?: JournalSummary;
  isLoading: boolean;
}) => {
  if (!response) {
    return (
      <div className="text-gray-500 text-center py-8">
        No summary available. Click "Get summary" to analyse your journal
        entries.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-gray-500 text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 font-geist">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
        <p className="text-gray-700 leading-relaxed">{response.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Themes</h3>
        <div className="flex flex-wrap gap-2">
          {response.keyThemes.map((theme, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Mood Analysis
        </h3>
        <p className="text-gray-700 leading-relaxed">{response.moodAnalysis}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Insights</h3>
        <ul className="space-y-2">
          {response.insights.map((insight, index) => (
            <li key={index} className="text-gray-700 flex items-start">
              <span className="text-green-500 mr-2 mt-1">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-500 border-t pt-4">
        <p>
          Analysed {response.entryCount} entries from {response.dateRange.from}{" "}
          to {response.dateRange.to}
        </p>
      </div>
    </div>
  );
};
