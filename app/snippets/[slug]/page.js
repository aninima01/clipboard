import { Snippet } from "@/models/Snippet";
import { connect } from "@/utils/db";

export default async function SnippetPage({ params: paramsPromise }) {
  // await the promise
  const resolvedParams = await paramsPromise;
  const { slug } = resolvedParams;
  await connect();

  // console.log("params:", params);

  const snippetObject = await Snippet.findOne({ slug });

  console.log("Fetching snippet for slug:", slug);

  console.log("Fetched snippet:", snippetObject);

  if (!snippetObject) {
    return <p>Snippet not found</p>;
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center mt-20">
        <a
          href="/"
          className="text-white font-semibold bg-zinc-950 text-4xl p-2 rounded hover:opacity-80"
        >
          Clipboard.io
        </a>

        <p className="mt-5 text-xl text-center">
          Paste your text or code below to instantly generate a simple,<br></br>
          shareable link. The fastest way to share snippets online.
        </p>
      </div>

      <div className="mt-5 flex flex-col justify-between items-center">
        <textarea
          disabled
          value={snippetObject.snippet}
          placeholder="Write your text here"
          className="border border-gray-300 rounded-lg p-4 w-2/3 h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
    </>
  );
}
