import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Mock data for venues
// In a real app, this would come from an API
const MOCK_VENUES = [
  {
    id: '1',
    name: 'Urban Coffee',
    type: 'Café',
    rating: 4.5,
    image: 'https://picsum.photos/400/200?random=1',
    distance: '0.3 mi',
    price: '$$',
    atmosphere: 'Cozy',
    description: 'A cozy coffee shop with great pastries and ambient music.'
  },
  {
    id: '2',
    name: 'The Speakeasy',
    type: 'Bar',
    rating: 4.8,
    image: 'https://picsum.photos/400/200?random=2',
    distance: '1.2 mi',
    price: '$$$',
    atmosphere: 'Elegant',
    description: 'Hidden gem with craft cocktails and vintage vibes.'
  },
  {
    id: '3',
    name: 'Noodle House',
    type: 'Restaurant',
    rating: 4.2,
    image: 'https://picsum.photos/400/200?random=3',
    distance: '0.8 mi',
    price: '$$',
    atmosphere: 'Casual',
    description: 'Authentic Asian cuisine in a modern setting.'
  },
  {
    id: '4',
    name: 'Rhythm & Blues',
    type: 'Club',
    rating: 4.7,
    image: 'https://picsum.photos/400/200?random=4',
    distance: '1.5 mi',
    price: '$$$',
    atmosphere: 'Energetic',
    description: 'Live music venue with great drinks and dancing.'
  },
  {
    id: '5',
    name: 'Sunset Lounge',
    type: 'Lounge',
    rating: 4.4,
    image: 'https://picsum.photos/400/200?random=5',
    distance: '2.0 mi',
    price: '$$$$',
    atmosphere: 'Elegant',
    description: 'Rooftop lounge with stunning views and premium drinks.'
  },
  {
    id: '6',
    name: 'The Local',
    type: 'Pub',
    rating: 4.1,
    image: 'https://picsum.photos/400/200?random=6',
    distance: '0.5 mi',
    price: '$',
    atmosphere: 'Casual',
    description: 'Neighborhood pub with a great selection of craft beers.'
  },
  {
    id: '7',
    name: 'Bistro Moderne',
    type: 'Restaurant',
    rating: 4.6,
    image: 'https://picsum.photos/400/200?random=7',
    distance: '1.0 mi',
    price: '$$$',
    atmosphere: 'Trendy',
    description: 'Contemporary cuisine with fresh, local ingredients.'
  },
  {
    id: '8',
    name: 'Jazz Corner',
    type: 'Bar',
    rating: 4.3,
    image: 'https://picsum.photos/400/200?random=8',
    distance: '1.8 mi',
    price: '$$',
    atmosphere: 'Cozy',
    description: 'Intimate jazz bar with live performances every night.'
  }
];

type RootStackParamList = {
  Home: undefined;
  VenueDetail: {
    venueId: string;
  };
};

type Venue = {
  id: string;
  name: string;
  type: string;
  rating: number;
  image: string;
  distance: string;
  price: string;
  atmosphere: string;
  description: string;
};

const DiscoveryScreen = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const windowWidth = Dimensions.get('window').width;
  
  useEffect(() => {
    // Simulate API fetch on initial load
    fetchVenues();
  }, []);
  
  const fetchVenues = () => {
    // In a real app, we would fetch from an API with pagination
    // Simulating API delay
    setLoading(true);
    setTimeout(() => {
      if (page === 1) {
        setVenues(MOCK_VENUES.slice(0, 4));
      } else if (page === 2) {
        setVenues(prevVenues => [...prevVenues, ...MOCK_VENUES.slice(4, 8)]);
      } else {
        setHasMoreData(false);
      }
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };
  
  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setPage(1);
    setHasMoreData(true);
    fetchVenues();
  };
  
  const handleLoadMore = () => {
    if (loading || !hasMoreData) return;
    setPage(prevPage => prevPage + 1);
    fetchVenues();
  };
  
  const renderVenueCard = ({ item }: { item: Venue }) => {
    // Generate star rating display
    const renderStars = () => {
      const stars = [];
      const fullStars = Math.floor(item.rating);
      const halfStar = item.rating % 1 >= 0.5;
      
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push('★');
        } else if (i === fullStars && halfStar) {
          stars.push('½');
        } else {
          stars.push('☆');
        }
      }
      
      return stars.join('');
    };
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('VenueDetail', { venueId: item.id })}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.venueName}>{item.name}</Text>
            <Text style={styles.venuePrice}>{item.price}</Text>
          </View>
          
          <View style={styles.cardDetails}>
            <Text style={styles.venueType}>{item.type} • {item.atmosphere}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.venueRating}>{renderStars()} {item.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.venueDistance}>{item.distance} away</Text>
          <Text style={styles.venueDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  };
  
  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No venues found</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Venues</Text>
        <Text style={styles.headerSubtitle}>Find places that match your style</Text>
      </View>
      
      <FlatList
        data={venues}
        renderItem={renderVenueCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  venuePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueType: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueRating: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '500',
  },
  venueDistance: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 8,
  },
  venueDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  refreshButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default DiscoveryScreen;