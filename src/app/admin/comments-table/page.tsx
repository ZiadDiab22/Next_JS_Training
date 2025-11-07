import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyTokenForPage } from '@/utils/verifyToken'

const AdminCommentsTable = async () => {
  const token = (await cookies()).get("jwtToken")?.value
  if (!token) redirect("/");

  const user = verifyTokenForPage(token);
  if (user?.isAdmin === false) redirect("/")

  return (
    <div>AdminCommentsPage</div>
  )
}

export default AdminCommentsTable