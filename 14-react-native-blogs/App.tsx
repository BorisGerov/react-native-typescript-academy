import React, { Component } from "react";
import { StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, FlatList, Dimensions } from "react-native";
import { BlogsAPI } from "./dao/rest-api-client";
import { FilterType, StatusForQuestion, Optional } from "./model/shared-types";
import { Form } from "./components/formbuilder/Form";
import { Answer, Questions } from "./model/posts.model";
import PostList from "./components/PostList";
import { FormComponentConfigs } from "./components/formbuilder/form-types";
import IconButton from './components/IconButton';
import * as yup from 'yup';
import PostItem, { ITEM_HEIGHT, PostItemProps } from "./components/PostItem";
import Draggable from "./Draggable";

export const DEFAULT_PAGE_SIZE = 10;

export enum Views {
  PostFormView = 1, PostListView 
}

interface AppState {
  activeView: Views;
  testView: Views;
  errors: string | undefined;
  posts: Questions[];
  page: number;
  filter: FilterType;
  editedPost: Questions;
  scrollIndex: number;
}
export const EMPTY_IMAGE_DATA = { uri: '', width: 0, height: 0 };
const EMPTY_POST = new Questions('',100,[],EMPTY_IMAGE_DATA, StatusForQuestion.MultipleChoice, 1);

class App extends Component<{}, AppState> {
  state: AppState = {
    activeView: Views.PostListView,
    testView: Views.PostListView,
    errors: '',
    posts: [],
    page: 0,
    filter: undefined,
    editedPost: EMPTY_POST,
    scrollIndex: 0,
  }
  postsListRef = React.createRef<FlatList<Questions>>()

  async componentDidMount() {
    this.loadMorePosts();
  }

