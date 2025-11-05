import { Post } from '@/generated/prisma';
import { SinglePost } from '@/utils/types';

export async function getPosts(pageNumber: string | undefined): Promise<Post[]> {
  const response = await fetch(`http://localhost:3000/api/posts?pageNumber=${pageNumber}`, { cache: "no-store" });
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 30 } });
  // update caching memory every 30 seconds

  if (!response.ok) {
    throw new Error("failed to fetch posts");
  }

  const res = await response.json();  //transform json file to javascript object
  return res.posts;
}

export async function getPostsCount(): Promise<number> {
  const response = await fetch(`http://localhost:3000/api/posts/count`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("failed to get posts count");
  }

  const { count } = await response.json() as { count: number }
  return count
}

export async function getPostsBasedOnSearch(searchText: string): Promise<Post[]> {
  const response = await fetch(`http://localhost:3000/api/posts/search?searchText=${searchText}`, { cache: "no-store" });
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 30 } });
  // update caching memory every 30 seconds

  if (!response.ok) {
    throw new Error("failed to fetch posts");
  }

  const res = await response.json();  //transform json file to javascript object
  return res.posts;
}

export async function getSinglePost(postId: string):Promise<SinglePost> {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("failed to fetch post");
  }

  return response.json();
}