import { getPostsBasedOnSearch } from "@/ApiCalls/PostApiCall";
import { Post } from "@/generated/prisma";
import Link from "next/link";

interface SearchPostPageProps {
  searchParams: { searchText: string }
}

const SearchPostPage = async ({ searchParams: { searchText } }: SearchPostPageProps) => {
  const data: Post[] = await getPostsBasedOnSearch(searchText);

  return (
    <section className='fix-height container m-auto px-5'>
      {data.length === 0 ? (
        <h2 className="text-2xl font-bold mb-2 mt-7">Posts Based on :
          <span className="ms-1 text-red-700 text-2xl font-bold mx-1">{searchText}</span>
          <p>Not Found!</p>
        </h2>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-2 mt-7">Posts Based on :
            <span className="ms-1 text-green-700 text-3xl font-bold">{searchText}</span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {data.map(item => (
              <div className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4" key={item.id}>
                <h3 className='text-xl font-bold text-gray-900 line-clamp-1'>{item.title}</h3>
                <p className='my-2 text-xl text-gray-700 p-1 line-clamp-1'>{item.desc}</p>
                <Link className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg" href={`/info/${item.id}`}>
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchPostPage;
