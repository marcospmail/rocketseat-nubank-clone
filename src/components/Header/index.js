import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import { Container, Top, Logo, Title } from './styles';

import logo from '~/assets/Nubank_Logo.png';

const AnimatableIcon = Animatable.createAnimatableComponent(Icon);

export default function Header({ translateY, animateCard }) {
  function handleArrowClick() {
    animateCard();
  }

  return (
    <Container>
      <Top>
        <Logo source={logo} />
        <Title>Marcos</Title>
      </Top>
      <AnimatableIcon
        name="keyboard-arrow-down"
        size={20}
        color="#FFF"
        onPress={handleArrowClick}
        style={{
          transform: [
            {
              rotate: translateY.interpolate({
                inputRange: [0, 420],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        }}
      />
    </Container>
  );
}
