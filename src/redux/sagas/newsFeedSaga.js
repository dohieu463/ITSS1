import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { CREATE_POST_START, GET_FEED_START } from "../../constants/actionType";
import { createPost, getNewsFeed } from "../../services/api";

import { setNewsFeedErrorMessage } from "../action/errorActions";
import { createPostSuccess, getNewsFeedSuccess } from "../action/feedActions";
import { isCreatingPost, isGettingFeed } from "../action/loadingActions";


function* newsFeedSaga({ type, payload }) {
    switch (type) {
        case GET_FEED_START:
            try {
                yield put(isGettingFeed(true));
                yield put(setNewsFeedErrorMessage(null));

                const posts = yield call(getNewsFeed, payload);

                yield put(isGettingFeed(false));
                yield put(getNewsFeedSuccess(posts));
            } catch (e) {
                console.log(e);
                yield put(isGettingFeed(false));
                yield put(setNewsFeedErrorMessage(e))
            }

            break;
        case CREATE_POST_START:
            try {
                yield put(isCreatingPost(true));

                const post = yield call(createPost, payload);

                yield put(createPostSuccess(post));
                yield put(isCreatingPost(false));
                toast.dismiss();
                toast.dark('Post succesfully created.');
            } catch (e) {
                yield put(isCreatingPost(false));
                console.log(e);
            }
            break;
        default:
            throw new Error('Unexpected action type.')
    }
}

export default newsFeedSaga;
