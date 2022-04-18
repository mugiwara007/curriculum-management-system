import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Register from './register';
import Account from './account';
import Colleges from './colleges';
import Curriculum from './curriculum';
import Customers from './customers';
import Departments from './departments';
import Dashboard from '.';
import Products from './products';
import Settings from './settings';
import Subjects from './subjects';

function Navigation() {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Colleges" component={Colleges} />
            <Stack.Screen name="Curriculum" component={Curriculum} />
            <Stack.Screen name="Customers" component={Customers} />
            <Stack.Screen name="Departments" component={Departments} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Subjects" component={Subjects} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation