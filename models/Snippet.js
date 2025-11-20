import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
  snippet: { type: String, required: true },
  slug: { type: String, required: true },
});

// Use existing model if it exists, otherwise create a new one
export const Snippet =
  mongoose.models.Snippet || mongoose.model("Snippet", SnippetSchema);
