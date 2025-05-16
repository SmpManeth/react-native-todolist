import { Image, Text, TouchableOpacity } from "react-native"
import {styless} from "./CardTodo.style"
import checkImg from "../../assets/check.png"


export function CardTodo(props){
    return(
        <TouchableOpacity onLongPress={()=>props.onLongPress(props.todo)} onPress={()=>{props.onPress(props.todo)}} style={styless.card}>
            <Text style={ [styless.title ,  props.todo.isCompleted && { textDecorationLine:"line-through"}]} >{props.todo.title}</Text>
            {props.todo.isCompleted && <Image source={checkImg} style={styless.img}/>}
        </TouchableOpacity>
    )
}