import { View, Text, Pressable, StyleSheet } from "react-native";
import { toggleTodo, deleteTodo } from "@/utils/api";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onRefresh: () => void;
}

export function TodoItem({ todo, onRefresh }: TodoItemProps) {
  const handleToggle = async () => {
    await toggleTodo(todo.id, !todo.completed);
    onRefresh();
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onRefresh();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleToggle} style={styles.contentContainer}>
        <View
          style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
        />
        <Text style={[styles.text, todo.completed && styles.textCompleted]}>
          {todo.text}
        </Text>
      </Pressable>
      <Pressable onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  textCompleted: {
    color: "#666",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
