import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";

export default function App() {

  const [slelectedTabName, setSelectedTabName] = useState("all");

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

  
  function getFileteredTodoList() {
    if (slelectedTabName === "all") {
      return todoList;
    } else if (slelectedTabName === "in-progress") {
      return todoList.filter((todo) => !todo.isCompleted);
    } else if (slelectedTabName === "done") {
      return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function renderTodoList() {
    return getFileteredTodoList().map((todo) => <CardTodo onLongPress={deleteTodo} onPress={updateTodo} key={todo.id} todo={todo} />);
  }

  function updateTodo(todo){
    const updatedTodo = {
      ...todo , isCompleted: !todo.isCompleted
    };
    setTodoList(
      todoList.map((item) => (item.id === todo.id ? updatedTodo : item))
    );
  }

  function deleteTodo(todo){
    Alert.alert(
      "Delete Todo",
      `Are you sure you want to delete ${todo.title}?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setTodoList(todoList.filter((item) => item.id !== todo.id));
          },
        },
      ]
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
         <TabBottomMenu todoList={todoList} onPress={setSelectedTabName} slelectedTabName={slelectedTabName} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
