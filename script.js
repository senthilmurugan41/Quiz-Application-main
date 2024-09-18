let questions = [];
document.getElementById('submitBtn').addEventListener('click', function() {
    const question = document.getElementById('quizQuestion').value;

    // Validate the input to check if it is a quiz question
    if (question.trim() === '' || !question.toLowerCase().includes('quiz')) {
        alert('Please enter a valid quiz question.');
        return;
    }

    // Simulate fetching an answer from the Gemini AI
    fetchAnswerFromGeminiAI(question);
});

async function fetchAnswerFromGeminiAI(question) {
    const API_KEY = "AIzaSyCoW7wGuiF_uhs7M2uSNAxl56x3YjJ45Yc";
    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key="+API_KEY;
    // Simulated response (replace with actual API call in a real app)
    question+="give me in the form of javascript array should have question and option array and answer"
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            contents: [{
                role: "user",
                parts: [{text:question}]
            }]
        })
    });

    const data = await response.json();
    
    let apiResponse = data?.candidates[0].content.parts[0].text;
    apiResponse = apiResponse.substr(apiResponse.indexOf("=")+2);
    apiResponse = apiResponse.replace(/```/g,"");
    console.log("apiResponse",apiResponse);
    questions = eval(apiResponse);
    console.log("quiz",questions);
    sessionStorage.setItem("questions",JSON.stringify(questions));
    // Display the response
    if(data!= null)
    window.location.href = "secondindex.html";
}
