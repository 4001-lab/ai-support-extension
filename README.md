# Project Structure (Root)

                ai-support-extension/
                │
                ├── backend/
                │   ├── src/
                │   │   ├── server.js
                │   │   ├── routes/
                │   │   │   └── generateReply.js
                │   │   ├── services/
                │   │   │   ├── genai.js
                │   │   │   ├── rag.js
                │   │   │   └── orders.js
                │   │   ├── utils/
                │   │   │   └── prompt.js
                │   │   └── config/
                │   │       └── env.js
                │   │
                │   ├── data/
                │   │   └── kb.json
                │   │
                │   ├── scripts/
                │   │   └── embed_kb.js
                │   │
                │   ├── .env
                │   ├── package.json
                │   └── README.md
                │
                └── extension/
                    ├── manifest.json
                    ├── popup.html
                    ├── popup.js
                    └── styles.css



# One-time KB embedding script

This backend/scripts/embed_kb.js script:

Reads kb.json

Creates embeddings

Saves them to disk

Run it once
    -> node scripts/embed_kb.js


