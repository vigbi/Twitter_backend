import {TweetRepository,HashtagRepository} from '../repository/index.js'

class TweetService{
    constructor() {
        this.tweetRepository=new TweetRepository();
        this.hashtagRepository=new HashtagRepository();
    }

    async create(data){
        const content=data.content;
        let tags= content.match(/#[a-zA-Z0-9_]+/g);
        tags= tags.map((tag)=>tag.substring(1));
        console.log(tags);
        const tweet=await  this.tweetRepository.create(data);
        let alreadyPresentTags=await this.hashtagRepository.findByName(tags)
        let titleOfPresentTags=alreadyPresentTags.map(tags=>tags.title); //Returns the tags that are already present in the array
        let newTags=tags.filter(tag=>!titleOfPresentTags.includes(tag));   //Returns the tags that not are already present in the array
        newTags=newTags.map(tag=>{
            return {title:tag, tweets: [tweet.id]}
        });
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet; 


    }  
}

export default TweetService; 