import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View } from 'react-native';

const OtpInput = ({ onChangeText }) => {
  const inputRefs = Array(6)
    .fill(0)
    .map((_, index) => useRef(null));

  const [otpArray, setOtpArray] = useState(Array(6).fill(''));

  useEffect(() => {
    onChangeText(otpArray.join(''));
  }, [otpArray, onChangeText]);

  const handleInputChange = (text, index) => {
    const newOtpArray = [...otpArray];
    newOtpArray[index] = text;
    setOtpArray(newOtpArray);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 6 }, (_, index) => (
        <TextInput
          key={index}
          style={{
            width: 45, // Adjust width as needed
            height: 45, // Adjust height as needed
            borderWidth: 1,
            textAlign: 'center',
           
            marginRight: 12.5,
            borderRadius: 8,
            borderColor: '#96A0A5',
            padding: 10
          }}
          keyboardType="number-pad"
          maxLength={1}
          ref={inputRefs[index]}
          onChangeText={(text) => handleInputChange(text, index)}
          value={otpArray[index]}
        />
      ))}
    </View>
  );
};

export default OtpInput;
