import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Menu from '~/components/Menu';
import Tabs from '~/components/Tabs';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
} from './styles';

function Main() {
  let offset = 0;
  let opened = false;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  function animateCard() {
    if (!opened) {
      translateY.setValue(offset);
      translateY.setOffset(0);
      offset = 0;
    }

    Animated.timing(translateY, {
      toValue: opened ? 420 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      offset = opened ? 420 : 0;
      translateY.setOffset(offset);
      translateY.setValue(0);
      opened = !opened;
    });
  }

  function onHandlerStateChange(event) {
    opened = false;

    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      }

      animateCard(opened);
    }
  }

  return (
    <Container>
      <Header
        translateY={translateY}
        opened={opened}
        animateCard={animateCard}
      />

      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 420],
                    outputRange: [0, 420],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>

            <CardContent>
              <Title>Saldo disponível</Title>
              <Description> R$ 99,65</Description>
            </CardContent>

            <CardFooter>
              <Annotation>
                Transferência de R$ 20,00 recebida de Marcos Paulo
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>

      <Tabs translateY={translateY} />
    </Container>
  );
}

export default Main;
