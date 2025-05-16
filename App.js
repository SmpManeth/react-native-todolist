import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";

export default function App() {
  const [slelectedTabName, setSelectedTabName] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

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
    return getFileteredTodoList().map((todo) => (
      <CardTodo
        onLongPress={deleteTodo}
        onPress={updateTodo}
        key={todo.id}
        todo={todo}
      />
    ));
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    setTodoList(
      todoList.map((item) => (item.id === todo.id ? updatedTodo : item))
    );
  }

  function deleteTodo(todo) {
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
          style: "destructive",
          onPress: () => {
            setTodoList(todoList.filter((item) => item.id !== todo.id));
          },
        },
      ]
    );
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={showAddDialog}
        onBackdropPress={() => setShowAddDialog(false)}
      >
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>Choose a Name to Your Todo</Dialog.Description>
        <Dialog.Input onChangeText={setTodoTitle} placeholder="Todo Title" />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => {
            setShowAddDialog(false);
          }}
        />
        <Dialog.Button disabled={todoTitle.length === 0}  label="Save" onPress={() => {addTodo()}} />
      </Dialog.Container>
    );
  }

  function addTodo() {
    const newTodo = {
      id: Math.random().toString(),
      title: todoTitle,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setShowAddDialog(false);
    setTodoTitle("");
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.app}>
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>

          <ButtonAdd onPress={() => setShowAddDialog(true)} />

          <View style={styles.footer}>
            <TabBottomMenu
              todoList={todoList}
              onPress={setSelectedTabName}
              slelectedTabName={slelectedTabName}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      {renderAddDialog()}
    </>
  );
}
