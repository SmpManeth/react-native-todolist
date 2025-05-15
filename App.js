import { Text, View } from "react-native";
import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";

const TODO_LIST = [
  { id: 1, title: "Todo 1", isCompleted: true },
  { id: 2, title: "Todo 2", isCompleted: false },
  { id: 3, title: "Todo 3", isCompleted: false },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <CardTodo todo={TODO_LIST[0]} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Footer</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
