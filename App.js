import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useEffect, useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  let isFirstLaunch = true;
  let isLoadUpdate = false;
  const [slelectedTabName, setSelectedTabName] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [todoList, setTodoList] = useState([
    {
      id: Math.random().toString(),
      title: "Todo 1",
      isCompleted: false,
    },
    {
      id: Math.random().toString(),
      title: "Todo 2",
      isCompleted: true,
    },
    {
      id: Math.random().toString(),
      title: "Todo 3",
      isCompleted: false,
    },
  ]);
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    loadTodoList();
  },[]);

  useEffect(() => {
    if (isFirstLaunch) {
      if (!isFirstLaunch) {
        saveTodoList();
      } else {
        isFirstLaunch = false;
      }
    }else{
      isLoadUpdate = false;
    }
  }, [todoList]);

  async function loadTodoList() {
    console.log("loadTodoList");
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      if (todoListString) {
        const todoList = JSON.parse(todoListString);
        setTodoList(todoList);
      }
    } catch (err) {
      alert(err);
    }
  }

  async function saveTodoList() {
    console.log("saveTodoList");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert(err);
    }
  }

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
        <Dialog.Button
          disabled={todoTitle.length === 0}
          label="Save"
          onPress={() => {
            addTodo();
          }}
        />
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
