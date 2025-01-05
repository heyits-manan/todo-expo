import { useUser, useClerk } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { TodoItem } from "@/components/TodoItems";
import { getTodos, addTodo } from "../../utils/api";
import { useFocusEffect, useRouter } from "expo-router";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export default function TodoPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = useCallback(async () => {
    if (user?.id) {
      const fetchedTodos = await getTodos(user.id);
      setTodos(fetchedTodos);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos])
  );

  const handleAddTodo = async () => {
    if (newTodo.trim() && user?.id) {
      await addTodo(newTodo, user.id);
      setNewTodo("");
      fetchTodos();
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/"); // Redirect to the index page
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>
          Welcome, {user?.firstName || "User"}!
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Todo Input and List */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo..."
          placeholderTextColor="#666"
        />
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={handleAddTodo} />
        </View>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} onRefresh={fetchTodos} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 60,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
});
