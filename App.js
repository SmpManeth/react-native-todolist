import { ScrollView, Text, View } from "react-native";
import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Todo 1", isCompleted: true },
    { id: 2, title: "Todo 2", isCompleted: false },
    { id: 3, title: "Todo 3", isCompleted: false },
    { id: 4, title: "Todo 4", isCompleted: true },
    { id: 5, title: "Todo 5", isCompleted: false },
    { id: 6, title: "Todo 6", isCompleted: true },
    { id: 7, title: "Todo 7", isCompleted: false },
    { id: 8, title: "Todo 8", isCompleted: true },
  ]);

  function renderTodoList() {
    return todoList.map((todo) => <CardTodo onPress={updateTodo} key={todo.id} todo={todo} />);
  }

  function updateTodo(todo){
    const updatedTodo = {
      ...todo , isCompleted: !todo.isCompleted
    };
    setTodoList(
      todoList.map((item) => (item.id === todo.id ? updatedTodo : item))
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <ScrollView>{renderTodoList()}</ScrollView>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Footer</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
