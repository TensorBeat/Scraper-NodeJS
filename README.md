# Node Song Scraper

# Requirements

-   node >= 14.14.0
-   .env file with REDIS_PASSWORD and GOOGLE_APPLICATION_CREDENTIALS set
-   Google Service Key (gcp-admin-key.json)

# Install

```sh
npm install
```

# Run

-   This will start both a master and worker process and start scraping songs

```sh
npm start
```

-   This will start both a dashboard to view the job queues

```sh
npm run start:bullboard
```

# Added Tags

note: Even though the type is listed here, the api encodes everything as a string so the values need to be parsed by consuming clients. This will hopefully change by possibly not.

| Tag Name        | Type   | Description                              | Example Value                                       |
| --------------- | ------ | ---------------------------------------- | --------------------------------------------------- |
| downloadUrl     | string | origin of download                       | https://soundcloud.com/trippie-hippie-2/without-you |
| duration        | float  | duration of song in seconds              | 189.179                                             |
| genre           | string | genre of song                            | Alternative Rock                                    |
| likes           | int    | number of likes/upvotes/commends         | 9009                                                |
| uploadTimestamp | int    | unix timestamp of when song was uploaded | 1613597689                                          |
| views           | int    | views/plays of song                      | 183557                                              |
| artist          | string | artist's display name                    | Trippie Redd                                        |
