import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  firstName?: string
  lastName?: string
  className?: string
  profile_pic?: string
}

export function ProfileInitials({
  firstName,
  lastName,
  className = '',
  profile_pic,
}: Props) {
  const defaultClasses = `${
    profile_pic ? 'bg-white rounded-full' : 'bg-[#616161] rounded-full'
  } w-8 h-8   grid place-content-center`
  const componentClasses = className ? className : defaultClasses

  return (
    <View className={componentClasses}>
      <View
        style={styles.headline}
        className="uppercase text-xl items-center"
      >
        {!profile_pic && (
          <Text className='text-white'>
            {firstName && lastName
              ? firstName.charAt(0).toUpperCase() +
                lastName.charAt(0).toUpperCase()
              : ''}
          </Text>
        )}

        {profile_pic && (
          <img
            src={profile_pic}
            alt="profile_pic"
            className={componentClasses}
          />
        )}
      </View>
    </View>
  )
}

var styles = StyleSheet.create({
  headline: {
    flex: 1,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
