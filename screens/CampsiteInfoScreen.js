import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input, Icon } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';


const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    
    const handleSubmit = () => {
        const newComment = {
        campsiteId: campsite.id,
        rating,
        author,
        text
    };

    dispatch(postComment(newComment));
    setShowModal(!showModal);
    };

    const resetForm = () => {
        setAuthor('');
        setRating(5);
        setText('');
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Rating 
                    readonly
                    rating={item.rating}
                    imageSize={10}
                    style={{
                        alignItems:'flex-start',
                        paddingVertical: '5%'
                    }}
                    />
                <Text style={{fontSize:14 }}>
                    {(item.text)}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };
    return(
        <>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <View style={{margin:10}}>
                        <Rating
                            showRating
                            startingValue={rating}
                            imageSize={40}
                            onFinishRating={(rating)=> setRating(rating)}
                            style={{paddingVertical: 10}}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder='Author'
                            leftIcon={{type:'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(author)=> setAuthor(author)}
                            value={author}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder="Comment"
                            leftIcon={{type:'font-awesome', name:'comment-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(text)=> setText(text)}
                            value={text} 
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                                }}
                        />


                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            color='#808080'
                            title='Cancel'
                            onPress={() => {
                                resetForm();
                            }} 
                            
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};


const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;