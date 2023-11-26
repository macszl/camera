import {TouchableOpacity, Text} from 'react-native';
import {useStyles} from '../Common/Common.styles';
import {CustomButtonProps} from './CustomButton.types';

export const CustomButton = ({onPress, title, disabled}: CustomButtonProps) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonStyle}
      disabled={disabled}>
      <Text style={styles.buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
