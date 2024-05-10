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
            pathway_id: "41166cee-c5ea-42e2-93ca-d644730c8268",
            voice: "Alexa",
            answered_by_enabled: true,
            wait_for_greeting: false,
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