  loadMorePosts = async () => {
    try {
      const newPosts = await BlogsAPI.findByPage(this.state.page, DEFAULT_PAGE_SIZE);
      this.setState(({ posts, page, errors }) => ({
        posts: posts.concat(newPosts),
        page: page + 1,
        errors: undefined
      }))
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {
    if (this.state.activeView === Views.PostListView) {
      if (Platform.OS === 'web') {
        // this.postsListRef.current?.scrollToOffset({offset: (this.state.scrollIndex-1) * ITEM_HEIGHT - 1});
      } else {
        this.postsListRef.current?.scrollToIndex({ index: this.state.scrollIndex });
      }
    }
  }

  handleUpdatePost = (post: Questions) => {
    this.setState(({ posts }) => ({
      posts: posts.map(td => td.id === post.id ? post : td)
    }))
  }

  handleDeletePost = async (post: Questions) => {
    try {
      await BlogsAPI.deleteById(post.id);
      this.setState(({ posts }) => ({
        posts: posts.filter(p => p.id !== post.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleSubmitPost = async (post: Questions) => {
    try {
      post.answers = post.answers.filter(answer => answer.trim().length > 0)
      if (post.id) { //edit post
        const updated = await BlogsAPI.update(post);
        const scrollIndex = this.state.posts.findIndex(p => p.id === updated.id)
        this.setState(({ posts }) => {
          const postsCopy = posts.slice();
          postsCopy[scrollIndex] = updated;
          return {
            posts: postsCopy,
            scrollIndex,
          }
        });
      } else { // create post
        const created = await BlogsAPI.create(post);
        const scrollIndex = this.state.posts.length;
        this.setState(({ posts }) => ({
          posts: posts.concat(created),
          scrollIndex,
        }));
      }
      this.setState({
        errors: undefined,
        editedPost: EMPTY_POST,
        activeView: Views.PostListView,
      });
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleFormCancel = () => {
    this.setState({
      errors: undefined,
      editedPost: EMPTY_POST,
      activeView: Views.PostListView,
    })
  }

  handleEditTodo = (post: Questions) => {
    this.setState({ editedPost: post, activeView: Views.PostFormView });
  }
  handlefilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.PostListView ? Views.PostFormView : Views.PostListView
    }));
  }
  handleStartTest = () => {
    this.setState(({testView}) => ({
      testView: testView === Views.PostListView ? Views.PostListView : Views.PostListView
    }));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="blue" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboarAvoidingView}
        >
          <IconButton size={30} backgroundColor="green" color="white" onPress={this.handleViewChange} name='check-circle' >
            {this.state.activeView === Views.PostListView ? 'Add New Question' : 'Show All Questions'}
          </IconButton>
          <IconButton size={30} backgroundColor="green" color="white" onPress={this.handleViewChange} name='check-circle' >
            {this.state.activeView === Views.PostListView ? 'Start Test' : 'Cancel Test'}
          </IconButton>
          {(() => {
            switch (this.state.activeView) {
              case Views.PostFormView:
                return (
                  <Form<Questions, PostFormPropToCompKindMapping>
                    config={postFormConfig}
                    // initialValue={new Post('Example Post', 'Example content ...', ['example', 'post'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
                    initialValue={this.state.editedPost}
                    onSubmit={this.handleSubmitPost}
                    onCancel={this.handleFormCancel} />);
              case Views.PostListView:
                return (
                  <PostList ref={this.postsListRef} posts={this.state.posts}
                    page={this.state.page}
                    filter={this.state.filter}
                    onDelete={this.handleDeletePost}
                    onEdit={this.handleEditTodo}
                    scrollIndex={this.state.scrollIndex}
                    onLoadMorePosts={this.loadMorePosts}
                  />);
            }
          })()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default App;

type PostFormPropToCompKindMappingAnswers = {
  id: 'FormReadonlyTextComponent';
  scorePercentage: 'FormTextComponent';
  textOfAnswer?: 'FormTextComponent';
  pictureOfAnswer?: 'FormImageComponent';
  created: 'FormTextComponent';
  modified: 'FormTextComponent';
}

const postFormConfigAnswer: FormComponentConfigs<Answer,PostFormPropToCompKindMappingAnswers> = {
  id: {
    componentKind: 'FormReadonlyTextComponent',
    label: 'ID',
  },
  scorePercentage: {
    componentKind: 'FormTextComponent',
    label: 'Score Percentage'
  },
  textOfAnswer: {
    label: 'Text of the Answer',
    options: {
      multiline: true,
    },
    validators: yup.string().min(2).max(150),
  },
  pictureOfAnswer: {
    componentKind: 'FormImageComponent',
    label: 'URL for Answer',
    validators: yup.object().shape({
      uri: yup.string().required().test(
        'is-url',
        '${path} is not a valid URL',
        (value: string | undefined) => !!value && (value.startsWith('data') || yup.string().url().isValidSync(value))
      ),
      localUri: yup.string(),
      format: yup.string().oneOf(['jpeg', 'png', 'webp']),
      width: yup.number().integer().min(0),
      height: yup.number().integer().min(0)
    }),
  },
  created: {
    label: 'Created',
    componentKind: 'FormTextComponent',
  },
  modified: {
    label: 'Modified',
    componentKind: 'FormTextComponent',
  }
}

type PostFormPropToCompKindMapping = {
  id: 'FormReadonlyTextComponent';
  status: 'FormDropdownComponent';
  textOfQuestion: 'FormTextComponent';
  points: 'FormTextComponent';  
  answers: 'FormTextComponent';
  pictureOfQuestion?: 'FormImageComponent';
  created: 'FormTextComponent';
  modified: 'FormTextComponent';
}

const postFormConfig: FormComponentConfigs<Questions, PostFormPropToCompKindMapping> = {
  id: {
    componentKind: 'FormReadonlyTextComponent',
    label: 'ID',
  },
  status: {
    componentKind: 'FormDropdownComponent',
    label: 'Question Status',
    options: {
      choices: [
        { label: StatusForQuestion[StatusForQuestion.MultipleChoice], value: StatusForQuestion.MultipleChoice },
        { label: StatusForQuestion[StatusForQuestion.MultipleResponse], value: StatusForQuestion.MultipleResponse },
        { label: StatusForQuestion[StatusForQuestion.DragAndDrop], value: StatusForQuestion.DragAndDrop }
      ]
    }
  },
  textOfQuestion: {
    label: 'Text of the Question',
    options: {
      multiline: true,
    },
    validators: yup.string().min(10).max(500),
  },
  points: {
    label: 'Points',
    componentKind: 'FormTextComponent'
  },
  answers: {
    label : 'Answers',
    componentKind: 'FormTextComponent',
    // convertor: {
    //   fromString: (answer: Answer) => answer.split(/\W+/),
    //   toString: (answerArray: Answer[] ) => answerArray.toString()
    // }
  },
  pictureOfQuestion: {
    componentKind: 'FormImageComponent',
    label: 'URL for Question',
    validators: yup.object().shape({
      uri: yup.string().required().test(
        'is-url',
        '${path} is not a valid URL',
        (value: string | undefined) => !!value && (value.startsWith('data') || yup.string().url().isValidSync(value))
      ),
      localUri: yup.string(),
      format: yup.string().oneOf(['jpeg', 'png', 'webp']),
      width: yup.number().integer().min(0),
      height: yup.number().integer().min(0)
    }),
  },
  created: {
    label: 'Created',
    componentKind: 'FormTextComponent',
  },
  modified: {
    label: 'Modified',
    componentKind: 'FormTextComponent',
  }
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    // paddingTop: StatusBar.currentHeight,
  },
  keyboarAvoidingView: {
    flex: 1
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  errors: {
    padding: 5,
    fontSize: 20,
    border: 1,
    borderRadius: 5,
    backgroundColor: '#eecccc',
    color: 'red',
    textAlign: 'center',
  }
});