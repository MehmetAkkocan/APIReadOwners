import fs from "fs";
import axios from 'axios';

let holdersJson: Array<any> = [];

function responseRead(e:any){    
    var listStake = e.data.data;
    listStake.forEach((element:any) => {
        if (!holdersJson.includes(element.owner)) {
            holdersJson.push(element.owner)  //nft owner wallet list
        }
       
    });
    fs.writeFileSync("./src/json/holderItems.json", JSON.stringify(holdersJson));
}

async function readOwner() {
        axios({
            method: 'get',
            headers: {
                Accept: 'application/json'
            },
            url: 'https://api.sugar.realm.d1v.studio/extra/staking?skip=0&limit=0', //TODO : staking API url
            timeout: 1000 * 1000,
            responseType: 'json'
        })
        .then(function(response){
            responseRead(response);
        })
        .catch(function(error){
            console.log(error);
        })
}
export default readOwner();