import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

  // const posts =  [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: { _id: 1, name: 'Awadhesh'},
  //   _id: 1,
  //   description: "This is description",
  //   image: "https://static.vecteezy.com/system/resources/previews/021/863/785/large_2x/ai-robot-thinking-with-hand-on-chin-artificial-intelligence-glowing-light-background-generative-ai-photo.jpeg",
  //   category: "Robots",
  //   title: "We Robots"
  // }]

  return (
    <>
      {/* Hero Section */}
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Enterpreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      {/* StartUp Section */}

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
