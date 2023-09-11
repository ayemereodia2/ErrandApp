import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  item: string
}

const Emoji = ({ item }: Props) => {
  return (
    <TouchableOpacity style={styles.emojiContainer}>
      {/* <Text style={styles.emoji}>{shortnameUnicode[`:${item}:`]}</Text> */}
      <></>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 9,
  },
  emoji: {
    fontSize: 25,
  },
})

export default Emoji
