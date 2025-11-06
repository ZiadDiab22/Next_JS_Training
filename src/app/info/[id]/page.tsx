import { getSinglePost } from "@/ApiCalls/PostApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { Post } from "@/generated/prisma";
import { SinglePost } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

// in dynamic routes like this , nextjs put the dynamic value in props of the page
interface SinglePostPageProps {
  params: { id: string }
}

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const token = (await cookies()).get("jwtToken")?.value || ""
  const user = verifyTokenForPage(token);

  const post: SinglePost = await getSinglePost(params.id);

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8" style={{ padding: '2rem' }}>
      <div className="bg-white rounded-lg" style={{ padding: '2rem' }}>
        <h1 className="text-3xl font-bold text-gray-700">
          {post.title}
        </h1>
        <div className="text-gray-700">{new Date(post.createdAt).toDateString()}</div>
        <p className="text-gray-800 text-xl">{post.desc}</p>
      </div>
      <div className="mt-7">
        {user ? (<AddCommentForm postId={post.id} />) :
          (<p className="text-blue-600 md:text-xl">
            to write a comment you should login first
          </p>)}
      </div>
      {post.comments.length > 0 && (<h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>)}
      {post.comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} userId={user?.id} />
      ))}
    </section>
  )
}

export default SinglePostPage
