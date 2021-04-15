<?php

use \Firebase\JWT\JWT;

require_once('vendor/autoload.php');

class Auth
{
    private $secretKey;
    private $serverName;
    private $issuedAt;
    private $expire;


    public function __construct()
    {
        $this->secretKey  = 'testingkey'; // !CHANGE THIS
        $this->issuedAt   = time();
        $this->expire     = $this->issuedAt + (60 * 60 * 24 * 5); // One day expiry 
        $this->serverName = "http://localhost";
    }

    public function generateToken($uid, $name)
    {
        $data = [
            'iat'  => $this->issuedAt,         // Issued at: time when the token was generated
            'iss'  => $this->serverName,       // Issuer
            'nbf'  => $this->issuedAt,         // Not before
            'exp'  => $this->expire,           // Expire
            'uid'  => $uid,                    // User ID
            'name' => $name,                   // Name
        ];

        $jwt = JWT::encode(
            $data,
            $this->secretKey,
            'HS512'
        );
        return array(
            'uid' => $uid,
            'name' => $name,
            'token' => $jwt
        );
    }

    public function verifyToken($uid, $name)
    {
        if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            header('HTTP/1.0 400 Bad Request');
            //echo 'Token not found in request';
            return false;
        }

        $jwt = $matches[1];

        if (!$jwt) {
            //echo "No token was able to be extracted from the authorization header";
            header('HTTP/1.0 400 Bad Request');
            return false;
        }

        try {
            $token = JWT::decode(
                $jwt,
                $this->secretKey,
                ['HS512']
            );
        } catch (Exception $e) {
            return false;
        }

        $now = new DateTimeImmutable();

        if (
            $token->iss != $this->serverName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp() ||
            $token->uid != $uid ||
            $token->name != $name
        ) {
            // header('HTTP/1.1 401 Unauthorized');
            return false;
        }
        return true;
    }
}
