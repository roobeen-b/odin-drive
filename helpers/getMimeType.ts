// Helper function to get MIME type from file extension
export const getMimeType = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  const mimeTypes: Record<string, string> = {
    txt: "text/plain",
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    webm: "video/webm",
    json: "application/json",
  };
  return mimeTypes[extension] || "application/octet-stream";
};
