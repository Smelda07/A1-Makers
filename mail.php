<?php
// mail.php

// Nastavení e-mailu majitele (Změň na info@a1-makers.cz)
$to_email = "bobosm07@seznam.cz"; 
$subject = "NOVÁ POPTÁVKA z webu A1-MAKERS";

// Funkce pro ošetření vstupů (ochrana před spamem/útoky)
function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Inicializace JSON odpovědi
$response = array('status' => 'error', 'message' => 'Neco se pokazilo.');

// Kontrola, zda jde o POST požadavek
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Ošetření textových polí
    $name = isset($_POST['name']) ? clean_input($_POST['name']) : 'Neznámý';
    $email = isset($_POST['email']) ? clean_input($_POST['email']) : 'Neznámý';
    $message = isset($_POST['message']) ? clean_input($_POST['message']) : 'Bez zprávy';

    // Validace e-mailu na straně serveru (pro jistotu)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Neplatná e-mailová adresa.';
        echo json_encode($response);
        exit;
    }

    // 2. Příprava těla e-mailu (HTML)
    $email_body = "<h3>Nová poptávka od zákazníka:</h3>";
    $email_body .= "<p><strong>Jméno/Firma:</strong> $name</p>";
    $email_body .= "<p><strong>E-mail:</strong> <a href='mailto:$email'>$email</a></p>";
    $email_body .= "<p><strong>Zpráva:</strong><br>" . nl2br($message) . "</p>";

    // --- PŘÍPRAVA MULTIPART E-MAILU (pro přílohy) ---
    $boundary = md5(time());
    $headers = "From: web@a1-makers.cz" . "\r\n"; // E-mail odesílatel z webu
    $headers .= "Reply-To: $email" . "\r\n"; // Odpověď půjde na zákazníka
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"" . "\r\n";

    $multipart_body = "--$boundary\r\n";
    $multipart_body .= "Content-Type: text/html; charset=\"UTF-8\"" . "\r\n";
    $multipart_body .= "Content-Transfer-Encoding: base64" . "\r\n\r\n";
    $multipart_body .= chunk_split(base64_encode($email_body)) . "\r\n\r\n";

    // 3. Obsluha souborů (files[] z FormData)
    $allowed_extensions = array('step', 'stp', 'pdf', 'dwg', 'dxf', 'zip');
    $files_attached_count = 0;

    if (isset($_FILES['files']) && count($_FILES['files']['name']) > 0) {
        
        for ($i = 0; $i < count($_FILES['files']['name']); $i++) {
            
            if ($_FILES['files']['error'][$i] == UPLOAD_ERR_OK) {
                
                $tmp_name = $_FILES['files']['tmp_name'][$i];
                $file_name = $_FILES['files']['name'][$i];
                $file_size = $_FILES['files']['size'][$i];
                $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

                // Kontrola povolené přípony na serveru
                if (in_array($file_ext, $allowed_extensions)) {
                    
                    // Načtení obsahu souboru a jeho zakódování
                    $file_content = file_get_contents($tmp_name);
                    $file_encoded = chunk_split(base64_encode($file_content));

                    // Přidání souboru do multipart těla
                    $multipart_body .= "--$boundary\r\n";
                    $multipart_body .= "Content-Type: application/octet-stream; name=\"$file_name\"" . "\r\n";
                    $multipart_body .= "Content-Description: $file_name" . "\r\n";
                    $multipart_body .= "Content-Disposition: attachment; filename=\"$file_name\"" . "\r\n";
                    $multipart_body .= "Content-Transfer-Encoding: base64" . "\r\n\r\n";
                    $multipart_body .= $file_encoded . "\r\n\r\n";

                    $files_attached_count++;
                } else {
                    $response['message'] = "Soubor $file_name má nepovolenou příponu.";
                    echo json_encode($response);
                    exit; 
                }
            }
        }
    }

    $multipart_body .= "--$boundary--"; // Konec multipart těla

    // 4. Odeslání e-mailu (SIMULACE PRO XAMPP)
    $test_file_content = "Komu: " . $to_email . "\r\n" . "Předmět: " . $subject . "\r\n" . $multipart_body;
    
    if (file_put_contents("posledni_poptavka.txt", $test_file_content)) {
        $response['status'] = 'success';
        $response['message'] = 'Poptávka byla úspěšně zpracována (simulováno na localhostu).';
    } else {
        $response['message'] = 'Nepodařilo se zapsat testovací soubor.';
    }

} else {
    $response['message'] = 'Neplatný požadavek.';
}

// Na úplném konci souboru musí být poslání odpovědi zpět do JS
echo json_encode($response);
?>