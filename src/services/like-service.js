import { LikeRespository, TweetRepository } from "../repository/index.js";
import Tweet from '../models/tweet.js';


class LikeService {
    constructor(){
        this.likeRepository=new LikeRespository();
        this.tweetRepository= new TweetRepository();   
    }

    async toggleLike(modelId,modelType,userId){
        if(modelType=='Tweet'){
            var likeable= await this.tweetRepository.find(modelId);
            likeable.populate({path:'likes'});
            console.log(likeable);
        }else if(modelType== 'Comment'){

        } else {
            throw new Error('unknown model type');
        }
        const exists=await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel:modelType,
            likeable:modelId
        });
        if(exists){
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.remove();
            var isRemoved=true;
        }else{
            const newLike=await this.likeRepository.create({
                user: userId,
                onModel:modelType,
                likeable:modelId,
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isRemoved=false;
        }
        return isRemoved;
    }
}

export default LikeService;