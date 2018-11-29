import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
export const addPlace = (placeName, location, image) => {

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-appteach-7a364.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://appteach-7a364.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })  
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            alert('done');
            dispatch(uiStopLoading());
        });
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        key: key
    };
};

export const selectPlace = (key) => {
    return {
        type: SELECT_PLACE,
        placeKey: key
    };
};

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE,
    };
};