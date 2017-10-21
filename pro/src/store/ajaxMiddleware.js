import http from '../util/httpClient';

export function ajaxMiddleware({ dispatch, getState }) {
    console.log('middleware')
        // 容器组件和展示组件相分离
    return next => action => {
        const {
            types,
            shouldCallAPI = () => true,
            query = {},
            payload = {},
            method = 'get',
            path
        } = action;

        if (!path || !method) {
            return next(action);
        }

        if (!Array.isArray(types) || types.length != 3 || types.every(type => typeof type != 'string')) {
            return new Error('Expected an array of three string types');
        }
        //console.log(122333) store.dispatch(action) action => middleware reducer 异步 switch(action.type) => newState

        if (!shouldCallAPI(getState())) {
            return;
        }
        //console.log(query, method)
        const [requestType, successType, failureType] = types;

        //dispatch({}=>action) => reducer
        dispatch(Object.assign({}, { query }, { payload }, {
            type: requestType
        }));

        return http[method](path, query)
            .then(
                Response => dispatch(Object.assign({}, { query }, { payload }, {
                    type: successType,
                    body: Response,
                    lastFetched: Date.now()
                })),
                error => dispatch(Object.assign({}, { query }, { payload }, {
                    type: failureType,
                    error
                }))
            )
    }
}