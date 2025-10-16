import { Text, View, Pressable } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import { styles } from '../assets/styles';

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const permissionGranted = Boolean(permission?.granted);

  return (
    <View style={[styles.container, styles.frontPage]}>
      <Pressable
        onPress={requestPermission}
        style={[permissionGranted ? styles.invisibleButton : styles.button]}
      >
        <Text style={styles.buttonText}>CAMERA PERMISSIONS</Text>
      </Pressable>
      <Link
        style={[permissionGranted ? [styles.button, styles.buttonText] : styles.invisibleButton]}
        href='/scanner'
      >
        START SCANNING
      </Link>
    </View>
  );
}
