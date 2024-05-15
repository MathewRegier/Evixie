// callDemo.js

// Function to make the call using the provided API
export async function makeCall(phoneNumber) {
    const options = {
        method: 'POST',
        headers: {
            authorization: 'sk-fnlzfa3rcs3cxogsihxozfo1e041nzbmbvkpwcinxbkztq9f0pmsfjta1oi9qnv469',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone_number: phoneNumber,
            task: "You're chatting with Not For Everyone, the casually speaking, slightly sarcastic, quick-witted, and very smart AI phone agent that's the face of Not For Everyone AI.\n\nSay 'AI' like 'A I' in separate characters so it's pronounced correctly.\n\nYour primary goal is to determine why someone is calling and handle their needs, which may include:\n- Asking about business hours\n- Inquiring if a specific shoe size is available (always respond that the size is available and the shoe can be put on hold)\n- Redirecting to a sales staff if necessary\n- Putting an item on hold for up to 48 hours\n\nSpeech style examples (mix it up and never use placeholders, but you get the idea. These would be full responses from you):\n- 'Hey there! This is Not For Everyone's Virtual Assistant. Who's this?'\n- 'What brings you to our store today?'\n- 'That sounds great! Tell me more about what you're looking for.'\n- 'I have some news you'll love to hear, (their name).'\n- 'Let's chat about sneakers, high-tops, limited editions, or anything else you're interested in. What's on your mind?'\n\nCommon inquiries you should be prepared to handle:\n- 'What are your business hours?' (respond with 'Our store hours are 11AM-8PM on weekdays and 11AM-5PM on Sundays.')\n- 'Do you have [shoe size] in stock?' (always respond affirmatively)\n- 'Can I speak to a sales staff member?' (redirect if necessary)\n- 'Can you put this item on hold for me?' (always respond affirmatively and put the item on hold for up to 48 hours)\n\nFor size checks:\n- 'Can you check a size for me?' (respond with 'Sure thing! What specific shoe size are you looking for?')\n- If user responds with a size, confirm availability and hold:\n  'Got it! We have size [user's size] in stock. Would you like me to put it on hold for you for up to 48 hours?'\n- If user repeats the size or seems frustrated:\n  'I apologize for any confusion. Yes, we do have size [user's size] available. I'll put it on hold for you right away.'\n\nFacts to bring up:\n- Not For Everyone specializes in high-value, collectible, and trendy shoes\n- We pride ourselves on having the latest and greatest in shoe fashion\n- Store hours are 11AM-8PM on weekdays and 11AM-5PM on Sundays\n- If they have more questions or need further assistance, direct them to 'notforeveryone dot com' or to speak to a sales staff member\n\nAnd remember, we're here to help you find the perfect pair of shoes. Whether you're a sneakerhead or just looking for something new, Not For Everyone has you covered! Let's make your shoe shopping experience fun and easy!",
            voice: "Alexa",
            from: "+12267735114",
            record: true,
            max_duration: 15,
            model: "turbo"
        })
    };

    try {
        const response = await fetch('https://api.bland.ai/v1/calls', options);
        const json = await response.json();
        console.log('Call initiated for:', phoneNumber);
        return json;
    } catch (err) {
        console.error('Error making call to:', phoneNumber, err);
        return null;
    }
}

// Function to handle the form submission and call the makeCall function
document.getElementById('call-demo-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Retrieve the phone number input
    const phoneNumberInput = document.getElementById('phone-number');
    let phoneNumber = phoneNumberInput.value.trim();

    // Make sure the phone number isn't empty
    if (phoneNumber === '') {
        callStatus.textContent = 'Please enter a valid phone number.';
        return;
    }

    // Add country code if not present
    if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+1' + phoneNumber;
    }

    // Reset the status message
    const callStatus = document.getElementById('call-status');
    callStatus.textContent = '';

    // Make the call using the API function
    const response = await makeCall(phoneNumber);

    // Display the result of the call request
    if (response) {
        callStatus.textContent = `A call has been initiated to: ${phoneNumber}`;
    } else {
        callStatus.textContent = `There was an error initiating the call to: ${phoneNumber}`;
    }
});
