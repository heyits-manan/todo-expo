import { db } from "../utils/db";
import { todos } from "../utils/schema";
import { eq } from "drizzle-orm";

export async function getTodos(userId: string) {
  return db.select().from(todos).where(eq(todos.userId, userId));
}

export async function addTodo(text: string, userId: string) {
  return db.insert(todos).values({ text, userId }).returning();
}

export async function toggleTodo(id: number, completed: boolean) {
  return db
    .update(todos)
    .set({ completed })
    .where(eq(todos.id, id))
    .returning();
}

export async function deleteTodo(id: number) {
  return db.delete(todos).where(eq(todos.id, id));
}
