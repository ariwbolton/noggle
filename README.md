# Noggle

**Maintainer**: [@ariwbolton](https://github.com/ariwbolton)

### Setup

- Add a file named `english-scrabble-dictionary.txt` to the `data` directory
  - This was the original link used to download the file: [link](https://drive.google.com/file/d/1XIFdZukAcDRiDIOgR_rHpICrrgJbLBxV/view)
  - Here was the Stack Overflow link which linked to the file used: [link](https://boardgames.stackexchange.com/questions/38366/latest-collins-scrabble-words-list-in-text-file) (the 2019 file without definitions was selected)

**TODO**

### Installation

**TODO**

### Roadmap

1. Add Socket.io
    - Use async/await by using [Socket.io-as-promised](https://www.npmjs.com/package/socket.io-as-promised)
    - Potentially take implementation and copy to avoid unnecessary dependencies
1. Remove Hapi.dev
1. Use Webpack for frontend (and backend?)
1. Figure out how to implement UUID primary keys in Postgres
1. Implement backend API
    1. /room namespace
    1. /account namespace
        1. Stats
        1. History
    1. Models (Postgres)
        1. All
            1. `id`
            1. `created_at`
        1. `user`
            1. `username`
            1. `login_code`
        1. `rooms`
        1. `room_assignments`
            1. `room_id`
            1. `user_id`
            1. `began_at`
            1. `ended_at`
            1. Constraints
                1. Non-postgres: should only be one active room assignment per user
        1. `games`
            1. `board_string`
            1. `start_time` - nullable
            1. `duration` - nullable
            1. `is_scored`
        1. `game_assignments`
            1. `user_id`
            1. `game_id`
            1. Constraints
                1. UNIQUE (account_id, game_id)
        1. `game_words`
            1. `game_assignment_id`
            1. `word` - string - should be lower case
            1. `value` - int - >= 1 - pre-scoring value
            1. `is_unique` - Should be null until `games.is_scored` is true
            1. `points` - int - nullable - May be negative if the value isn't a word!!
            1. Constraints
                1. UNIQUE (game_assignment_id, word)
                1. word is lower case
