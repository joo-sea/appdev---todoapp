import prisma from "@/lib/prisma";
import { Table,  TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button } from "flowbite-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export default async function Todos() {
    const session = await getServerSession(authOptions);

    const todos = await prisma.todo.findMany({ 
        where: { userId: session.user.id },
        include: { 
            user: true 
        }
    });
    const tableRows = todos.map((todo) => <TableRow>
        <TableCell><Link href={`/todos/${todo.id}`} className="text-blue-500">{todo.id}</Link></TableCell>
        <TableCell>{todo.task}</TableCell>
        <TableCell>{todo.user.username}</TableCell>
    </TableRow>)
    return <div>
        <Button href="/todos/new" as={Link}>New</Button>
        <Table>
            <TableHead>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Todo</TableHeadCell>
                <TableHeadCell>Owner</TableHeadCell>
            </TableHead>
            <TableBody>
                {tableRows}
            </TableBody>
        </Table>
    </div>
}
