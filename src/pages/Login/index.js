import React, { useState, useRef } from 'react'
import { TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'

import FullscreenBackgroundImage from '../../components/FullscreenBackgroundImage'
import AnimatedLogo from '../../components/AnimatedLogo'

import {
  ContainerSafeArea, ContainerAvoidView, FormContainer, ScrollFormContainer,
  InputTitle, InputContainer, Input, EnvelopeIcon, LockIcon, LoginButton,
  LoginButtonText, StyledIndicator, NewAccountButton, NewAccountButtonText,
  ForgotPasswordButton, ForgotPasswordButtonText
} from './styles'

export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputPasswordRef = useRef()

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  handleLogin = async () => {
    if (!email || !password) return

    Keyboard.dismiss()

    setIsLoading(true)

    await sleep(2000)

    navigation.navigate('Home')

    setIsLoading(false)
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      enabled={Platform.OS === 'ios'}
    >
      <ContainerAvoidView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ContainerSafeArea>
          <FullscreenBackgroundImage />

          <AnimatedLogo />

          <FormContainer>
            {
              isLoading ? (
                <StyledIndicator />
              ) : (
                  <ScrollFormContainer>
                    <InputTitle>USUÁRIO</InputTitle>
                    <InputContainer>
                      <Input
                        blurOnSubmit={false}
                        keyboardType='email-address'
                        placeholder='Digite seu e-mail'
                        onChangeText={text => setEmail(text)}
                        value={email}
                        returnKeyType='next'
                        onSubmitEditing={() => inputPasswordRef.current.focus()}
                      />
                      <EnvelopeIcon />
                    </InputContainer>

                    <InputTitle>SENHA</InputTitle>
                    <InputContainer>
                      <Input
                        secureTextEntry
                        ref={inputPasswordRef}
                        placeholder='Digite sua senha'
                        onChangeText={text => setPassword(text)}
                        value={password}
                        returnKeyType='done'
                        onSubmitEditing={handleLogin}
                      />
                      <LockIcon />
                    </InputContainer>

                    <LoginButton onPress={handleLogin}>
                      <LoginButtonText>LOGAR</LoginButtonText>
                    </LoginButton>

                    <NewAccountButton
                      onPress={() => navigation.navigate('CreateAccount')}
                    >
                      <NewAccountButtonText>
                        NÃO TENHO CONTA
                      </NewAccountButtonText>
                    </NewAccountButton>

                    <ForgotPasswordButton
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <ForgotPasswordButtonText>
                        Esqueci minha senha
                      </ForgotPasswordButtonText>
                    </ForgotPasswordButton>
                  </ScrollFormContainer>
                )
            }
          </FormContainer>
        </ContainerSafeArea>
      </ContainerAvoidView>
    </TouchableWithoutFeedback>
  )
}
