import { Image, Text, View } from "react-native";
import {styles} from "./Header.style";  
import logo from "../../assets/logo.png"; // Adjust the path as needed

export function Header(){
    return(
        <View style={styles.header}>
            <Image resizeMode="contain" style={styles.image} source={logo} />
            <Text style={styles.subtitel}>This is the Header</Text>
        </View>
    );
}