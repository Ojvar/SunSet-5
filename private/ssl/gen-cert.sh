# Generate db-params
openssl dhparam -out dhparam.pem 2048

# Generate Keys
openssl genrsa -out key.pem
openssl req -subj 'CN=Sunset_local_cert/C=IR' -x509 -days 90 -new -key key.pem -out csr.pem
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -subj "/C=IR/ST=Province/L=IT/O=IT/CN=Sunset" \
    -keyout server-key.pem -out server-cert.pem

rm key.pem
rm dhparam.pem
