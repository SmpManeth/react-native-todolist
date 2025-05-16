import { Image, Text, TouchableOpacity } from "react-native"
import {styless} from "./ButtonAdd.style"


export function ButtonAdd(props){
    return(
        <TouchableOpacity  style={styless.btn}>
            <Text style={ styless.text } >+ New Todo</Text>
        </TouchableOpacity>
    )
}