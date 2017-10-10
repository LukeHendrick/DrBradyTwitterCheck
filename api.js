const axios = require('axios')

module.exports= {
    listGet: function listGet(searchReq, cursor) {
        cursor = cursor || -1;
        url = `https://api.twitter.com/1.1/friends/ids.json?screen_name=${searchReq.name}&cursor=${cursor}`
        token = `Bearer ${process.env.bearer}`
        console.log(token)
        return axios.get(url, { 'headers': { 'Authorization': token } }).then((apiRes) => {
            idArray = apiRes.data.ids;
            for (x = 0; x < idArray.length; x++) {
                if (idArray[x] == 1536459457) {
                    searchReq['BradyHaran'] = true;
                }
                if (idArray[x] == 393621632) {
                    searchReq['Numberphile'] = true;
                }
                if (idArray[x] == 20228595) {
                    searchReq['Periodic'] = true;
                }
                if (idArray[x] == 133799038) {
                    searchReq['Sixty'] = true;
                }
                if (idArray[x] == 898110524898062336) {
                    searchReq['Unmade'] = true;
                }
                if (idArray[x] == 2902769751) {
                    searchReq['Objectivity'] = true;
                }
                if (idArray[x] == 393627101) {
                    searchReq['Deep'] = true;
                }

                if (idArray[x] == 1342321700) {
                    searchReq['Computer'] = true;
                }
                if (idArray[x] == 1898395128) {
                    searchReq['Hello'] = true;
                }
            }
            if (apiRes.data.next_cursor == 0) {
                return searchReq
            } else {
                this.listGet(searchReq, apiRes.data.next_cursor)
            }
        })
        .catch((err) => {
            console.log(cursor);
            console.log(err.response)
            if (err.response.status == 429) {
                return 429
            }
        })
    },
    friendsGet: function friendsGet(searchReq) {
        url = `https://api.twitter.com/1.1/users/lookup.json?screen_name=${searchReq.name}`;
        token = bearer.BEARER;
        return axios.get(url, {'headers': {'Authorization': token}}).then((res) => {
            return res.data[0].friends_count
        })
    }
}