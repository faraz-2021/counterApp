import React, { useState, useRef  } from "react";
import { View, Text, TouchableOpacity ,StyleSheet} from "react-native";

export default function Counter() {

    const [timer, setTimer] = useState(3595)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const increment = useRef(null)


  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  
  return (
    <View >
      <View >
        <Text style={styles.timer}>{formatTime()}</Text>
        <View style={styles.btn}>
          {
            !isActive && !isPaused ?
              <TouchableOpacity style={styles.btn1} onPress={handleStart}><Text>Start</Text></TouchableOpacity>
              : (
                isPaused ? <TouchableOpacity style={styles.btn1} onPress={handlePause}><Text>Pause</Text></TouchableOpacity> :
                  <TouchableOpacity style={styles.btn1} onPress={handleResume}><Text>Resume</Text></TouchableOpacity>
              )
          }
          <TouchableOpacity style={styles.btn1}  onPress={handleReset} disabled={!isActive}><Text>Reset</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    btn: {
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    fontSize:15,
   

    },
    btn1:{
        borderWidth:1,
        borderRadius:10,
        fontSize:15,
        justifyContent:"center",
        alignItems:"center",
        width:70,
        height:40
   },
   timer:{
       fontSize:30
   }
})
