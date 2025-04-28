import prisma from "@/lib/prisma";
import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { notFound, forbidden } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export default async function TodoView({ params }) {
  const id = (await params).id;
  const todo = await prisma.todo.findFirst({
    where: { id: parseInt(id) },
  });
  if (!todo) return notFound();
  const session = await getServerSession(authOptions);
  if (todo.userId !== session.user.id) return forbidden("You are not allowed to view this todo.");
  return (
    <Card>
      <h5 className="font-bold">{todo.task}</h5>
      <p>{todo.description ?? <em className="italic text-gray-500">N/A</em>}</p>
      <Button color="success" as={Link} href={`/todos/${id}/edit`}>
        Edit
      </Button>
      <Button color="failure" as={Link} href={`/todos/${id}/delete`}>
        Delete
      </Button>
    </Card>
  );
}
