import fetch from 'node-fetch';
import uuid from "uuid/v4";
//generating random numbers
export function getRandomId() {
    return uuid();
}

export async function getFavoriteJoke(): Promise<string> {
    //icanhazdadjoke.com
    const response = await fetch("https://icanhazdadjoke.com", {
       headers: {
           "Accept": "application/json"
       }
    });
    const result = await response.json();
    // result will be like -  {"id":"7Ufi31gydFd","joke":"What did the mountain climber name his son? Cliff.","status":200}
    return result.joke;
}

export async function getFavouriteQuote():Promise<string>
{
    const response=await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes");

    const result=await response.json();
    //result will be like - ["Are you going to tell a man that he can't fart in his own car?"]

    return result[0];

    
}