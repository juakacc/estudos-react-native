import React from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Feed from './screens/Feed'
import AddPhoto from './screens/addPhoto'

const MenuRoutes = {
    Feed: {
        name: 'Feed',
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({tintColor}) =>
                <Icon name='home' size={30} color={tintColor} />
        }
    },
    Add: {
        name: 'AddPhoto',
        screen: AddPhoto,
        navigationOptions: {
            title: 'Add Picture',
            tabBarIcon: ({tintColor}) =>
                <Icon name='camera' size={30} color={tintColor} />
        }
    },
    Profile: {
        name: 'Profile',
        screen: Feed,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({tintColor}) =>
                <Icon name='user' size={30} color={tintColor} />
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: false,
    }
}

const MenuNavigation = createBottomTabNavigator(MenuRoutes, MenuConfig)
export default MenuNavigation