import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { TodoList } from "@/components/TodoComponents";
import { AddTodo } from "@/components/TodoComponents";
import { TodoStats } from "@/components/TodoComponents";

const TodoPage = () => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React Native", completed: false },
    { id: "2", title: "Build Todo App", completed: false },
  ]);

  // Add new todo
  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle todo completion
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AddTodo onAdd={handleAddTodo} />

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />

        <TodoStats todos={todos} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 20, // Add padding to avoid status bar
  },
});

export default TodoPage;
