import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Linking
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// For map integration - we'd use these in a real app
// import MapView, { Marker } from 'react-native-maps';

type RootStackParamList = {
  Home: undefined;
  VenueDetail: {
    venueId: string;
  };
  Map: {
    venueId: string;
  };
};

// Extended mock data for venue details
const VENUE_DETAILS = {
  '1': {
    id: '1',
    name: 'Urban Coffee',
    type: 'Café',
    rating: 4.5,
    image: 'https://picsum.photos/800/400?random=1',
    gallery: [
      'https://picsum.photos/400/300?random=11',
      'https://picsum.photos/400/300?random=12',
      'https://picsum.photos/400/300?random=13',
    ],
    address: '123 Main St, Cityville',
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    phone: '+1 (555) 123-4567',
    website: 'https://example.com',
    hours: [
      'Monday: 7AM - 8PM',
      'Tuesday: 7AM - 8PM',
      'Wednesday: 7AM - 8PM',
      'Thursday: 7AM - 8PM',
      'Friday: 7AM - 10PM',
      'Saturday: 8AM - 10PM',
      'Sunday: 8AM - 6PM',
    ],
    price: '$$',
    atmosphere: 'Cozy',
    description: 'A cozy coffee shop with great pastries and ambient music. We source beans from local roasters and offer a variety of brewing methods. Our pastries are made fresh daily.',
    amenities: ['Free WiFi', 'Outdoor Seating', 'Power Outlets', 'Wheelchair Accessible'],
    reviews: [
      {
        id: '101',
        user: 'Sarah M.',
        rating: 5,
        date: '2 weeks ago',
        text: 'Fantastic coffee and great atmosphere. The staff is friendly and the pastries are delicious!'
      },
      {
        id: '102',
        user: 'David L.',
        rating: 4,
        date: '1 month ago',
        text: 'Good place to work. Wifi is reliable and they don\'t mind if you stay for a few hours.'
      },
      {
        id: '103',
        user: 'Michelle K.',
        rating: 4.5,
        date: '3 months ago',
        text: 'Love their cappuccinos and the quiet atmosphere in the mornings.'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'The Speakeasy',
    type: 'Bar',
    rating: 4.8,
    image: 'https://picsum.photos/800/400?random=2',
    gallery: [
      'https://picsum.photos/400/300?random=21',
      'https://picsum.photos/400/300?random=22',
      'https://picsum.photos/400/300?random=23',
    ],
    address: '456 Elm St, Cityville',
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    phone: '+1 (555) 987-6543',
    website: 'https://example.com/speakeasy',
    hours: [
      'Monday: Closed',
      'Tuesday: 5PM - 12AM',
      'Wednesday: 5PM - 12AM',
      'Thursday: 5PM - 1AM',
      'Friday: 5PM - 2AM',
      'Saturday: 5PM - 2AM',
      'Sunday: 5PM - 11PM',
    ],
    price: '$$$',
    atmosphere: 'Elegant',
    description: 'Hidden gem with craft cocktails and vintage vibes. Our expert mixologists create unique drinks using house-made ingredients and premium spirits. We also offer a selection of small plates to complement your drinks.',
    amenities: ['Craft Cocktails', 'Live Jazz (Thu-Sat)', 'Private Booths', 'Full Kitchen'],
    reviews: [
      {
        id: '201',
        user: 'Alex R.',
        rating: 5,
        date: '1 week ago',
        text: 'Incredible cocktails! The bartenders are true artists. Try the Smoky Manhattan - it\'s amazing.'
      },
      {
        id: '202',
        user: 'Jessica T.',
        rating: 5,
        date: '3 weeks ago',
        text: 'Such a cool vibe. Love the speakeasy entrance and the jazz band on weekends.'
      },
      {
        id: '203',
        user: 'Marcus W.',
        rating: 4,
        date: '2 months ago',
        text: 'Great spot for a date night. Cocktails are pricey but worth it.'
      }
    ]
  }
  // Additional venues would be defined here...
};

type VenueDetailRouteProps = RouteProp<RootStackParamList, 'VenueDetail'>;

const VenueDetailScreen = () => {
  const route = useRoute<VenueDetailRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { venueId } = route.params;
  
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const windowWidth = Dimensions.get('window').width;
  
  useEffect(() => {
    // Simulate API fetch for venue details
    fetchVenueDetails();
  }, [venueId]);
  
  const fetchVenueDetails = () => {
    // In a real app, we would fetch from an API
    // Simulating API delay
    setLoading(true);
    setTimeout(() => {
      // Check if we have details for this venue in our mock data
      if (VENUE_DETAILS[venueId as keyof typeof VENUE_DETAILS]) {
        setVenue(VENUE_DETAILS[venueId as keyof typeof VENUE_DETAILS]);
      } else {
        // Fallback to the basic info
        // Define MOCK_VENUES or remove this line if not needed
                const basicVenue = {}; // Replace with actual data source or keep as an empty object
        if (basicVenue && typeof basicVenue === 'object') {
          setVenue({
            ...basicVenue,
            gallery: [],
            address: '123 Example St, Cityville',
            phone: '+1 (555) 123-4567',
            website: 'https://example.com',
            hours: ['Call for hours'],
            amenities: [],
            reviews: []
          });
        }
      }
      setLoading(false);
    }, 1000);
  };
  
  const openMap = () => {
    if (!venue) return;
    
    // In a real app, we might navigate to an internal map screen
    navigation.navigate('Map', { venueId });
    
    // Or open in the device's map app
    // const url = `https://maps.apple.com/?q=${venue.address}`;
    // Linking.openURL(url);
  };
  
  const callVenue = () => {
    if (!venue) return;
    Linking.openURL(`tel:${venue.phone}`);
  };
  
  const visitWebsite = () => {
    if (!venue) return;
    Linking.openURL(venue.website);
  };
  
  // Render stars for ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
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
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading venue details...</Text>
      </View>
    );
  }
  
  if (!venue) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Venue not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: venue.image }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.venueName}>{venue.name}</Text>
          <Text style={styles.venueType}>{venue.type} • {venue.atmosphere}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.venueRating}>
              {renderStars(venue.rating)} {venue.rating}
            </Text>
            <Text style={styles.priceIndicator}>{venue.price}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{venue.description}</Text>
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={openMap}>
            <Text style={styles.actionButtonText}>Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={callVenue}>
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={visitWebsite}>
            <Text style={styles.actionButtonText}>Website</Text>
          </TouchableOpacity>
        </View>
        
        {venue.gallery.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.galleryContainer}
            >
              {venue.gallery.map((photo: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.address}>{venue.address}</Text>
          
          {/* Map placeholder */}
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map View</Text>
          </View>
          
          <TouchableOpacity style={styles.viewMapButton} onPress={openMap}>
            <Text style={styles.viewMapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours</Text>
          {venue.hours.map((hour: string, index: number) => (
            <Text key={index} style={styles.hoursText}>{hour}</Text>
          ))}
        </View>
        
        {venue.amenities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {venue.amenities.map((amenity: string, index: number) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {venue.reviews && venue.reviews.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {venue.reviews.map((review: any) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewRating}>
                  {renderStars(review.rating)} {review.rating}
                </Text>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#ddd',
  },
  contentContainer: {
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  venueName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  venueType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venueRating: {
    fontSize: 16,
    color: '#FF9500',
    fontWeight: '500',
  },
  priceIndicator: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  galleryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  address: {
    fontSize: 15,
    color: '#444',
    marginBottom: 15,
  },
  mapPlaceholder: {
    backgroundColor: '#ddd',
    height: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  mapPlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  viewMapButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMapButtonText: {
    color: '#007BFF',
    fontWeight: '600',
  },
  hoursText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 5,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#555',
  },
  reviewItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    },
    reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    },
    reviewDate: {
    fontSize: 14,
    color: '#999',
    },
    reviewRating: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '500',
    marginBottom: 5,
    },
    reviewText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    },
});

    export default VenueDetailScreen;
        