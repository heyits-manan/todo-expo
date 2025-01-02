// components/TodoItem.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={[styles.checkbox, todo.completed && styles.checked]}
        onPress={onToggle}
      />
      <Text style={[styles.todoText, todo.completed && styles.completedText]}>
        {todo.title}s
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

// components/AddTodo.js
export const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <View style={styles.addTodo}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add new todo..."
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

// components/TodoList.js
export const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <ScrollView style={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </ScrollView>
  );
};

// components/TodoStats.js
export const TodoStats = ({ todos }) => {
  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;

  return (
    <View style={styles.stats}>
      <Text style={styles.statsText}>
        Completed: {completed}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#007AFF",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  addTodo: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  todoList: {
    flex: 1,
  },
  stats: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  statsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
