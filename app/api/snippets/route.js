import { connect } from "../../../utils/db";
import { Snippet } from "@/models/Snippet";
import Randomstring from "randomstring";

export async function POST(request) {
  await connect();

  const body = await request.json(); // Parse JSON body
  const slug = Randomstring.generate({
    length: 6,
    charset: "alphabetic",
  });

  const snippet = await Snippet.create({
    snippet: body.snippet, // Use parsed body
    slug,
  });

  console.log("Saved snippet:", snippet);

  return new Response(
    JSON.stringify({ slug: snippet.slug, snippet: snippet.snippet }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
