import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Animated,
  StyleSheet,
} from 'react-native';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const colors = {
  theme: '#4263ec',
  white: '#ffffff',
  background: '#f4f6fc',
  greyish: '#a4a4a4',
  tint: '#2b49c3',
};

const Todo = ({todo, stamp, setTodos, todos}) => {
  const formattedDate = moment(stamp).format('MMMM, Do YYYY hh:mm A');
  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-150, -95, -50, 0],
      outputRange: [1.2, 1, 0.7, 0.5],
      extrapolate: 'clamp',
    });
    const opacity = dragX.interpolate({
      inputRange: [-90, -70, -50, -20, 0],
      outputRange: [1, 0.7, 0.5, 0.3, 0],
      extrapolate: 'clamp',
    });
    const deleteTodo = todo => {
      setTodos(todos.filter(item => item.todo !== todo));
    };
    return (
      <>
        <TouchableOpacity onPress={() => deleteTodo(todo)}>
          <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
            <Animated.Text
              style={{
                transform: [{scale}],
              }}>
              <MaterialCommunityIcons
                name="trash-can"
                color="white"
                size={30}
              />
            </Animated.Text>
            <Animated.Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 15,
                transform: [{scale}],
              }}>
              remove
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <Swipeable renderRightActions={LeftActions}>
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: 'row',
          marginHorizontal: 16,
          marginVertical: 4,
          borderRadius: 20,
          paddingVertical: 24,
          paddingHorizontal: 14,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>{todo}</Text>
            <Text
              style={{color: colors.greyish, fontSize: 16, fontWeight: '600'}}>
              {formattedDate}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginHorizontal: 10}}>
            <MaterialCommunityIcons
              name="pencil"
              color={colors.theme}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const TodoList = ({todos, setTodos}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{backgroundColor: colors.theme, flex: 1}}>
      <View style={{padding: 20, backgroundColor: colors.background}}>
        <Text style={{fontSize: 24}}>Todos</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['coral', 'deepskyblue', 'deeppink', 'gainsboro']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={todos}
        renderItem={({item}) => (
          <Todo
            todo={item.todo}
            stamp={item.stamp}
            setTodos={setTodos}
            todos={todos}
          />
        )}
        keyExtractor={item => item.todo}
        style={{backgroundColor: colors.background}}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    marginTop: 10,
    height: '80%',
    borderRadius: 10,
  },
});
export default TodoList;
