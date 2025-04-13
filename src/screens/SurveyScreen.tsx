import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Results: {
    surveyData: SurveyFormValues;
  };
};

interface SurveyFormValues {
  venueType: string;
  atmosphere: string;
  budget: number;
  groupSize: number;
  location: string;
  foodRequired: boolean;
  music: string;
  additionalNotes: string;
}

const validationSchema = Yup.object().shape({
  venueType: Yup.string().required('Please select a venue type'),
  atmosphere: Yup.string().required('Please select an atmosphere'),
  budget: Yup.number().required('Budget is required').min(1, 'Budget must be greater than 0'),
  groupSize: Yup.number().required('Group size is required').min(1, 'Group must have at least 1 person'),
  location: Yup.string().required('Location is required'),
  music: Yup.string().required('Please select a music preference'),
});

const SurveyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const initialValues: SurveyFormValues = {
    venueType: '',
    atmosphere: '',
    budget: 50,
    groupSize: 2,
    location: '',
    foodRequired: false,
    music: '',
    additionalNotes: '',
  };

  const handleSubmit = (values: SurveyFormValues) => {
    console.log('Survey submitted with:', values);
    // In a real app, we would send this data to our backend
    // For now, we'll navigate to a results screen
    navigation.navigate('Results', { surveyData: values });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Find Your Perfect Venue</Text>
      <Text style={styles.subtitle}>Tell us your preferences</Text>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
          // Log Formik values, errors, and touched
          console.log('Formik Values:', values);
          console.log('Formik Errors:', errors);
          console.log('Formik Touched:', touched);

          return (
            <View style={styles.formContainer}>
              {/* Venue Type */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>What type of venue are you looking for?</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.venueType}
                    onValueChange={(itemValue) => {
                      console.log('Picker Value Changed:', itemValue); // Picker seçimi loglanır
                      setFieldValue('venueType', itemValue);
                    }}
                    style={styles.picker}
                    mode="dropdown" // Android için
                  >
                    <Picker.Item label="Select venue type" value="" />
                    <Picker.Item label="Café" value="cafe" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                    <Picker.Item label="Bar" value="bar" />
                    <Picker.Item label="Club" value="club" />
                    <Picker.Item label="Lounge" value="lounge" />
                    <Picker.Item label="Pub" value="pub" />
                  </Picker>
                </View>
                {touched.venueType && errors.venueType && (
                  <Text style={styles.errorText}>{errors.venueType}</Text>
                )}
              </View>

              {/* Atmosphere */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>What atmosphere are you looking for?</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.atmosphere}
                    onValueChange={(itemValue) => setFieldValue('atmosphere', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select atmosphere" value="" />
                    <Picker.Item label="Casual" value="casual" />
                    <Picker.Item label="Elegant" value="elegant" />
                    <Picker.Item label="Romantic" value="romantic" />
                    <Picker.Item label="Energetic" value="energetic" />
                    <Picker.Item label="Cozy" value="cozy" />
                    <Picker.Item label="Trendy" value="trendy" />
                  </Picker>
                </View>
                {touched.atmosphere && errors.atmosphere && (
                  <Text style={styles.errorText}>{errors.atmosphere}</Text>
                )}
              </View>

              {/* Budget Slider */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Budget per person</Text>
                <Text style={styles.sliderValue}>${values.budget}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={10}
                  maximumValue={200}
                  step={5}
                  value={values.budget}
                  onValueChange={(value) => setFieldValue('budget', value)}
                  minimumTrackTintColor="#007BFF"
                  maximumTrackTintColor="#CCCCCC"
                  thumbTintColor="#007BFF"
                />
                <View style={styles.sliderLabels}>
                  <Text>$10</Text>
                  <Text>$200+</Text>
                </View>
              </View>

              {/* Group Size */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Group Size</Text>
                <Text style={styles.sliderValue}>{values.groupSize} people</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={20}
                  step={1}
                  value={values.groupSize}
                  onValueChange={(value) => setFieldValue('groupSize', value)}
                  minimumTrackTintColor="#007BFF"
                  maximumTrackTintColor="#CCCCCC"
                  thumbTintColor="#007BFF"
                />
                <View style={styles.sliderLabels}>
                  <Text>1</Text>
                  <Text>20+</Text>
                </View>
              </View>

              {/* Location */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Preferred Location/Neighborhood</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter location"
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  value={values.location}
                />
                {touched.location && errors.location && (
                  <Text style={styles.errorText}>{errors.location}</Text>
                )}
              </View>

              {/* Food Option */}
              <View style={styles.fieldContainer}>
                <View style={styles.switchContainer}>
                  <Text style={styles.label}>Food Required?</Text>
                  <Switch
                    value={values.foodRequired}
                    onValueChange={(value) => { setFieldValue('foodRequired', value); }}
                    trackColor={{ false: "#CCCCCC", true: "#007BFF" }}
                    thumbColor={values.foodRequired ? "#FFFFFF" : "#FFFFFF"}
                  />
                </View>
              </View>

              {/* Music Preference */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Music Preference</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.music}
                    onValueChange={(itemValue) => setFieldValue('music', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select music type" value="" />
                    <Picker.Item label="No preference" value="none" />
                    <Picker.Item label="Live Music" value="live" />
                    <Picker.Item label="DJ" value="dj" />
                    <Picker.Item label="Acoustic" value="acoustic" />
                    <Picker.Item label="Jazz" value="jazz" />
                    <Picker.Item label="Rock" value="rock" />
                    <Picker.Item label="Pop" value="pop" />
                    <Picker.Item label="Classical" value="classical" />
                  </Picker>
                </View>
                {touched.music && errors.music && (
                  <Text style={styles.errorText}>{errors.music}</Text>
                )}
              </View>

              {/* Additional Notes */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Additional Notes or Requirements</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter any additional preferences or requirements"
                  onChangeText={handleChange('additionalNotes')}
                  value={values.additionalNotes}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.submitButtonText}>Find Matching Venues</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 20,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#007BFF',
    marginBottom: 5,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});


export default SurveyScreen;