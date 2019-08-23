import {ADD_POST, ADD_COMMENT} from '../actions/actionTypes'

const initialSate = {
    posts: [{
        id: Math.random(),
        nickname: 'Joaquim da Silva',
        email: 'teste@teste.com',
        image: require('../../../assets/imgs/fence.jpg'),
        comments: [{
            nickname: 'Jonh Ray da Costa',
            comment: 'Stunning'
        }, {
            nickname: 'José da Silva Xavier',
            comment: 'Ficou massa demais'
        }]
    }, {
        id: Math.random(),
        nickname: 'Francisco da Costa',
        email: 'teste@teste.com',
        image: require('../../../assets/imgs/bw.jpg'),
        comments: []
    }]
}

const reducer = (state = initialSate, action) => {
    switch(action.type) {
        case ADD_POST: 
            return {
                ...state,
                posts: state.posts.concat({
                    ...action.payload
                })
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(
                                action.payload.comment
                            )
                        } else {
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post
                })
            }
        default:
            return state
    }
}

export default reducer