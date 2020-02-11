import React from 'react'
import { ScrollView, TouchableWithoutFeedback, Alert } from 'react-native'
import { DrawerNavigatorItems } from 'react-navigation-drawer'

import storage from '../../services/storage'

import {
  HeaderBackground, DrawerItemsContainer,
  InitialLetterContainer, InitialLetterText, ProfileName, Divider,
  LogoutContainer, LogoutText, LogoutIcon
} from './styles'

const username = storage.getUser()

export default function SidebarHeader(props) {
  return (
    <ScrollView>
      <HeaderBackground>
        <InitialLetterContainer>
          <InitialLetterText>{username.toUpperCase().substr(0, 1)}</InitialLetterText>
        </InitialLetterContainer>
        <ProfileName>Bem-vindo(a) {username}</ProfileName>
      </HeaderBackground>

      <DrawerItemsContainer>
        <DrawerNavigatorItems {...props} />
        <Divider />

        <TouchableWithoutFeedback onPress={() => {
          Alert.alert(
            'Sair',
            'Deseja sair da sua conta?',
            [
              {
                text: 'Não',
                style: 'cancel'
              },
              {
                text: 'Sim',
                onPress: () => {
                  storage.setToken(null)
                  storage.setUser(null)

                  props.navigation.navigate('Login')
                }
              }
            ],
            { cancelable: true }
          )
        }}>
          <LogoutContainer>
            <LogoutIcon />
            <LogoutText>Sair</LogoutText>
          </LogoutContainer>
        </TouchableWithoutFeedback>
      </DrawerItemsContainer>
    </ScrollView>
  )
}
