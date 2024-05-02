<?php
if (isset($_GET['data'])) {
    header('Content-Type: text/x-vcard');
    header('Content-Disposition: attachment; filename="contact.vcf"');
    echo urldecode($_GET['data']);
    exit;
} else {
    // Redirect to an error page if the data parameter is missing
    header('Location: https://evixie.com/error_page.php');
    exit();
}
?>
