# Gunakan image resmi Node.js
FROM node:18

# Set folder kerja
WORKDIR /app

# Salin semua file ke container
COPY . .

# Install dependency
RUN npm install

# Jalankan server
CMD ["npm", "start"]

# Expose port 3000 (Fly.io akan gunakan ini)
EXPOSE 3000
