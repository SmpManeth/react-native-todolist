import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TabBottomMenu.style";

export function TabBottomMenu(props) {

    const countByStatus = props.todoList.reduce((acc, todo) => {
        if (todo.isCompleted) {
            acc.done += 1;
        } else {
            acc.inProgress += 1;
        }
        return acc;
    }, { all:  props.todoList.length ,done: 0, inProgress: 0 });

    function getTextStyle(tabName){
        return{
            fontWeight: "bold",
            color: props.slelectedTabName === tabName ? "#2f76E5" : "black",
            fontSize: 20,
        }
    }
  return (
    <View style={ styles.root}>
      <TouchableOpacity onPress={()=> props.onPress("all")} ><Text style={getTextStyle("all")} >All ({countByStatus.all})</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=> props.onPress("in-progress")}><Text style={getTextStyle("in-progress")} >In Progress ({countByStatus.inProgress})</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=> props.onPress("done")}><Text style={getTextStyle("done")} >Done ({countByStatus.done})</Text></TouchableOpacity>
    </View>
  );
}
