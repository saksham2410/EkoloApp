import styled from 'styled-components/native';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import { ThemeProps } from '../../theme';

// interface IDescProps extends ThemeProps {
//   value?: boolean;
// }

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const InnerContainer = styled.ScrollView.attrs({
  contentContainerStyle: { alignItems: 'center' },
})`
  padding-top: 20px;
  padding-bottom: 20%;
`;

export const InfoContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #222
  margin-top: 1%;
  padding: 0 0 28px 0;
`;

export const Description = styled.Text`
  
  font-size: 14px;
  color: #222
`;

export const DriverContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
`;

export const AvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 114px;
  height: 114px;
  border: 1px solid
  border-radius: 57px;
  margin-bottom: 8px;
`;

export const Avatar = styled.Image`
  width: 94px;
  height: 94px;
  border-radius: 47px;
`;

export const DriverName = styled.Text`
  
  font-size: 18px;
  color: #222
  margin-bottom: 16px;
`;

export const RatingContainer = styled.View`
  align-items: center;
  width: 100%;
  padding-top: 10%;
`;

export const MessageInput = styled.TextInput`
  justify-content: flex-start;
  width: 100%;
  border-radius: 20px;
  border: 1px solid 
  margin: 8% 0 4% 0;
  padding: 13px 17px;
`;