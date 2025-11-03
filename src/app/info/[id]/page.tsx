import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { Post } from "@/generated/prisma";

// in dynamic routes like this , nextjs put the dynamic value in props of the page
interface SinglePostPageProps {
  params: { id: string }
}

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const response = await fetch(`http://localhost:3000/api/posts/${params.id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const post: Post = await response.json();

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8" style={{ padding: '2rem' }}>
      <div className="bg-white rounded-lg" style={{ padding: '2rem' }}>
        <h1 className="text-3xl font-bold text-gray-700">
          {post.title}
        </h1>
        <div className="text-gray-700">8/12/2024</div>
        <p className="text-gray-800 text-xl">{post.desc}</p>
      </div>
      <AddCommentForm />
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </section>
  )
}

export default SinglePostPage
