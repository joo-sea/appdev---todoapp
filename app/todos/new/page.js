import prisma from "@/lib/prisma";
import TodoForm from "../Form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export default async function NewTodo() {
    const session = await getServerSession(authOptions);

    const saveTodo = async (formData) => {
        "use server";
        const todo = await prisma.todo.create({
            data: {
                task: formData.get('task'),
                description: formData.get('description'),
                done: formData.get('done') ? true : false,
                deadlineAt: formData.get('deadlineAt') ? new Date(formData.get('deadlineAt')) : null,
                userId: session.user.id,
            }
        });
        redirect(`/todos/${todo.id}`);
    };
    return <TodoForm onSubmit={saveTodo} />
}