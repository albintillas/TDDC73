// app/details.tsx
import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DetailsScreen() {
  // Get the repo data from the URL params
  const { repo: repoString } = useLocalSearchParams();
  const repo = repoString ? JSON.parse(repoString as string) : null;

  if (!repo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.textBold}>No repository data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.detailsContainer}>
          {/* Repository Name Section */}
          <View style={styles.section}>
            <Text style={styles.textBold}>Repository Name</Text>
            <Text style={styles.text}>{repo.name}</Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.textBold}>Stars</Text>
              <Text style={styles.text}>{repo.stargazers_count}</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.textBold}>Forks</Text>
              <Text style={styles.text}>{repo.forks_count}</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.textBold}>Issues</Text>
              <Text style={styles.text}>{repo.open_issues_count}</Text>
            </View>
          </View>

          {/* Language Section */}
          <View style={styles.section}>
            <Text style={styles.textBold}>Primary Language</Text>
            <Text style={styles.text}>{repo.language || 'Not specified'}</Text>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.textBold}>Description</Text>
            <Text style={styles.text}>{repo.description || 'No description available'}</Text>
          </View>

          {/* Dates Section */}
          <View style={styles.section}>
            <Text style={styles.textBold}>Created</Text>
            <Text style={styles.text}>
              {repo.created_at ? new Date(repo.created_at).toLocaleDateString() : 'N/A'}
            </Text>

            <Text style={[styles.textBold, { marginTop: 10 }]}>Last Updated</Text>
            <Text style={styles.text}>
              {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 16,
  },
  detailsContainer: {
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  section: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  textBold: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});