// 1. Journal Entry List Component
import { useNavigate } from "react-router-dom";

const JournalEntryList = () => {
  const navigate = useNavigate();

  const handleEntryClick = (entryId: number) => {
    navigate(`/journal/${entryId}`); // ✅ This sets the route parameter!
  };

  return (
    <div>
      {entries.map((entry) => (
        <div
          key={entry.id}
          onClick={() => handleEntryClick(entry.id)}
          className="cursor-pointer hover:bg-gray-100 p-4 border rounded"
        >
          <h3>Entry #{entry.id}</h3>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

// 2. Frontend Route Definition
<Route
  path="/journal/:id"
  element={
    <ProtectedRoute>
      <JournalEntryDetail />
    </ProtectedRoute>
  }
/>;

// 3. Frontend Component Gets ID from URL
import { useParams } from "react-router-dom";

const JournalEntryDetail = () => {
  const { id } = useParams(); // id = "123" from URL /journal/123

  // Use this ID to fetch the specific entry
  const { data: entry } = useJournalEntry(id);
};

// 4. Frontend API Call
export const useJournalEntry = (id: string) => {
  return useQuery({
    queryKey: ["journal", "entry", id],
    queryFn: () => fetch(`/api/v1/journal/${id}`).then((res) => res.json()),
  });
};

// 5. Backend Route Matches - captures the ID from the URL
router.get("/:id", authMiddleware, getJournalEntryById);

// 6. Backend Controller Gets ID
const { id } = req.params; // id = "123" from the route parameter
