import React, { useState,useCallback, useEffect } from 'react';
import {View, 
    Text, 
    StyleSheet,
    StatusBar,
    Platform,
    Button,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
} from 'react-native'
import { Colors } from '../../utils/Color';
import Post from '../../components/Post/Post';
import Action from '../../components/Post/Action';
import { userData } from '../../utils/Storage';

const UserPost = () => {

    const [isRefreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = () => {
      setTimeout(() => {
        setActivePost(3)
        setRefreshing(false); 
      }, 200); 
    };
  
    const [activePost, setActivePost] = useState<number>(3)
    const [isLoadingMore, setLoadingMore] = useState(false);
    const handleScroll = useCallback(
        () => {
            setLoadingMore(true);
            setActivePost(activePost+3);
            setLoadingMore(false);
        },
        [isLoadingMore, activePost]
    )

    const [action, setAction] = useState<boolean>(false)
    const isAction = () => {
        setAction(true);
    }
    const onCloseAction = () => {
        setAction(false);
    }

    const [user, setUser] = useState<any>({});
    useEffect(() => {
      const fetchData = async () => {
        const response: any = await userData();
        setUser(response);
      };
      fetchData();
    },[]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
            <View style={styles.header}>
                <Text style={styles.text1}>
                    Bài viết
                </Text>
            </View>
            {action &&
                <View style={styles.showaction}>
                    <Action
                        onClose={onCloseAction}
                        user={user}
                    />
                </View>
            }
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}
                    />
                }
                onScroll={handleScroll}
                style={[styles.viewarea, action && styles.action]}
                scrollEnabled={action ? false : true}
            >
                {Array(activePost).fill(null).map((_, index) => (
                    <Post 
                        onAction = {isAction}
                        onCloseAction={onCloseAction}
                        key={index}
                        user={user}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.background_header,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    text1: {
        marginTop: 15,
        color: Colors.white,
        fontSize: 20,
        fontWeight: "bold",
    },

    action: {
        backgroundColor: Colors.box_background,
        opacity: 0.1,
    },
    
    container: {
        position: 'relative',
    },
    showaction: {
        position: 'absolute',
        top: 150,
        left: 20,
        zIndex: 999,
        opacity: 1,
    },
    viewarea: {
        marginBottom: 80,
    },
}) 

export default UserPost
