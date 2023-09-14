import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
  firstName?: string
  lastName?: string
  className?: string
  profile_pic?: string
  textClass?: string
}

export function ProfileInitials({
  firstName,
  lastName,
  className = '',
  profile_pic,
  textClass,
}: Props) {
  const defaultClasses = `${
    profile_pic ? 'bg-white rounded-full' : 'bg-[#616161] rounded-full'
  } w-8 h-8   grid place-content-center`
  const componentClasses = className ? className : defaultClasses

  return (
    <>
      {profile_pic ? (
        <View className="border-1 border-[#000] shadow-lg">
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 30,
            }}
            alt="okay"
            src={profile_pic}
            // source={require(errand.user.profile_picture)}
          />
        </View>
      ) : (
        <View className={componentClasses}>
          <View style={styles.headline} className="uppercase items-center">
            <Text className={textClass}>
              {firstName && lastName
                ? firstName.charAt(0).toUpperCase() +
                  lastName.charAt(0).toUpperCase()
                : ''}
            </Text>
          </View>
        </View>
      )}
    </>
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

export const Initials = ({ firstName, lastName }: Props) => {
  return (
    <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
      <Text className="uppercase text-lg items-center text-white">
        {firstName?.charAt(0).toUpperCase()}
        {lastName?.charAt(0).toUpperCase()}
      </Text>
    </View>
  )
}
