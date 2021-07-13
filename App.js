import React, {useEffect, useState, useMemo} from 'react';
import {Button, StatusBar, StyleSheet, TextInput, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TodoList from './src/TodoList';

const createChannels = () => {
  PushNotification.createChannel({
    channelId: 'test channel',
    channelName: 'chikkinavvi',
  });
};

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    createChannels();
  }, []);

  todos.map(
    (item, i) =>
      todos.length !== 0 &&
      item.stamp > new Date(Date.now()) &&
      PushNotification.localNotificationSchedule({
        channelId: 'test channel',
        message: item.todo,
        date: item.stamp,
      }),
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState('');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setTodos([...todos, {todo: text, theme: '#008b8b', stamp: date}]);
    setText('');
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#4263ec" />
      <TextInput
        placeholder="Add todo"
        style={styles.input}
        onChangeText={val => setText(val)}
        value={text}
      />
      <TodoList todos={todos} setTodos={setTodos} />
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          isDarkModeEnabled={true}
          is24Hour={false}
          timePickerModeAndroid="spinner"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 20,
    color: 'black',
    fontWeight: '600',
  },
});

export default App;
