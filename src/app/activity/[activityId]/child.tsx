import { Redirect, useLocalSearchParams } from 'expo-router';
/** Legacy links enter the combined child and session screen from Stitch. */
export default function ChooseChildScreen() {
  const { activityId, sessionId } = useLocalSearchParams<{ activityId: string; sessionId?: string }>();
  return <Redirect href={{ pathname: '/activity/[activityId]/sessions', params: { activityId, ...(sessionId ? { sessionId } : {}) } }} />;
}
