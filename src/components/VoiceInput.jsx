import { useState } from "react";

function VoiceInput({ onCommand, language }) {

    const [isListening, setIsListening] = useState(false);
    
    const startListening = () =>{
        
        const recognition = new window.webkitSpeechRecognition();

        recognition.lang = language;

        setIsListening(true);

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onCommand(transcript);
            setIsListening(false);
        };

        recognition.onerror = () =>{
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };
    
    return (
        <div>
            <button 
            onClick = {startListening}
            disabled={isListening}
            >
                {isListening ? "Listening...": "Give Voice Command"}
                </button>
        </div>
    );
}

export default VoiceInput;