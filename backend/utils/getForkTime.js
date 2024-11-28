const axios = require('axios');

async function getForkTime(owner, repo, username, accessToken) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Authorization: `token ${accessToken}`
            }
        });
        console.log()
        //const fork = response.data.find(fork => fork.owner.login === username);
        const res ={
            fork:response.data.fork,
            startTime:response.data.created_at,
            repo:response.data.name
        }

       console.log(res)
        return   res ;
    } catch (error) {
        console.error('Error fetching fork time:', error);
        return null;
    }
}

module.exports = getForkTime;
