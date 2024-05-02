<?php
// Set the contact information and image path
$name = "Evixie Agency";
$phone = "2269759088";
$image_path = 'images/EvixieProfile.jpg'; // Ensure this path is correct

// Read and encode the image file to Base64
$image_data = file_get_contents($image_path);
if ($image_data === false) {
    error_log("Failed to read image data from path: $image_path");
    // Optionally handle the error by redirecting or showing a message
} else {
    $base64_image = base64_encode($image_data);
    $base64_image = str_replace(array("\n", "\r", " "), '', $base64_image); // Clean up the Base64 string

    // Generate the vCard content with photo
    $vcard_content = "BEGIN:VCARD\n";
    $vcard_content .= "VERSION:3.0\n";
    $vcard_content .= "FN:" . $name . "\n";
    $vcard_content .= "TEL:" . $phone . "\n";
    $vcard_content .= "PHOTO;TYPE=JPEG;ENCODING=b:" . $base64_image . "\n";
    $vcard_content .= "END:VCARD";

    // Check if the request is coming from an iOS device
    $is_ios = strpos($_SERVER['HTTP_USER_AGENT'], 'iPhone') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'iPad') !== false;

    if ($is_ios) {
        // Prepare a direct redirect for iOS
        $encoded_data = urlencode($vcard_content);
        $ios_redirect_url = "https://evixie.com/download_vcard.php?data=$encoded_data";
        header("Location: $ios_redirect_url");
        exit();
    } else {
        // Base64 encode the vCard content for the data URI (handling for Android and other devices)
        $base64_vcard = base64_encode($vcard_content);
        $base64_vcard = str_replace(array("\n", "\r"), '', $base64_vcard); // Ensure no line breaks are in the encoded string

        // Generate the Data URI for the vCard
        $data_uri = "data:text/vcard;base64,$base64_vcard";

        // Output HTML with responsive and styled elements
        echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Download Contact</title>';
        echo '<style>body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f4f4f4; }';
        echo '.download-button { padding: 1em 2em; background-color: #007BFF; color: white; border: none; border-radius: 5px; font-size: 1.5rem; cursor: pointer; text-transform: uppercase; }';
        echo '.download-button:hover { background-color: #0056b3; }</style></head><body>';
        echo '<button class="download-button" onclick="window.location.href=\'' . $data_uri . '\';">Add Contact to Phone</button>';
        echo '</body></html>';
        exit();
    }
}
?>
