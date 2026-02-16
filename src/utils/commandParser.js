export function parseCommand(text){
    const lowerText = text.toLowerCase().trim();
    
    let action ="add";

  //SEARCH 
if(
    lowerText.startsWith("find") ||
     lowerText.startsWith("search") ||
     lowerText.startsWith("under")
    ){

     const priceMatch = lowerText.match(/under\s+(\d+)/);

     let itemText = lowerText
     .replace("find", "")
     .replace("search", "")
     .replace(/under\s+\d+/, "")
     .trim();

    return{
        action :"search",
        item : itemText,
        quantity : 1,
        maxPrice : priceMatch ? parseInt(priceMatch[1]) : null
       
    };
}
//REMOVE

 if(lowerText.startsWith("remove") || lowerText.startsWith("delete")){
   
    const item = lowerText
    .replace("remove", "")
    .replace("delete", "")
    .trim();
 
    return {
        action : "remove",
        item,
        quantity : 1
    };
}

//MODIFY 
if(lowerText.startsWith("update") || lowerText.startsWith("change")){
   
    const words = lowerText.split(" ");
    let quantity = 1;

    words.forEach(word => {
    if(!isNaN(word)) {
        quantity = parseInt(word);
    }
});

const item = words
.filter(word =>
    word !== "update" &&
    word !== "change" &&
    word !== "to" &&
    isNaN(word)
)
.join(" ")
.trim();

return {
    action : "modify",
    item,
    quantity
};
}

// Default = ADD

 const words = lowerText.split(" ");
    let quantity = 1;

     words.forEach(word => {
    if(!isNaN(word)) {
        quantity = parseInt(word);
    }
});

const wordsToIgnore = [
    "add",
    "buy",
    "i",
    "need",
    "want",
    "to",
    "please",
    "remember",
    "under"
];

 const item = words
 .filter(word =>
    !wordsToIgnore.includes(word) &&
    isNaN(word)
 )
 .join(" ")
 .trim();

    return {
        action : "add",
        item,
        quantity
    };
}