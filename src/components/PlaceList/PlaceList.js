import React from 'react';
import { ScrollView,FlatList, StyleSheet } from 'react-native';

//scroll view is good for limit items so we use flatList

import ListItem from '../ListItem/ListItem';

const placeList = props => {
    // const placesOutput = props.places.map((place, i) => (
    //     <ListItem key={i} placeName={place} onItemDelte={() => props.onItemDelte(i)}/>
    //   ));
    return (
        // <ScrollView style={styles.listContainer}>{placesOutput}</ScrollView>
        <FlatList
        style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
            <ListItem 
            placeName={info.item.name} 
            placeImage={info.item.image}
            onItemSelected={() => props.onItemSelected(info.item.key)}
            />
        )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default placeList;