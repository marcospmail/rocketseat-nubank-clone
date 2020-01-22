import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  align-items: center;
  padding: 40px 0 30px;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Logo = styled(Animated.Image)``;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-left: 8px;
`;
