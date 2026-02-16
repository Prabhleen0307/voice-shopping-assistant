import { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import { parseCommand } from "./utils/commandParser";
import { relatedItems } from "./utils/suggestionsData";
import { categoryMap } from "./utils/categoriesData";
import { seasonalItems } from "./utils/seasonalData";
import { substitutes } from "./utils/substituteData";
import { products } from "./utils/productsData";

function getCurrentSeason() {
  const month = new Date().getMonth();

  if(month === 11 || month === 0 || month === 1){
    return "winter";
  }

  if(month >= 2 && month <= 5){
    return "summer";
  }

  return "monsoon";
}

function App(){

  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [language , setLanguage] = useState("en-US");
  const [status, setStatus] = useState("");



  const handleVoiceCommand = (text) => {
   const result = parseCommand(text);

   if(!result.item || result.item.trim() === ""){
    console.log("No valid item found")
    return;
   }

//SEARCH
   if(result.action === "search"){

    console.log("Searching for:", result.item);

    let results = products.filter(product =>
      product.name.toLowerCase().includes(result.item.toLowerCase())
    );

    if(results.maxPrice){
      results = results.filter(product => product.price <= result.maxPrice);
    }

    console.log("Filtered results:", results);
   
    setSearchResults(results);
    setSuggestions([]);

  return;
   }

   //MODIFY
   if(result.action === "modify"){
    setItems(prevItems => 
      prevItems.map(item =>
        item.name.toLowerCase() === result.item.toLowerCase()
        ?{...item, quantity: result.quantity}
        :item
      )
    );
    setStatus(`Updated ${result.item} to ${result.quantity}`);
    return;
   }

   //ADD
   if(result.action === "add"){
   
   const category = categoryMap[result.item.toLowerCase()] || "Other";

    const newItem = {
      name : result.item,
      quantity : result.quantity,
      category : category
    };

    setItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
     
      const suggestion = relatedItems[result.item.toLowerCase()] || [];

      const season = getCurrentSeason();
      const seasonalSuggestion = seasonalItems[season] || [];
       
      const substituteSuggestion = substitutes[result.item.toLowerCase()] || [];

      const combinedSuggestions = [...suggestion, ...seasonalSuggestion,...substituteSuggestion];

     const filteredSuggestions = combinedSuggestions.filter(
      (item) =>
        !updatedItems.some(
          (existing) =>
            existing.name.toLowerCase() === item.toLowerCase()
        )
     );
     setSuggestions(filteredSuggestions);

     return updatedItems;

   });

   }

   //REMOVE
   if(result.action === "remove"){
     setItems((prevItems) => 
    prevItems.filter((item) => {
         const existing = item.name?.trim().toLowerCase();
        const target = result.item?.trim().toLowerCase();
        return existing !== target;
      })
  );
}

  };

  return (
    <div className = "app-container">
      <div className ="card">

     <h1>Voice Shopping Assistant</h1>
     <p>It's going to be fun , helping you shop !!</p>

     <div>
      <label> Select Language ! </label>
      <select 
      value = {language}
      onChange = {(e) => setLanguage(e.target.value)}>

        <option value = "en-US">English</option>
        <option value = "hi-IN">Hindi</option>
        <option value = "pa-IN">Punjabi</option>

      </select>
     </div>

       <VoiceInput 
       onCommand={handleVoiceCommand}
       language={language}
       />

{status && (
  <div className="status-message">
    {status}
  </div>
)}

      <div className ="lists-container">

            <div className="shopping-section">
             <h2>Shopping List:</h2>

       {Array.from(new Set(items.map(item => item.category))).map((cat) =>{
        const filtered = items.filter(item => item.category === cat);

        if(filtered.length === 0) return null;

        return (
          <div key = {cat}>
            <h3> {cat}</h3>
            <ul>
              {filtered.map((item, index) => (
                <li key = {index}>
                  {item.quantity > 1
                  ? `${item.quantity} ${item.name}`
                  :item.name}
                </li>
              ))}
            </ul>
          </div>
        );
       })}
       </div>


      <div className = "suggestion-section">
          <h2>Suggestions : </h2>
       <ul>
        {suggestions.map((item, index) => (
         <li key={index}>{item}</li>
       ))}
       </ul>
    </div>
   

     
    <div className ="search-section">
    <h2>Search Results :</h2>
    {searchResults.length === 0 ? (
      <p>No results found</p>
    ) : (
      <ul> 
        {searchResults.map((product, index) => (
          <li key = {index} >
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    )}
    </div>
 
    </div>
    
    </div>
  </div>
  );
}

export default App;