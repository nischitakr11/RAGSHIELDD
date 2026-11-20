
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "");

// Check backend connection
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/api/health`);
  if (!response.ok) throw new Error("Backend connection failed");
  return response.text();
}

// Register a document
export async function uploadDocument(file: File) {
  const response = await fetch(
    `${API_BASE}/api/upload?filename=${encodeURIComponent(file.name)}`,
    {
      method: "POST",
      body: file,
    }
  );

  const result = await response.text();

  if (!response.ok) throw new Error(result);
  return result;
}

// Verify a registered document
export async function verifyDocument(filename: string) {
  const response = await fetch(
    `${API_BASE}/api/verify?filename=${encodeURIComponent(filename)}`,
    { method: "POST" }
  );

  const result = await response.text();

  if (!response.ok) throw new Error(result);
  return result;
}

// Get ledger records
export async function getLedger() {
  const response = await fetch(`${API_BASE}/api/ledger`);

  const result = await response.text();

  if (!response.ok) throw new Error(result);
  return result;
}
