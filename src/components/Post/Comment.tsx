import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../utils/Color';

import Icon from 'react-native-vector-icons/AntDesign';
import Send from 'react-native-vector-icons/Feather';
import {userData} from '../../utils/Storage';
import {createComment, deleteComment} from '../../services/Post';
import moment from 'moment';

const Comment: React.FC<any> = ({postId, onComment, comment}) => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await userData();
      setUser(response);
    };
    fetchData();
  }, []);

  const [content, setContent] = useState<string>('');
  const handleComment = async () => {
    const payload = {
      postId: postId,
      content: content,
      commentFromUserId: user.id,
    };
    await createComment(payload);
    setContent('');
    onComment();
  };

  const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
  };

  const handleDelete = async (id: number) => {
    await deleteComment(id);
    onComment();
  };

  return (
    <View style={styles.container}>
      {comment &&
        comment?.map((item: any, index: number) => (
          <View style={styles.comment}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/Pemond.jpg')}
                style={styles.img}
              />
              <View style={styles.textfield}>
                <Text style={styles.name}>{item?.commentFromUsername}</Text>
                <Text style={styles.time}>{formatDate(item?.createdAt)}</Text>
              </View>
              {(item?.commentFromUserId === user.id || user.role === 'ADMIN') && (
                <>
                  <TouchableOpacity style={styles.icon}>
                    <Icon name="edit" size={20} color={Colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.icon1}
                    onPress={() => handleDelete(item.id)}>
                    <Icon name="delete" size={20} color={Colors.black} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TextInput
              multiline
              style={styles.textInput}
              editable={false}
              value={item?.content}
            />
          </View>
        ))}
      <View style={styles.commentfield}>
        <Image source={require('../../assets/Pemond.jpg')} style={styles.img} />
        <TextInput
          style={styles.text}
          value={content}
          placeholder="Bình luận tại đây ..."
          onChangeText={e => setContent(e)}
        />
        <TouchableOpacity style={styles.icon2} onPress={handleComment}>
          <Send name="send" size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textfield: {
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    color: Colors.black,
  },
  time: {
    color: Colors.black,
    fontSize: 13,
    opacity: 0.5,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 0,
    padding: 10,
  },
  icon1: {
    padding: 10,
    marginRight: 10,
  },
  textInput: {
    color: Colors.black,
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.7,
  },
  commentfield: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    borderWidth: 1,
    borderColor: Colors.line,
    width: 280,
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    borderRadius: 50,
    marginRight: 10,
  },
  icon2: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.box_background,
    backgroundColor: Colors.box_background,
  },
});

export default Comment;
